using System;
using System.Linq;
using DiamondKataFSharp;
using FsCheck;
using FsCheck.Xunit;
using Xunit;

namespace DiamondKata
{
    public class DiamondGeneratorTest
    {
        [Fact]
        public void Generator_should_return_A_when_the_letter_is_A()
        {
            var expectedResult = "A";
            var letter = 'A';
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            Assert.Equal(expectedResult, result);
        }

        [Fact]
        public void Generator_should_return_a_little_diamond_when_the_letter_is_B()
        {
            var expectedResult =
                " A \n" +
                "B B\n" +
                " A ";
            var letter = 'B';
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            Assert.Equal(expectedResult, result);
        }

        [DiamondLetterProperty]
        public bool Generator_should_not_return_empty(char letter)
        {
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            return !string.IsNullOrWhiteSpace(result);
        }

        [DiamondLetterProperty]
        public void Generator_should_return_an_A_in_the_first_line(char letter)
        {
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            var firstLine = result.Split('\n').First();
            Assert.Contains("A", firstLine);
            Assert.Equal("A", firstLine.Trim());
        }

        [DiamondLetterProperty]
        public void Generator_should_return_an_A_in_the_last_line(char letter)
        {
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            var lastLine = result.Split('\n').Last();
            Assert.Contains("A", lastLine);
            Assert.Equal("A", lastLine.Trim());
        }

        [DiamondLetterProperty]
        public void Generator_should_return_a_result_with_all_lines_with_the_same_length(char letter)
        {
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            var linesAttributes = result.Split('\n').Select(DiamondLineAttributes.Parse);
            var firstLineLength = linesAttributes.First().TotalLength;

            Assert.All(linesAttributes, attrs => {
                Assert.Equal(firstLineLength, attrs.TotalLength);
            });
        }
    }
}
