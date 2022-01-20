type CreateDiamondParameters = { to: number };
type CreateDiamondParametersFunction = (
  parameters: CreateDiamondParameters
) => string[];

export const createDiamond: CreateDiamondParametersFunction = ({ to }) => {
  const result = [];
  for (let i = 0; i <= to; i++) {
    result.push(`${i}`);
  }
  for (let i = to - 1; i >= 0; i--) {
    result.push(`${i}`);
  }
  return result;
};
