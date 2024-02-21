module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Debug exposing (toString)

initPlayer : Int -> Player
initPlayer id =
    Player id "" False


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }

type alias Model =
    { players : List Player
    , newPlayer : Player
    }

type Msg
    = SetName String
    | AddPlayer
    | ModifyPlayer Int Bool
    | DeletePlayer Int

init : Model
init =
    { players = []
    , newPlayer = initPlayer 0
    }

updatePlayerName : Player -> String -> Player
updatePlayerName player newName =
    { player | name = newName }

updatePlayerStatus : Int -> Bool -> Player -> Player
updatePlayerStatus id status player =
    if player.id == id then
        { player | isActive = status }
    else
        player

update : Msg -> Model -> Model
update msg model =
    case msg of
        SetName name ->
            { model | newPlayer = updatePlayerName model.newPlayer name }
        AddPlayer ->
            let
                newPlayers = model.players ++ [model.newPlayer]
                newPlayerId = List.length newPlayers
                newPlayer = initPlayer newPlayerId
            in
                { model | players = newPlayers, newPlayer = newPlayer }
        DeletePlayer id ->
            { model | players = List.filter (\player -> player.id /= id) model.players }
        ModifyPlayer id status ->
            { model | players = List.map (updatePlayerStatus id status) model.players }

view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Elm Exercise: Players CRUD" ]
        , Html.form [ id "submit-player", onSubmit AddPlayer ]
            [ input [ id "input-player", type_ "text", value model.newPlayer.name, onInput SetName ] []
            , button [ id "btn-add", type_ "submit" ] [ text "Add" ]
            ]
        , ol [id "players-list"] (List.map playerListItem model.players)
        ]

playerListItem : Player -> Html Msg
playerListItem player =
    li [ id <| "player-" ++ String.fromInt player.id ]
        [ div [ class "player-name" ] [ text player.name ]
        , label [ class "player-status" ]
            [ text (if player.isActive then "Active" else "Inactive")
              , input
                [ type_ "checkbox"
                , class "player-status"
                , checked player.isActive
                , onClick <| ModifyPlayer player.id (not player.isActive)
                ]
                []
              , span [class "checkmark"] []
            ]
        , button [ class "btn-delete", onClick (DeletePlayer player.id) ] [ text "Delete" ]
        ]

main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }