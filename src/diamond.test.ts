import { createDiamond } from "./diamond";

const toSamples = [0, 1, 2, 5, 8, 9];

describe(createDiamond.name, () => {
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
      expect.stringMatching(/      0\s*/),
      expect.stringMatching(/     1 1\s*/),
      expect.stringMatching(/    2   2\s*/),
      expect.stringMatching(/   3     3\s*/),
      expect.stringMatching(/  4       4\s*/),
      expect.stringMatching(/ 5         5\s*/),
      expect.stringMatching(/6           6\s*/),
      expect.stringMatching(/ 5         5\s*/),
      expect.stringMatching(/  4       4\s*/),
      expect.stringMatching(/   3     3\s*/),
      expect.stringMatching(/    2   2\s*/),
      expect.stringMatching(/     1 1\s*/),
      expect.stringMatching(/      0\s*/),
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
});
