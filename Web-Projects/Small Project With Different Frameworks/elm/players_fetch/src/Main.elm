-- Fetch players from end point on load
-- Update the id from the fetched players
-- Add player to the end of the list

module Main exposing (..)
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)

type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }

type alias Model =
    { players : List Player
    , newPlayer : Player
    , reqStatus : String
    }

type Msg
    = SetName String
    | ModifyPlayer Int Bool
    | AddPlayer
    | DeletePlayer Int
    | FetchPlayers (Result Http.Error (List Player))

playerDecoder : Decoder Player
playerDecoder =
    map3 Player (field "id" Decode.int) (field "name" Decode.string) (field "isActive" Decode.bool)

playersDecoder : Decoder (List Player)
playersDecoder =
    Decode.list playerDecoder

fetchPlayers : String -> Cmd Msg
fetchPlayers url =
    Http.get
        { url = url
        , expect = Http.expectJson FetchPlayers playersDecoder
        }

listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list


initPlayer : Int -> Player
initPlayer id =
    Player id "" False

init : () -> ( Model, Cmd Msg )
init _ =
    ( { 
        players = []
      , newPlayer = initPlayer 0
      , reqStatus = "Loading..."
    }
    , fetchPlayers "http://localhost:3001/api/players/"
    )

updatePlayerName : Player -> String -> Player
updatePlayerName player newName =
    { player | name = newName }

updatePlayerStatus : Int -> Bool -> Player -> Player
updatePlayerStatus id status player =
    if player.id == id then
        { player | isActive = status }
    else
        player

addToLastElement : List Player -> Int
addToLastElement list =
    case List.reverse list of
        [] -> 1
        head :: _ -> head.id + 1

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetName name ->
            ({ model | newPlayer = updatePlayerName model.newPlayer name}, Cmd.none)
        AddPlayer ->
            ({ model | players = model.players ++ [model.newPlayer], newPlayer = initPlayer (addToLastElement model.players)}, Cmd.none)
        DeletePlayer id ->
            ({ model | players = List.filter (\player -> player.id /= id) model.players }, Cmd.none)
        ModifyPlayer id status ->
            ({ model | players = List.map (updatePlayerStatus id status) model.players }, Cmd.none)
        FetchPlayers result ->
            case result of
                Ok players ->
                    ({ model | players = players, reqStatus = "" }, Cmd.none)
                Err _ ->
                    ({ model | reqStatus = "An error has occurred!!!" }, Cmd.none)

view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Elm Exercise: Players fetch" ]
        , Html.form [ id "submit-player", onSubmit AddPlayer ]
            [ input [ id "input-player", type_ "text", value model.newPlayer.name, onInput SetName ] []
            , button [ id "btn-add", type_ "submit" ] [ text "Add" ]
            ]
        , ol [id "players-list"] (List.map playerListItem model.players)
        , div [ id "request-status" ] [ text model.reqStatus ]
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
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
