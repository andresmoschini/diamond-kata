type CreateDiamondParameters = { to: number | string };
type CreateDiamondParametersFunction = (
  parameters: CreateDiamondParameters
) => string[];

const renderLine = ({
  number,
  qSpaces,
  qMiddle,
  renderMode = "number",
}: {
  number: number;
  qSpaces: number;
  qMiddle: number;
  renderMode: "number" | "letter";
}) => {
  const char =
    renderMode === "number" ? `${number}` : convertNumberToLetter(number);
  const spaces = " ".repeat(qSpaces);
  const numberAndMiddle =
    qMiddle <= 0 ? `${char}` : `${char}${" ".repeat(qMiddle)}${char}`;
  return `${spaces}${numberAndMiddle}${spaces}`;
};

export const createDiamond: CreateDiamondParametersFunction = ({ to }) => {
  const renderMode = typeof to === "number" ? "number" : "letter";
  const toNumber =
    renderMode === "number"
      ? (to as number)
      : convertLetterToNumber(to as string);
  const result = [];
  for (let i = 0; i <= toNumber; i++) {
    result.push(
      renderLine({
        number: i,
        qSpaces: toNumber - i,
        qMiddle: i * 2 - 1,
        renderMode,
      })
    );
  }
  for (let i = toNumber - 1; i >= 0; i--) {
    result.push(
      renderLine({
        number: i,
        qSpaces: toNumber - i,
        qMiddle: i * 2 - 1,
        renderMode,
      })
    );
  }
  return result;
};

export const convertLetterToNumber = (letter: string) =>
  letter.charCodeAt(0) - "A".charCodeAt(0);

export const convertNumberToLetter = (number: number) =>
  String.fromCharCode(number + "A".charCodeAt(0));
