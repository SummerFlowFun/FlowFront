import { useEffect, useRef, useState } from "react";
import { PaperPlane } from "../main/mainSVG";
import Header from "@/src/component/atom/Header/Header";

export const SearchMain = ({ foodName, setFoodName, setStage }: any) => {
  const NameIndex = useRef(0);

  useEffect(() => {
    setInterval(() => {
      const NameArr = [
        "소고기",
        "피자",
        "치킨",
        "햄버거",
        "족발",
        "초밥",
        "라면",
      ];

      if (NameIndex.current >= 0) {
        setFoodName(NameArr[NameIndex.current]);
        NameIndex.current += 1;
        if (NameIndex.current === NameArr.length) NameIndex.current = 0;
      }
    }, 500);
  }, []);

  const handleName = (e: any) => {
    const Value = e.target.value;
    setFoodName(Value);
    if (Value === "") NameIndex.current = 0;
    else NameIndex.current = -1;
  };

  const SubmitName = () => {
    setStage(1);
  };

  return (
    <>
      <div
        className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`}
      >
        <div className={`w-full px-4 bg-white`}>
          <Header title="검색" />
        </div>
        <div
          className={`w-full bg-milky_white flex gap-4 flex-col items-center justify-center gap-2`}
        >
          <span className={`font-jeju text-8xl`}>나 는</span>
          <div
            className={`w-3/4 h-[4rem] my-6 bg-white rounded-full flex justify-between gap-2`}
          >
            <input
              type="text"
              onChange={handleName}
              placeholder={foodName}
              className={`w-full h-full placeholder:text-gray1 text-4xl placeholder:text-4xl text-water_blue rounded-full focus:outline-none text-center font-jeju text-2xl`}
            />
            {NameIndex.current < 0 && (
              <button
                onClick={SubmitName}
                className={`w-[4rem] h-[4rem] rounded-full grid place-items-center mr-2`}
              >
                <PaperPlane />
              </button>
            )}
          </div>
          <span className={`font-jeju text-8xl`}>먹 고</span>
          <span className={`font-jeju text-8xl`}>싶 다</span>{" "}
        </div>
      </div>
    </>
  );
};
