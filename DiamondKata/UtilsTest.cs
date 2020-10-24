using System;
using System.Linq;
using DiamondKataFSharp;
using Xunit;

namespace DiamondKata
{
    public class UtilsTest
    {
        [DiamondLetterProperty]
        public void GetLetters_result_should_start_with_from_and_end_with_to(char from, char to)
        {
            // I do not know how to configure FsCheck to define that `to` should
            // be greater than `from`.
            var result = Utils.GetLetters(from, to);
            if (from > to)
            {
                Assert.Empty(result);
            }
            else
            {
                Assert.Equal(from, result.First());
                Assert.Equal(to, result.Last());
            }
        }

        [Theory]
        [InlineData('A', 'B', "AB")]
        [InlineData('A', 'Z', "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]
        [InlineData('K', 'S', "KLMNOPQRS")]
        [InlineData('S', 'K', "")]
        [InlineData('L', 'L', "L")]
        public void GetLetters_result_should_make_honor_to_the_samples(char from, char to, string expected)
        {
            var result = Utils.GetLetters(from, to);
            Assert.Equal(expected, result);
        }
    }
}
