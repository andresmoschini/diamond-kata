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
});
