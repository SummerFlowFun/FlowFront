export type FontSize =
  | "bigTitle"
  | "title"
  | "body1Bold"
  | "body1"
  | "body2Bold"
  | "body2"
  | "caption";

export const getFontSizeClass = (size?: FontSize): string => {
  switch (size) {
    case "bigTitle":
      return "text-2xl font-bold";
    case "title":
      return "text-xl font-bold";
    case "body1Bold":
      return "text-base font-semibold";
    case "body1":
      return "text-base font-normal";
    case "body2Bold":
      return "text-sm font-bold";
    case "body2":
      return "text-sm";
    case "caption":
      return "text-xs";
    default:
      return "";
  }
};
