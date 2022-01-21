import {
  convertLetterToNumber,
  convertNumberToLetter,
  createDiamond,
} from "./diamond";

const toSamples = [0, 1, 2, 5, 8, 9];

const lettersAndNumbers = [
  { letter: "A", number: 0 },
  { letter: "B", number: 1 },
  { letter: "C", number: 2 },
  { letter: "F", number: 5 },
  { letter: "I", number: 8 },
  { letter: "J", number: 9 },
  { letter: "N", number: 13 },
  { letter: "O", number: 14 },
  { letter: "Z", number: 25 },
];

describe(convertLetterToNumber.name, () => {
  it.each(lettersAndNumbers)(
    "should return $number when input is $letter",
    ({ letter, number }) => {
      // arrange

      // act
      const result = convertLetterToNumber(letter);

      // assert
      expect(result).toBe(number);
    }
  );
});

describe(convertNumberToLetter.name, () => {
  it.each(lettersAndNumbers)(
    "should return $letter when input is $number",
    ({ letter, number }) => {
      // arrange

      // act
      const result = convertNumberToLetter(number);

      // assert
      expect(result).toBe(letter);
    }
  );
});

describe(`${createDiamond.name} (numbers)`, () => {
  it.each(toSamples)(
    "should return an array of string when `to is %i`",
    (to) => {
      // prepare
      const parameters = { to };

      // act
      const result = createDiamond(parameters);

      // assert
      expect(result).toEqual(
        expect.arrayContaining([expect.stringContaining("")])
      );
    }
  );

  it.each(toSamples)("should have more than a line when `to is %i`", (to) => {
    // prepare
    const parameters = { to };

    // act
    const result = createDiamond(parameters);

    // assert
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it.each(toSamples)(
    "should return an array with the first line containing 0 when `to is %i`",
    (to) => {
      // prepare
      const parameters = { to };

      // act
      const result = createDiamond(parameters);

      // assert
      expect(result[0]).toEqual(expect.stringContaining("0"));
    }
  );

  it.each(toSamples)(
    "should return an array with the last line containing 0 when `to is %i`",
    (to) => {
      // prepare
      const parameters = { to };

      // act
      const result = createDiamond(parameters);

      // assert
      expect(result[result.length - 1]).toEqual(expect.stringContaining("0"));
    }
  );

  it.each(toSamples)(
    "should return twice less one lines when `to is %i`",
    (to) => {
      // prepare
      const parameters = { to };
      const expectedLinesCount = (to + 1) * 2 - 1;

      // act
      const result = createDiamond(parameters);

      // assert
      expect(result.length).toEqual(expectedLinesCount);
    }
  );

  it.each(toSamples)(
    "should return an array with the middle line containing to when `to is %i`",
    (to) => {
      // prepare
      const parameters = { to };
      const expectedLinesCount = (to + 1) * 2 - 1;
      const middleLineNumber = (expectedLinesCount + 1) / 2 - 1;

      // act
      const result = createDiamond(parameters);

      // assert
      expect(result[middleLineNumber]).toContain(`${to}`);
    }
  );

  it("should return the right diamond when `to is 6`", () => {
    // prepare
    const parameters = { to: 6 };

    // act
    const result = createDiamond(parameters);

    // assert
    expect(result).toEqual([
      "      0      ",
      "     1 1     ",
      "    2   2    ",
      "   3     3   ",
      "  4       4  ",
      " 5         5 ",
      "6           6",
      " 5         5 ",
      "  4       4  ",
      "   3     3   ",
      "    2   2    ",
      "     1 1     ",
      "      0      ",
    ]);
  });

  it.each(toSamples)(
    "should return an array with as much spaces before the number when `to is %i`",
    (to) => {
      // . . . 0        | i -> 0 | qPrefix -> 3
      // . . 1   1      | i -> 1 | qPrefix -> 2
      // . 2       2    | i -> 2 | qPrefix -> 1
      // 3           3  | i -> 3 | qPrefix -> 0
      // . 2       2    | i -> 4 | qPrefix -> 1
      // . . 1   1      | i -> 5 | qPrefix -> 2
      // . . . 0        | i -> 6 | qPrefix -> 3

      // prepare
      const parameters = { to };
      const prefixRegex = /^(\s*)[^\s]/;

      // act
      const result = createDiamond(parameters);

      // assert
      for (let i = 0; i < result.length; i++) {
        const row = result[i];
        const expectedQPrefix = Math.abs(to - i);
        const prefixRegexResult = prefixRegex.exec(row);
        expect(prefixRegexResult).not.toBeNull();
        expect(prefixRegexResult?.length).toBe(2);
        const qPrefix = prefixRegexResult?.[1].length;
        expect(qPrefix).toEqual(expectedQPrefix);
      }
    }
  );

  it.each(toSamples)(
    "should return an array with the right spaces between numbers when `to is %i`",
    (to) => {
      //       0        | i -> 0 | (to - abs(to - i)) -> 0 | qMiddle -> 0
      //     1 . 1      | i -> 1 | (to - abs(to - i)) -> 1 | qMiddle -> 1
      //   2 . . . 2    | i -> 2 | (to - abs(to - i)) -> 2 | qMiddle -> 3
      // 3 . . . . . 3  | i -> 3 | (to - abs(to - i)) -> 3 | qMiddle -> 5
      //   2 . . . 2    | i -> 4 | (to - abs(to - i)) -> 2 | qMiddle -> 3
      //     1 . 1      | i -> 5 | (to - abs(to - i)) -> 1 | qMiddle -> 1
      //       0        | i -> 6 | (to - abs(to - i)) -> 0 | qMiddle -> 0
      // prepare
      const parameters = { to };
      const middleRegex = /[^\s](?:(\s+)[^\s])?/;

      // act
      const result = createDiamond(parameters);

      // assert
      const firstRow = result[0];
      const firstRowPrefixRegexResult = middleRegex.exec(firstRow);
      expect(firstRowPrefixRegexResult?.[1]).toBeUndefined();
      for (let i = 1; i < result.length - 1; i++) {
        const row = result[i];
        const expectedQMiddle = (to - Math.abs(to - i)) * 2 - 1;
        const prefixRegexResult = middleRegex.exec(row);
        expect(prefixRegexResult).not.toBeNull();
        expect(prefixRegexResult?.length).toBe(2);
        const qPrefix = prefixRegexResult?.[1]?.length || 0;
        expect(qPrefix).toEqual(expectedQMiddle);
      }
      const lastRow = result[result.length];
      const lastRowPrefixRegexResult = middleRegex.exec(lastRow);
      expect(lastRowPrefixRegexResult?.[1]).toBeUndefined();
    }
  );

  it.each(toSamples)(
    "should return an array with the right spaces between numbers when `to is %i`",
    (to) => {
      //       0        | i -> 0 | (to * 2 + 1) -> 7 | row.length -> 7
      //     1   1      | i -> 1 | (to * 2 + 1) -> 7 | row.length -> 7
      //   2       2    | i -> 2 | (to * 2 + 1) -> 7 | row.length -> 7
      // 3           3  | i -> 3 | (to * 2 + 1) -> 7 | row.length -> 7
      //   2       2    | i -> 4 | (to * 2 + 1) -> 7 | row.length -> 7
      //     1   1      | i -> 5 | (to * 2 + 1) -> 7 | row.length -> 7
      //       0        | i -> 6 | (to * 2 + 1) -> 7 | row.length -> 7
      // prepare
      const parameters = { to };

      // act
      const result = createDiamond(parameters);

      // assert
      for (var row of result) {
        expect(row.length).toBe(to * 2 + 1);
      }
    }
  );
});

describe(`${createDiamond.name} (letters)`, () => {
  it.each(lettersAndNumbers)(
    "should return an array of string when `to is $letter`",
    ({ letter, number }) => {
      // prepare
      const parameters = { to: letter };

      // act
      const result = createDiamond(parameters);

      // assert
      expect(result).toEqual(
        expect.arrayContaining([expect.stringContaining("")])
      );
    }
  );

  it.each(lettersAndNumbers)(
    "should have more than a line when `to is %i`",
    ({ letter, number }) => {
      // prepare
      const parameters = { to: letter };

      // act
      const result = createDiamond(parameters);

      // assert
      expect(result.length).toBeGreaterThanOrEqual(1);
    }
  );

  it.each(lettersAndNumbers)(
    "should return an array with the first line containing 0 when `to is %i`",
    ({ letter, number }) => {
      // prepare
      const parameters = { to: letter };

      // act
      const result = createDiamond(parameters);

      // assert
      expect(result[0]).toEqual(expect.stringContaining("A"));
    }
  );

  it.each(lettersAndNumbers)(
    "should return an array with the last line containing 0 when `to is %i`",
    ({ letter, number }) => {
      // prepare
      const parameters = { to: letter };

      // act
      const result = createDiamond(parameters);

      // assert
      expect(result[result.length - 1]).toEqual(expect.stringContaining("A"));
    }
  );

  it.each(lettersAndNumbers)(
    "should return twice less one lines when `to is %i`",
    ({ letter, number }) => {
      // prepare
      const parameters = { to: letter };
      const expectedLinesCount = (number + 1) * 2 - 1;

      // act
      const result = createDiamond(parameters);

      // assert
      expect(result.length).toEqual(expectedLinesCount);
    }
  );

  it.each(lettersAndNumbers)(
    "should return an array with the middle line containing to when `to is %i`",
    ({ letter, number }) => {
      // prepare
      const parameters = { to: letter };
      const expectedLinesCount = (number + 1) * 2 - 1;
      const middleLineNumber = (expectedLinesCount + 1) / 2 - 1;

      // act
      const result = createDiamond(parameters);

      // assert
      expect(result[middleLineNumber]).toContain(`${letter}`);
    }
  );

  it("should return the right diamond when `to is G`", () => {
    // prepare
    const parameters = { to: "G" };

    // act
    const result = createDiamond(parameters);

    // assert
    expect(result).toEqual([
      "      A      ",
      "     B B     ",
      "    C   C    ",
      "   D     D   ",
      "  E       E  ",
      " F         F ",
      "G           G",
      " F         F ",
      "  E       E  ",
      "   D     D   ",
      "    C   C    ",
      "     B B     ",
      "      A      ",
    ]);
  });

  it.each(lettersAndNumbers)(
    "should return an array with as much spaces before the number when `to is %i`",
    ({ letter, number }) => {
      // . . . A        | i -> 0 | qPrefix -> 3
      // . . B   B      | i -> 1 | qPrefix -> 2
      // . C       C    | i -> 2 | qPrefix -> 1
      // D           D  | i -> 3 | qPrefix -> 0
      // . C       C    | i -> 4 | qPrefix -> 1
      // . . B   B      | i -> 5 | qPrefix -> 2
      // . . . A        | i -> 6 | qPrefix -> 3

      // prepare
      const parameters = { to: letter };
      const prefixRegex = /^(\s*)[^\s]/;

      // act
      const result = createDiamond(parameters);

      // assert
      for (let i = 0; i < result.length; i++) {
        const row = result[i];
        const expectedQPrefix = Math.abs(number - i);
        const prefixRegexResult = prefixRegex.exec(row);
        expect(prefixRegexResult).not.toBeNull();
        expect(prefixRegexResult?.length).toBe(2);
        const qPrefix = prefixRegexResult?.[1].length;
        expect(qPrefix).toEqual(expectedQPrefix);
      }
    }
  );

  it.each(lettersAndNumbers)(
    "should return an array with the right spaces between numbers when `to is %i`",
    ({ letter, number }) => {
      //       A        | i -> 0 | (number - abs(number - i)) -> 0 | qMiddle -> 0
      //     B . B      | i -> 1 | (number - abs(number - i)) -> 1 | qMiddle -> 1
      //   C . . . C    | i -> 2 | (number - abs(number - i)) -> 2 | qMiddle -> 3
      // D . . . . . D  | i -> 3 | (number - abs(number - i)) -> 3 | qMiddle -> 5
      //   C . . . C    | i -> 4 | (number - abs(number - i)) -> 2 | qMiddle -> 3
      //     B . B      | i -> 5 | (number - abs(number - i)) -> 1 | qMiddle -> 1
      //       A        | i -> 6 | (number - abs(number - i)) -> 0 | qMiddle -> 0
      // prepare
      const parameters = { to: letter };
      const middleRegex = /[^\s](?:(\s+)[^\s])?/;

      // act
      const result = createDiamond(parameters);

      // assert
      const firstRow = result[0];
      const firstRowPrefixRegexResult = middleRegex.exec(firstRow);
      expect(firstRowPrefixRegexResult?.[1]).toBeUndefined();
      for (let i = 1; i < result.length - 1; i++) {
        const row = result[i];
        const expectedQMiddle = (number - Math.abs(number - i)) * 2 - 1;
        const prefixRegexResult = middleRegex.exec(row);
        expect(prefixRegexResult).not.toBeNull();
        expect(prefixRegexResult?.length).toBe(2);
        const qPrefix = prefixRegexResult?.[1]?.length || 0;
        expect(qPrefix).toEqual(expectedQMiddle);
      }
      const lastRow = result[result.length];
      const lastRowPrefixRegexResult = middleRegex.exec(lastRow);
      expect(lastRowPrefixRegexResult?.[1]).toBeUndefined();
    }
  );

  it.each(lettersAndNumbers)(
    "should return an array with the right spaces between numbers when `to is %i`",
    ({ letter, number }) => {
      //       A        | i -> 0 | (number * 2 + 1) -> 7 | row.length -> 7
      //     B   B      | i -> 1 | (number * 2 + 1) -> 7 | row.length -> 7
      //   C       C    | i -> 2 | (number * 2 + 1) -> 7 | row.length -> 7
      // D           D  | i -> 3 | (number * 2 + 1) -> 7 | row.length -> 7
      //   C       C    | i -> 4 | (number * 2 + 1) -> 7 | row.length -> 7
      //     B   B      | i -> 5 | (number * 2 + 1) -> 7 | row.length -> 7
      //       A        | i -> 6 | (number * 2 + 1) -> 7 | row.length -> 7
      // prepare
      const parameters = { to: letter };

      // act
      const result = createDiamond(parameters);

      // assert
      for (var row of result) {
        expect(row.length).toBe(number * 2 + 1);
      }
    }
  );
});
