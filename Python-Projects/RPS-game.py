"""
Rock-Paper-Scissors game. The game has a main window where are buttons for
different game types. The player can pick a first to 1, 3 or 5 game.
Picking a game will open a new window for that selected game type.
In the opened game window you can play the game, start a new game or quit to
the main window.
"""

from tkinter import *
import random

# Class for the main window:
class RPSgame:

    def __init__(self):
        main = self.__mainw = Tk()
        self.__mainw.title(f"RPS-game")
        self.__mainw.option_add("*Font", "Verdana 28")

        # The buttons and labels on the main window:

        # The label that welcomes the user:
        self.__main_label = Label(main, text="Welcome to the Rock-Paper-Scissors-game!",
                           background="orange", foreground="black", )
        self.__main_label.grid(row=0, column=0, columnspan=5, sticky=W + E)

        # The label on the main window that describes what kind of game to pick:
        self.__main_label = Label(main, text="Select what type of game would you"
                                             " like to play or quit:",
                                  background="orange", foreground="black", )
        self.__main_label.grid(row=1, column=0, columnspan=5, sticky=W + E)


        # Different game buttons:
        self.__first_to_1 = Button(main, text="First to 1", background ="light green",
                           foreground ="black", command = open_ft1_window)
        self.__first_to_3 = Button(main, text="First to 3", background ="yellow",
                           foreground ="black", command = open_ft3_window)
        self.__first_to_5 = Button(main, text="First to 5", background ="light blue",
                           foreground ="black", command = open_ft5_window)

        # Placing the buttons:
        self.__first_to_1.grid(row=2, column=0, columnspan=5, sticky=W + E)
        self.__first_to_3.grid(row=3, column=0, columnspan=5, sticky=W + E)
        self.__first_to_5.grid(row=4, column=0, columnspan=5, sticky=W + E)

        # Quit button:
        self.__quit_button = Button(main, text="Quit", command=self.quit,
                             background="red", foreground="black")
        self.__quit_button.grid(row=6, column=0, columnspan=5, sticky=W + E)


        # Start the gameUI:
        self.__mainw.mainloop()


    # Method to close the main window:
    def quit(self):
        self.__mainw.destroy()

###############################################################################

# Class for the ft1-game:
class open_ft1_window:
    def __init__(self):
        ft1_window = self.__ft1_window = Toplevel()
        self.__ft1_window.title(f"RPS-game: First to 1")
        self.__ft1_window.option_add("*Font", "Verdana 28")

        # Label for the ft1-game tab:
        self.__ft1_label = Label(ft1_window, text=f"Rock-Paper-Scissors-game! First to 1!",
                           background="light blue", foreground="black")
        self.__ft1_label.grid(row=0, column=0, columnspan=5, sticky=W + E)

        # Buttons to play the ft1-game:
        self.__ft1_rock_button = Button(ft1_window, text="Rock", command=self.ft1_rock,
                                 background="yellow", foreground="black")
        self.__ft1_rock_button.grid(row=1, column=0, columnspan=5, sticky=W + E)

        self.__ft1_paper_button = Button(ft1_window, text="Paper", command=self.ft1_paper,
                                 background="light green", foreground="black")
        self.__ft1_paper_button.grid(row=2, column=0, columnspan=5, sticky=W + E)

        self.__ft1_Scissors_button = Button(ft1_window, text="Scissors", command=self.ft1_scissors,
                                 background="orange", foreground="black")
        self.__ft1_Scissors_button.grid(row=3, column=0, columnspan=5, sticky=W + E)


        # The labels that show the score and other messages:

        # Labels for player points:
        self.__ft1_player_points_label = Label(ft1_window, text="Your points: 0",
                                              foreground = "black")
        self.__ft1_player_points_label.grid(row=6, column=0, columnspan = 1, sticky=W)

        # Labels for computers points:
        self.__ft1_computer_points_label = Label(ft1_window, text="Computers points: 0",
                                              foreground="black")
        self.__ft1_computer_points_label.grid(row=7, column=0, columnspan=1,
                                           sticky=W)

        # Labels for messages and info texts:
        self.__ft1_player_pick = Label(ft1_window, text="You picked: ",
                                       foreground="black")
        self.__ft1_player_pick.grid(row=4, column=0, columnspan=5, sticky=W)

        self.__ft1_computer_pick = Label(ft1_window, text="Computer picked: ",
                                foreground="black")
        self.__ft1_computer_pick.grid(row=5, column=0, columnspan=5, sticky=W)

        self.__ft1_message_label = Label(ft1_window, text="Pick Rock, Paper or Scissors.",
                                         foreground="black")
        self.__ft1_message_label.grid(row=8, column=0, columnspan=5, sticky=W+E)


        # New game button for ft1-game tab:
        self.__ft1_new_game_button = Button(ft1_window, text="New game", command=self.ft1_new_game,
                                            background="green", foreground="black")
        self.__ft1_new_game_button.grid(row=9, column=0, columnspan=5, sticky=W + E)

        # Quit button for the ft1-game tab:
        self.__ft1_quit_button = Button(ft1_window, text="Quit", command=self.quit_ft1_window,
                             background="red", foreground="black")
        self.__ft1_quit_button.grid(row=10, column=0, columnspan=5, sticky=W + E)


    # Method to close the ft1-game window:
    def quit_ft1_window(self):
        self.__ft1_window.destroy()

###############################################################################

    # Method linked to the ft1 new game button:
    def ft1_new_game(self):
        self.__ft1_computer_points_label.configure(text=f"Computer points: 0")
        self.__ft1_player_points_label.configure(text="Your points: 0")
        self.__ft1_player_pick.configure(text=f"You picked: ")
        self.__ft1_computer_pick.configure(text=f"Computer picked: ")
        self.__ft1_message_label.configure(text="Pick Rock, Paper or Scissors.")

        self.__ft1_rock_button.configure(state=NORMAL)
        self.__ft1_paper_button.configure(state=NORMAL)
        self.__ft1_Scissors_button.configure(state=NORMAL)

###############################################################################

    # Method linked to the button "Rock":
    def ft1_rock(self):
        player_choice = 'Rock'
        comp_choice = computer_choice()

        self.ft1_round_result(player_choice, comp_choice)

###############################################################################

    # Method linked to the button "Paper":
    def ft1_paper(self):
        player_choice = 'Paper'
        comp_choice = computer_choice()

        self.ft1_round_result(player_choice, comp_choice)

###############################################################################

    # Method linked to the button "Scissors":
    def ft1_scissors(self):
        player_choice = 'Scissors'
        comp_choice = computer_choice()

        self.ft1_round_result(player_choice, comp_choice)

###############################################################################

    # Method for the rounds result:
    def ft1_round_result(self, player_choice, computer_choice):

        # If the round is a tie:
        if (player_choice == computer_choice):
            self.__ft1_player_pick.configure(text=f"You picked: {player_choice}")
            self.__ft1_computer_pick.configure(text=f"Computer picked: {computer_choice}")
            self.__ft1_message_label.configure(text="The round is a tie. Pick again.")


        # If the computer wins the round:
        elif (player_choice == "Rock" and computer_choice == "Paper") or \
                (player_choice == "Paper" and computer_choice == "Scissors") or \
                (player_choice == "Scissors" and computer_choice == "Rock"):

           self.__ft1_computer_points_label.configure(text=f"Computer points: 1")
           self.__ft1_player_pick.configure(text=f"You picked: {player_choice}")
           self.__ft1_computer_pick.configure(text=f"Computer picked: {computer_choice}")
           self.__ft1_message_label.configure(text="Computer WINS!")

           self.__ft1_rock_button.configure(state=DISABLED)
           self.__ft1_paper_button.configure(state=DISABLED)
           self.__ft1_Scissors_button.configure(state=DISABLED)


        # If the player wins the round:
        else:
            self.__ft1_player_points_label.configure(text=f"Your points: 1")
            self.__ft1_player_pick.configure(text=f"You picked: {player_choice}")
            self.__ft1_computer_pick.configure(text=f"Computer picked: {computer_choice}")
            self.__ft1_message_label.configure(text="You WIN!")

            self.__ft1_rock_button.configure(state=DISABLED)
            self.__ft1_paper_button.configure(state=DISABLED)
            self.__ft1_Scissors_button.configure(state=DISABLED)

###############################################################################

# Class for the ft3-game:
class open_ft3_window:

    def __init__(self):
        ft3_window = self.__ft3_window = Toplevel()
        self.__ft3_window.title(f"RPS-game: First to 3")
        self.__ft3_window.option_add("*Font", "Verdana 28")

        self.__player_points = 0
        self.__computer_points = 0

        # Label for the ft3-game tab:
        self.__ft3_label = Label(ft3_window,
                          text=f"Rock-Paper-Scissors-game! First to 3!",
                          background="light blue", foreground="black")
        self.__ft3_label.grid(row=0, column=0, columnspan=5, sticky=W + E)

        # Buttons to play the ft3-game:
        self.__ft3_rock_button = Button(ft3_window, text="Rock", command=self.ft3_rock,
                                 background="yellow", foreground="black")
        self.__ft3_rock_button.grid(row=1, column=0, columnspan=5, sticky=W + E)

        self.__ft3_paper_button = Button(ft3_window, text="Paper", command=self.ft3_paper,
                                  background="light green", foreground="black")
        self.__ft3_paper_button.grid(row=2, column=0, columnspan=5, sticky=W + E)

        self.__ft3_Scissors_button = Button(ft3_window, text="Scissors",
                                     command=self.ft3_scissors,
                                     background="orange", foreground="black")
        self.__ft3_Scissors_button.grid(row=3, column=0, columnspan=5, sticky=W + E)


        # The labels that show the score and other messages:

        # Labels for player points:
        self.__ft3_player_points_label = Label(ft3_window, text="Your points: 0",
                                              foreground="black")
        self.__ft3_player_points_label.grid(row=6, column=0, columnspan=1,
                                           sticky=W)

        # Labels for computers points:
        self.__ft3_computer_points_label = Label(ft3_window,
                                                text="Computers points: 0",
                                                foreground="black")
        self.__ft3_computer_points_label.grid(row=7, column=0, columnspan=1,
                                             sticky=W)

        # Labels for messages and info texts:
        self.__ft3_player_pick = Label(ft3_window, text="You picked: ",
                                foreground="black")
        self.__ft3_player_pick.grid(row=4, column=0, columnspan=1, sticky=W)

        self.__ft3_computer_pick = Label(ft3_window, text="Computer picked: ",
                                  foreground="black")
        self.__ft3_computer_pick.grid(row=5, column=0, columnspan=1, sticky=W)

        self.__ft3_message_label = Label(ft3_window, text="Pick Rock, Paper or Scissors. "
                                                          "3 points to win.", foreground="black")
        self.__ft3_message_label.grid(row=8, column=0, columnspan=5, sticky=W + E)


        # New game button for ft3-game tab:
        self.__ft3_new_game_button = Button(ft3_window, text="New game", command=self.ft3_new_game,
                                            background="green", foreground="black")
        self.__ft3_new_game_button.grid(row=9, column=0, columnspan=5, sticky=W + E)


        # Quit button for the ft3-game tab:
        self.__ft3_quit_button = Button(ft3_window, text="Quit",
                                 command=self.quit_ft3_window,
                                 background="red", foreground="black")
        self.__ft3_quit_button.grid(row=10, column=0, columnspan=5, sticky=W + E)


    # Method to close the ft3-game window:
    def quit_ft3_window(self):
        self.__player_points = 0
        self.__computer_points = 0
        self.__ft3_window.destroy()

###############################################################################

    # Method linked to the ft3 new game button:
    def ft3_new_game(self):

        self.__player_points = 0
        self.__computer_points = 0

        self.__ft3_computer_points_label.configure(text=f"Computer points: 0")
        self.__ft3_player_points_label.configure(text="Your points: 0")
        self.__ft3_player_pick.configure(text=f"You picked: ")
        self.__ft3_computer_pick.configure(text=f"Computer picked: ")
        self.__ft3_message_label.configure(text="Pick Rock, Paper or Scissors.")

        self.__ft3_rock_button.configure(state=NORMAL)
        self.__ft3_paper_button.configure(state=NORMAL)
        self.__ft3_Scissors_button.configure(state=NORMAL)

###############################################################################

    # Method linked to the button "Rock":
    def ft3_rock(self):
        player_choice = 'Rock'
        comp_choice = computer_choice()

        self.ft3_round_result(player_choice, comp_choice)

###############################################################################

    # Method linked to the button "Paper":
    def ft3_paper(self):
        player_choice = 'Paper'
        comp_choice = computer_choice()

        self.ft3_round_result(player_choice, comp_choice)

###############################################################################

    # Method linked to the button "Scissors":
    def ft3_scissors(self):
        player_choice = 'Scissors'
        comp_choice = computer_choice()

        self.ft3_round_result(player_choice, comp_choice)

###############################################################################

    # Method for the rounds result:
    def ft3_round_result(self, player_choice, computer_choice):

        # If the round is a tie:
        if (player_choice == computer_choice):
            self.__ft3_player_pick.configure(text=f"You picked: {player_choice}")
            self.__ft3_computer_pick.configure(text=f"Computer picked: {computer_choice}")
            self.__ft3_message_label.configure(text="The round is a tie. Pick again.")


        # If the computer wins the round:
        elif (player_choice == "Rock" and computer_choice == "Paper") or \
                (player_choice == "Paper" and computer_choice == "Scissors") or \
                (player_choice == "Scissors" and computer_choice == "Rock"):

            self.__computer_points += 1

            if self.__computer_points == 3:
                self.__ft3_computer_points_label.configure(
                    text=f"Computer points: {self.__computer_points}")
                self.__ft3_player_pick.configure(
                    text=f"You picked: {player_choice}")
                self.__ft3_computer_pick.configure(
                    text=f"Computer picked: {computer_choice}")
                self.__ft3_message_label.configure(text="Computer WINS!")

                self.__ft3_rock_button.configure(state=DISABLED)
                self.__ft3_paper_button.configure(state=DISABLED)
                self.__ft3_Scissors_button.configure(state=DISABLED)

            else:

                self.__ft3_computer_points_label.configure(text=f"Computer points: {self.__computer_points}")
                self.__ft3_player_pick.configure(text=f"You picked: {player_choice}")
                self.__ft3_computer_pick.configure(text=f"Computer picked: {computer_choice}")
                self.__ft3_message_label.configure(text="Computer wins the round. Pick again.")


        # If the player wins the round:
        else:
            self.__player_points += 1

            if self.__player_points == 3:
                self.__ft3_player_points_label.configure(text=f"Your points: {self.__player_points}")
                self.__ft3_player_pick.configure(text=f"You picked: {player_choice}")
                self.__ft3_computer_pick.configure(text=f"Computer picked: {computer_choice}")
                self.__ft3_message_label.configure(text="You WIN!")

                self.__ft3_rock_button.configure(state=DISABLED)
                self.__ft3_paper_button.configure(state=DISABLED)
                self.__ft3_Scissors_button.configure(state=DISABLED)

            else:
                self.__ft3_player_points_label.configure(text=f"Your points: {self.__player_points}")
                self.__ft3_player_pick.configure(text=f"You picked: {player_choice}")
                self.__ft3_computer_pick.configure(text=f"Computer picked: {computer_choice}")
                self.__ft3_message_label.configure(text="You win the round. Pick again.")

###############################################################################

# Class for the ft5-game:
class open_ft5_window:

    def __init__(self):
        ft5_window = self.__ft5_window = Toplevel()
        self.__ft5_window.title(f"RPS-game: First to 5")
        self.__ft5_window.option_add("*Font", "Verdana 28")

        self.__player_points = 0
        self.__computer_points = 0

        # Label for the ft5-game tab:
        self.__ft5_label = Label(ft5_window,
                                 text=f"Rock-Paper-Scissors-game! First to 5!",
                                 background="light blue", foreground="black")
        self.__ft5_label.grid(row=0, column=0, columnspan=5, sticky=W + E)

        # Buttons to play the ft5-game:
        self.__ft5_rock_button = Button(ft5_window, text="Rock", command=self.ft5_rock,
                                        background="yellow", foreground="black")
        self.__ft5_rock_button.grid(row=1, column=0, columnspan=5, sticky=W + E)

        self.__ft5_paper_button = Button(ft5_window, text="Paper",command=self.ft5_paper,
                                         background="light green", foreground="black")
        self.__ft5_paper_button.grid(row=2, column=0, columnspan=5,
                                     sticky=W + E)

        self.__ft5_Scissors_button = Button(ft5_window, text="Scissors", command=self.ft5_scissors,
                                            background="orange", foreground="black")
        self.__ft5_Scissors_button.grid(row=3, column=0, columnspan=5, sticky=W + E)

        # The labels that show the score and other messages:

        # Labels for player points:
        self.__ft5_player_points_label = Label(ft5_window, text="Your points: 0",
                                               foreground="black")
        self.__ft5_player_points_label.grid(row=6, column=0, columnspan=1, sticky=W)

        # Labels for computer points:
        self.__ft5_computer_points_label = Label(ft5_window, text="Computers points: 0",
                                                 foreground="black")
        self.__ft5_computer_points_label.grid(row=7, column=0, columnspan=1, sticky=W)

        # Label for messages and info texts:
        self.__ft5_player_pick = Label(ft5_window, text="You picked: ", foreground="black")
        self.__ft5_player_pick.grid(row=4, column=0, columnspan=1, sticky=W)

        self.__ft5_computer_pick = Label(ft5_window, text="Computer picked: ", foreground="black")
        self.__ft5_computer_pick.grid(row=5, column=0, columnspan=1, sticky=W)

        self.__ft5_message_label = Label(ft5_window, text="Pick Rock, Paper or Scissors. "
                                                          "5 points to win.",
                                         foreground="black")
        self.__ft5_message_label.grid(row=8, column=0, columnspan=5, sticky=W + E)


        # New game button for ft5-game tab:
        self.__ft5_new_game_button = Button(ft5_window, text="New game",command=self.ft5_new_game,
                                            background="green", foreground="black")
        self.__ft5_new_game_button.grid(row=9, column=0, columnspan=5,sticky=W + E)


        # Quit button for the ft5-game tab:
        self.__ft5_quit_button = Button(ft5_window, text="Quit", command=self.quit_ft5_window,
                                        background="red", foreground="black")
        self.__ft5_quit_button.grid(row=10, column=0, columnspan=5, sticky=W + E)


    # Method to close the ft5-game window:
    def quit_ft5_window(self):
        self.__player_points = 0
        self.__computer_points = 0
        self.__ft5_window.destroy()

###############################################################################

    # Method linked to the ft5 new game button:
    def ft5_new_game(self):

        self.__player_points = 0
        self.__computer_points = 0

        self.__ft5_computer_points_label.configure(text=f"Computer points: 0")
        self.__ft5_player_points_label.configure(text="Your points: 0")
        self.__ft5_player_pick.configure(text=f"You picked: ")
        self.__ft5_computer_pick.configure(text=f"Computer picked: ")
        self.__ft5_message_label.configure(text="Pick Rock, Paper or Scissors.")

        self.__ft5_rock_button.configure(state=NORMAL)
        self.__ft5_paper_button.configure(state=NORMAL)
        self.__ft5_Scissors_button.configure(state=NORMAL)

###############################################################################

    # Method linked to the button "Rock":
    def ft5_rock(self):
        player_choice = 'Rock'
        comp_choice = computer_choice()

        self.ft5_round_result(player_choice, comp_choice)

###############################################################################

    # Method linked to the button "Paper":
    def ft5_paper(self):
        player_choice = 'Paper'
        comp_choice = computer_choice()

        self.ft5_round_result(player_choice, comp_choice)

###############################################################################

    # Method linked to the button "Scissors":
    def ft5_scissors(self):
        player_choice = 'Scissors'
        comp_choice = computer_choice()

        self.ft5_round_result(player_choice, comp_choice)

###############################################################################

    # Method for the rounds result:
    def ft5_round_result(self, player_choice, computer_choice):

        # If the round is a tie:
        if (player_choice == computer_choice):
            self.__ft5_player_pick.configure(text=f"You picked: {player_choice}")
            self.__ft5_computer_pick.configure(text=f"Computer picked: {computer_choice}")
            self.__ft5_message_label.configure(text="The round is a tie. Pick again.")


        # If the computer wins the round:
        elif (player_choice == "Rock" and computer_choice == "Paper") or \
                (player_choice == "Paper" and computer_choice == "Scissors") or \
                (player_choice == "Scissors" and computer_choice == "Rock"):

            self.__computer_points += 1

            if self.__computer_points == 5:
                self.__ft5_computer_points_label.configure(
                    text=f"Computer points: {self.__computer_points}")
                self.__ft5_player_pick.configure(
                    text=f"You picked: {player_choice}")
                self.__ft5_computer_pick.configure(
                    text=f"Computer picked: {computer_choice}")
                self.__ft5_message_label.configure(text="Computer WINS!")

                self.__ft5_rock_button.configure(state=DISABLED)
                self.__ft5_paper_button.configure(state=DISABLED)
                self.__ft5_Scissors_button.configure(state=DISABLED)

            else:

                self.__ft5_computer_points_label.configure(
                    text=f"Computer points: {self.__computer_points}")
                self.__ft5_player_pick.configure(
                    text=f"You picked: {player_choice}")
                self.__ft5_computer_pick.configure(
                    text=f"Computer picked: {computer_choice}")
                self.__ft5_message_label.configure(
                    text="Computer wins the round. Pick again.")


        # If the player wins the round:
        else:
            self.__player_points += 1

            if self.__player_points == 5:
                self.__ft5_player_points_label.configure(
                    text=f"Player points: {self.__player_points}")
                self.__ft5_player_pick.configure(
                    text=f"You picked: {player_choice}")
                self.__ft5_computer_pick.configure(
                    text=f"Computer picked: {computer_choice}")
                self.__ft5_message_label.configure(text="You WIN!")

                self.__ft5_rock_button.configure(state=DISABLED)
                self.__ft5_paper_button.configure(state=DISABLED)
                self.__ft5_Scissors_button.configure(state=DISABLED)

            else:
                self.__ft5_player_points_label.configure(
                    text=f"Your points: {self.__player_points}")
                self.__ft5_player_pick.configure(
                    text=f"You picked: {player_choice}")
                self.__ft5_computer_pick.configure(
                    text=f"Computer picked: {computer_choice}")
                self.__ft5_message_label.configure(text="You win the round. Pick again.")

###############################################################################

# Function for the random computer choice:
def computer_choice():
    list_of_choices = ['Rock', 'Paper', 'Scissors']
    return random.choice(list_of_choices)


###############################################################################

def main():

    rpsgame = RPSgame()

if __name__ == "__main__":
    main()
