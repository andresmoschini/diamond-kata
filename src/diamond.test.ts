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
      expect.stringMatching(/      (0\s*){1,2}/),
      expect.stringMatching(/     (1\s*){1,2}/),
      expect.stringMatching(/    (2\s*){1,2}/),
      expect.stringMatching(/   (3\s*){1,2}/),
      expect.stringMatching(/  (4\s*){1,2}/),
      expect.stringMatching(/ (5\s*){1,2}/),
      expect.stringMatching(/(6\s*){1,2}/),
      expect.stringMatching(/ (5\s*){1,2}/),
      expect.stringMatching(/  (4\s*){1,2}/),
      expect.stringMatching(/   (3\s*){1,2}/),
      expect.stringMatching(/    (2\s*){1,2}/),
      expect.stringMatching(/     (1\s*){1,2}/),
      expect.stringMatching(/      (0\s*){1,2}/),
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
      const qPrefixRegex = /^(\s*)[^\s]/;

      // act
      const result = createDiamond(parameters);

      // assert
      for (let i = 0; i < result.length; i++) {
        const row = result[i];
        const expectedQPrefix = Math.abs(to - i);
        const qPrefixRegexResult = qPrefixRegex.exec(row);
        expect(qPrefixRegexResult).not.toBeNull();
        expect(qPrefixRegexResult?.length).toBe(2);
        const qPrefix = qPrefixRegexResult?.[1].length;
        expect(qPrefix).toEqual(expectedQPrefix);
      }
    }
  );
});
