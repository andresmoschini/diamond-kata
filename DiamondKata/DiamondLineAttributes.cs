using System;
using System.Linq;

namespace DiamondKata
{
    public class DiamondLineAttributes
    {
        public int TotalLength { get; }

        public static DiamondLineAttributes Parse(string line)
            => new DiamondLineAttributes(line);

        DiamondLineAttributes(string line)
        {
            TotalLength = line.Length;
        }
    }
}
