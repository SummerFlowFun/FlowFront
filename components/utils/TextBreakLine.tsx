import { Fragment } from "react";

const TextWithLineBreaks = ({ text }: any) => {
  return (
    <div>
      {text.split("\n").map((line: any, index: number) => (
        <Fragment key={index}>
          {line}
          {index < text.split("\n").length - 1 && <br />}
        </Fragment>
      ))}
    </div>
  );
};

export default TextWithLineBreaks;
