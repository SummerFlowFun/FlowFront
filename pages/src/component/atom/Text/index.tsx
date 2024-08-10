import { FontSize, getFontSizeClass } from "@/pages/src/utils/typography";
import { ReactNode } from "react";

interface TextProps {
  fontSize?: FontSize;
  children?: ReactNode;
  color?: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Text = ({
  fontSize,
  children,
  color,
  className = "",
  onClick,
  style,
}: TextProps) => {
  const fontSizeClass = getFontSizeClass(fontSize);
  const combinedClassNames = `${fontSizeClass}${
    className ? ` ${className}` : ""
  }`;

  return (
    <span
      className={`${combinedClassNames} whitespace-pre-wrap break-all`}
      style={{ color: color, ...style }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Text;
