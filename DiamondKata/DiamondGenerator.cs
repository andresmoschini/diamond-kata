using System;
using System.Linq;

namespace DiamondKata
{
    public class DiamondGenerator
    {
        private string FormatLine(char letter, int total, int position)
            => string.Join("", Enumerable.Repeat(' ', total - position)
                .Append(letter)
                .Concat(Enumerable.Repeat(' ', position))
                .Mirror());

        public string Generate(char letter)
            => string.Join('\n', Utils.GetLetters('A', letter)
                .Select((l, pos) => FormatLine(l, letter - 'A', pos))
                .Mirror());
    }
}

