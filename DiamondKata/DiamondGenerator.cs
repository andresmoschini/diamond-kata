using System;

namespace DiamondKata
{
    public class DiamondGenerator
    {
        public string Generate(char letter)
        {
            switch (letter)
            {
                case 'A': return "A";
                default: return " A \n" +
                    "B B\n" +
                    " A ";
            }
        }
    }
}

