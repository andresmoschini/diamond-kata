type CreateDiamondParameters = { to: number };
type CreateDiamondParametersFunction = (
  parameters: CreateDiamondParameters
) => string[];

export const createDiamond: CreateDiamondParametersFunction = ({ to }) => {
  const result = [];
  for (let i = 0; i <= to; i++) {
    const prefix = " ".repeat(to - i);
    result.push(`${prefix}${i}`);
  }
  for (let i = to - 1; i >= 0; i--) {
    const prefix = " ".repeat(to - i);
    result.push(`${prefix}${i}`);
  }
  return result;
};
