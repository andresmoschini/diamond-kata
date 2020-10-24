using System;
using System.Linq;
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
    }
}
