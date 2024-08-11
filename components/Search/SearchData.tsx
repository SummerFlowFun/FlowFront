import Header from "@/src/component/atom/Header/Header";
import axios from "axios";
import { Fragment, useEffect } from "react";

export const SearchData = ({ foodData, setStage }: any) => {
  const TempArr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 3, 12, 4232, 345, 2346, 3456, 4567,
    4567, 465, 23, 412, 345345, 67, 456723, 46, 36587, 4566, 45143, 63456, 84,
    56462, 4567, 4678, 456, 735, 835, 67,
  ];

  const CallGPTPopUp = async () => {
    setStage(4);
  };

  useEffect(() => {
    console.log(foodData);
  }, []);

  return (
    <>
      <div
        className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`}
      >
        <div className={`w-full px-4 bg-white`}>
          <Header title="" />
        </div>
        <div className={`w-full h-full grid grid-rows-[5fr_5fr]`}>
          <div
            className={`w-full h-full flex flex-col gap-4 items-center justify-center`}
          >
            <div className={`w-full flex items-end gap-4 justify-center`}>
              <span
                className={`text-6xl font-jeju`}
              >{`${foodData["식품명"]}`}</span>
              <span className={`text-xl font-neoEB`}>{`먹으면`}</span>
            </div>
            <div className={`w-full flex items-end gap-4 justify-center`}>
              <span
                className={`text-6xl font-jeju ${
                  foodData.score < 0 ? "text-water_blue" : "text-juicy_orange"
                }`}
              >{`${foodData.score}`}</span>
              <span className={`text-xl font-neoEB`}>{`점`}</span>
            </div>
            <button
              onClick={() => setStage(3)}
              className={`w-3/5 h-[3rem] font-neo bg-milky_white mt-6 rounded-full`}
            >{`왜 ${foodData.score}점 인가요?`}</button>
            <button
              onClick={CallGPTPopUp}
              className={`w-3/5 h-[3rem] font-neo bg-milky_white rounded-full`}
            >{`이 음식을 건강하게 먹는법??`}</button>
          </div>
          <div
            className={`bg-milky_white px-4 gap-4 grid grid-rows-[5rem_auto]`}
          >
            <div className={`w-full h-full flex items-end font-jeju`}>
              <span>이런 음식은 어떠세요?</span>
            </div>
            <div className={`flex overflow-scroll gap-2`}>
              {TempArr.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      className={`w-[10rem] h-[12rem] bg-white rounded-md shadow-lg`}
                    >
                      <button className={`w-[8rem]`}>{item}</button>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
