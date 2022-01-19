import { createDiamond } from "./diamond";

describe(createDiamond.name, () => {
  it.each([1, 2, 3])("should return an array of string", (to) => {
    // prepare
    const parameters = { to };

    // act
    const result = createDiamond(parameters);

    // assert
    expect(result).toEqual(expect.arrayContaining([expect.stringContaining("")]));
  });
});
