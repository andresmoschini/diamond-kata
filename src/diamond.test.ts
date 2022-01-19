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

  it.each(toSamples)("should have more than a line", (to) => {
    // prepare
    const parameters = { to };

    // act
    const result = createDiamond(parameters);

    // assert
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
