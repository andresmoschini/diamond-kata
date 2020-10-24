using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace DiamondKata
{
    public class DiamondLineAttributes
    {
        static readonly Regex LINE_FORMAT_REGEX = new Regex(@"^(\s*)(\w)((\s+)(\w))?(\s*)$");
        public int TotalLength { get; }
        public bool MatchesRegex { get; }
        public int LeadingSpacesLength { get; }
        public int TrailingSpacesLength { get; }

        public static DiamondLineAttributes Parse(string line)
            => new DiamondLineAttributes(line);

        DiamondLineAttributes(string line)
        {
            TotalLength = line.Length;
            var match = LINE_FORMAT_REGEX.Match(line);
            MatchesRegex = match.Success;
            if (MatchesRegex)
            {
                LeadingSpacesLength = match.Groups[1].Value.Length;
                TrailingSpacesLength = match.Groups[6].Value.Length;
            }
        }
    }
}
