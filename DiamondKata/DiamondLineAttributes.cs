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
        public char FirstLetter { get; }
        public char LastLetter { get; }
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
                FirstLetter = match.Groups[2].Value.FirstOrDefault();
                LastLetter = match.Groups[5].Value?.Cast<char?>().FirstOrDefault() ?? FirstLetter;
                TrailingSpacesLength = match.Groups[6].Value.Length;
            }
        }
    }
}
