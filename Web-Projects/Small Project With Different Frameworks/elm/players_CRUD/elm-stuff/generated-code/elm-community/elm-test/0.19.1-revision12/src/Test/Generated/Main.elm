module Test.Generated.Main exposing (main)

import Helper
import Tests

import Test.Reporter.Reporter exposing (Report(..))
import Console.Text exposing (UseColor(..))
import Test.Runner.Node
import Test

main : Test.Runner.Node.TestProgram
main =
    Test.Runner.Node.run
        { runs = 100
        , report = ConsoleReport UseColor
        , seed = 225309740685576
        , processes = 12
        , globs =
            []
        , paths =
            [ "D:\\OneDrive - TUNI.fi\\2023-2024\\Periodit 3-4\\Advanced web front-ends\\nctesa\\elm\\players_CRUD\\tests\\Helper.elm"
            , "D:\\OneDrive - TUNI.fi\\2023-2024\\Periodit 3-4\\Advanced web front-ends\\nctesa\\elm\\players_CRUD\\tests\\Tests.elm"
            ]
        }
        [ ( "Helper"
          , [ Test.Runner.Node.check Helper.add
            , Test.Runner.Node.check Helper.testModel
            , Test.Runner.Node.check Helper.testFalsePlayer
            , Test.Runner.Node.check Helper.testTruePlayer
            , Test.Runner.Node.check Helper.testFalsePlayers
            ]
          )
        , ( "Tests"
          , [ Test.Runner.Node.check Tests.suite
            ]
          )
        ]