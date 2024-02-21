import { mount } from "@vue/test-utils";
import ListPlayers from "../ListPlayers.vue";
import ListPlayer from "../ListPlayer.vue";
import { describe, test, expect, beforeEach, vi, afterEach } from "vitest";

describe("ListPlayers", () => {
  let wrapper;

  const players = [
    { id: 1, name: "Test Player 1" },
    { id: 2, name: "Test Player 2" },
    { id: 3, name: "Test Player 3" },
  ];

  let mockedGetPlayer;

  beforeEach(() => {
    // mount the component
    mockedGetPlayer = vi.fn();

    wrapper = mount(ListPlayers, {
      props: { players, getPlayer: mockedGetPlayer },
      components: { ListPlayer },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders a list with id "players-list"', () => {
    expect(wrapper.find("#players-list").exists()).toBe(true);
  });

  test("renders a ListPlayer for each player in the players prop", () => {
    expect(wrapper.findAllComponents(ListPlayer).length).toBe(players.length);
  });

  test("Listen for 'player-clicked' events from the ListPlayer component, and call the getPlayer prop function with the id of the clicked player as an argument.", async () => {
    const playerIndex = 1;
    const player = players[playerIndex];
    const listPlayer = wrapper.findAllComponents(ListPlayer).at(playerIndex);

    listPlayer.vm.$emit("player-clicked", player.id);
    await wrapper.vm.$nextTick();

    expect(mockedGetPlayer).toHaveBeenCalledWith(player.id);
  });
});
