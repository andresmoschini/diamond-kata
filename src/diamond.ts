type CreateDiamondParameters = { to: number };
type CreateDiamondParametersFunction = (
  parameters: CreateDiamondParameters
) => string[];

export const createDiamond: CreateDiamondParametersFunction = ({ to }) => {
  const result = [];
  for (let i = 0; i <= to; i++) {
    const spaces = " ".repeat(to - i);
    const qMiddle = i * 2 - 1;
    const numberAndMiddle =
      qMiddle <= 0 ? `${i}` : `${i}${" ".repeat(qMiddle)}${i}`;
    result.push(`${spaces}${numberAndMiddle}${spaces}`);
  }
  for (let i = to - 1; i >= 0; i--) {
    const spaces = " ".repeat(to - i);
    const qMiddle = i * 2 - 1;
    const numberAndMiddle =
      qMiddle <= 0 ? `${i}` : `${i}${" ".repeat(qMiddle)}${i}`;
    result.push(`${spaces}${numberAndMiddle}${spaces}`);
  }
  return result;
};
