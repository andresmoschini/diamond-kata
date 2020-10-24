namespace DiamondKataFSharp

open FsCheck
open FsCheck.Xunit

// I added these types in a F# project because I do not know how to do it in C#

type Letters =
    static member Char() =
        Arb.Default.Char()
        |> Arb.filter (fun c -> 'A' <= c && c <= 'Z')

type DiamondLetterPropertyAttribute() =
    inherit PropertyAttribute(
        Arbitrary = [| typeof<Letters> |],
        QuietOnSuccess = true)
