type CreateDiamondParameters = { to: number };
type CreateDiamondParametersFunction = (
  parameters: CreateDiamondParameters
) => string[];

const renderLine = ({
  number,
  qSpaces,
  qMiddle,
}: {
  number: number;
  qSpaces: number;
  qMiddle: number;
}) => {
  const char = `${number}`;
  const spaces = " ".repeat(qSpaces);
  const numberAndMiddle =
    qMiddle <= 0 ? `${char}` : `${char}${" ".repeat(qMiddle)}${char}`;
  return `${spaces}${numberAndMiddle}${spaces}`;
};

export const createDiamond: CreateDiamondParametersFunction = ({ to }) => {
  const result = [];
  for (let i = 0; i <= to; i++) {
    result.push(renderLine({ number: i, qSpaces: to - i, qMiddle: i * 2 - 1 }));
  }
  for (let i = to - 1; i >= 0; i--) {
    result.push(renderLine({ number: i, qSpaces: to - i, qMiddle: i * 2 - 1 }));
  }
  return result;
};

export const convertLetterToNumber = (letter: string) =>
  letter.charCodeAt(0) - "A".charCodeAt(0);

export const convertNumberToLetter = (number: number) =>
  String.fromCharCode(number + "A".charCodeAt(0));
