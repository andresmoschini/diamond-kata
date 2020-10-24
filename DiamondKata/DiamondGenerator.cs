using System;
using System.Linq;

namespace DiamondKata
{
    public class DiamondGenerator
    {
        private string FormatLine(char letter, int total, int position)
        {
            var leadingSpacesLength = total - position;
            var halfLine = Enumerable.Repeat(' ', leadingSpacesLength)
                .Append(letter)
                .Concat(Enumerable.Repeat(' ', total - leadingSpacesLength));
            var line = halfLine
                .Concat(halfLine.Reverse().Skip(1));
            return string.Join("", line);
        }

        public string Generate(char letter)
        {
            var letters = Utils.GetLetters('A', letter);
            var halfDiamond = letters.Select((l, pos) => FormatLine(l, letters.Count() - 1, pos));
            var diamond = halfDiamond
                .Concat(halfDiamond.Reverse().Skip(1));
            return string.Join('\n', diamond);
        }
    }
}

