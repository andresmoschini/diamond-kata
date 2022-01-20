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
      expect(result[middleLineNumber]).toEqual(`${to}`);
    }
  );

  it("should return the right diamond when `to is 6`", () => {
    // prepare
    const parameters = { to: 6 };

    // act
    const result = createDiamond(parameters);

    // assert
    expect(result).toEqual([
      expect.stringMatching(/\s*0\s*/),
      expect.stringMatching(/\s*(1\s*){1,2}/),
      expect.stringMatching(/\s*(2\s*){1,2}/),
      expect.stringMatching(/\s*(3\s*){1,2}/),
      expect.stringMatching(/\s*(4\s*){1,2}/),
      expect.stringMatching(/\s*(5\s*){1,2}/),
      expect.stringMatching(/\s*(6\s*){1,2}/),
      expect.stringMatching(/\s*(5\s*){1,2}/),
      expect.stringMatching(/\s*(4\s*){1,2}/),
      expect.stringMatching(/\s*(3\s*){1,2}/),
      expect.stringMatching(/\s*(2\s*){1,2}/),
      expect.stringMatching(/\s*(1\s*){1,2}/),
      expect.stringMatching(/\s*(0\s*){1,2}/),
    ]);
  });
});
