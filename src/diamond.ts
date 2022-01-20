type CreateDiamondParameters = { to: number };
type CreateDiamondParametersFunction = (
  parameters: CreateDiamondParameters
) => string[];

export const createDiamond: CreateDiamondParametersFunction = ({ to }) => {
  const result = [];
  for (let i = 0; i <= to; i++) {
    result.push(`0`);
  }
  for (let i = to; i > 0; i--) {
    result.push(`0`);
  }
  return result;
};
