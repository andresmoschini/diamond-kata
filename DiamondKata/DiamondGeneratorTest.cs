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
        public void Generator_should_return_a_result_with_all_lines_matching_our_regex(char letter)
        {
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            var linesAttributes = result.Split('\n').Select(DiamondLineAttributes.Parse);
            Assert.All(linesAttributes, attrs =>
            {
                Assert.True(attrs.MatchesRegex);
            });
        }

        [DiamondLetterProperty]
        public void Generator_should_return_an_A_in_the_first_line(char letter)
        {
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            var firstLineAttributes = result.Split('\n').Select(DiamondLineAttributes.Parse).First();
            Assert.Equal('A', firstLineAttributes.FirstLetter);
        }

        [DiamondLetterProperty]
        public void Generator_should_return_an_A_in_the_last_line(char letter)
        {
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            var lastLineAttributes = result.Split('\n').Select(DiamondLineAttributes.Parse).Last();
            Assert.Equal('A', lastLineAttributes.FirstLetter);
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

        [DiamondLetterProperty]
        public void Generator_should_return_a_result_with_vertical_axis_symmetric_leading_and_trailing_spaces(char letter)
        {
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            var linesAttributes = result.Split('\n').Select(DiamondLineAttributes.Parse);

            Assert.All(linesAttributes, attrs =>
            {
                Assert.True(attrs.MatchesRegex);
                Assert.Equal(attrs.LeadingSpacesLength, attrs.TrailingSpacesLength);
            });
        }


        [DiamondLetterProperty]
        public void Generator_should_return_a_result_with_the_same_letter_in_a_line(char letter)
        {
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            var linesAttributes = result.Split('\n').Select(DiamondLineAttributes.Parse);

            Assert.All(linesAttributes, attrs =>
            {
                Assert.True(attrs.MatchesRegex);
                Assert.Equal(attrs.FirstLetter, attrs.LastLetter);
            });
        }

        [DiamondLetterProperty]
        public void Generator_should_return_a_result_with_horizontal_axis_symmetry(char letter)
        {
            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            var lines = result.Split('\n');
            var middleIndex = lines.Length / 2;
            var topLines = lines.Take(middleIndex);
            var bottonLines = lines.TakeLast(middleIndex).Reverse();
            var zip = Enumerable.Zip(topLines, bottonLines);

            Assert.All(zip, pair =>
            {
                Assert.Equal(pair.First, pair.Second);
            });
        }

        [DiamondLetterProperty]
        public void Generator_should_return_a_result_with_line_letters_in_the_correct_order(char letter)
        {
            var expectedLetters = Utils.GetLetters('A', letter).Mirror();

            var sut = new DiamondGenerator();
            var result = sut.Generate(letter);
            var resultLetters = result.Split('\n').Select(DiamondLineAttributes.Parse).Select(x => x.FirstLetter);

            Assert.Equal(expectedLetters.Count(), resultLetters.Count());

            var zip = Enumerable.Zip(expectedLetters, resultLetters);

            Assert.All(zip, pair =>
            {
                Assert.Equal(pair.First, pair.Second);
            });
        }
    }
}
