using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace DiamondKata
{
    public static class Utils
    {
        public static IEnumerable<char> GetLetters(char from, char to)
        {
            while (from <= to)
            {
                yield return from++;
            }
        }

        public static IEnumerable<T> Mirror<T>(this IEnumerable<T> input)
            => input.Concat(input.Reverse().Skip(1));
    }
}
