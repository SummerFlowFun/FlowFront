import Header from "@/src/component/atom/Header/Header";
import axios from "axios";
import { Fragment, useEffect } from "react";

export const SearchData = ({ foodArr, foodData, setStage }: any) => {
  const CallGPTPopUp = async () => {
    setStage(4);
  };

  const ImageMapping = () => {
    for (let i = 0; i < foodArr.length; i++) {
      foodArr.image = getProductImage(foodArr[i]["식품명"]);
    }
  };

  const getProductImage = async (query: any) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyC5IVsS0Y4UTlDgV7ReDvENrYtv_l2wpiI&cx=06ccd531cf7d3469d&q=${query}`
      );
      if (res.data.items) {
        return res.data.items[0].pagemap.cse_image[0].src;
      }
    } catch (error) {
      console.log("Error fetching image:", error);
    }
    return null;
  };

  useEffect(() => {
    ImageMapping();
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
              {foodArr.map((food: any, index: number) => {
                console.log(food);
                return (
                  <Fragment key={index}>
                    {food["식품소분류명"] === foodData["식품소분류명"] ? (
                      <div
                        className={`w-[10rem] h-[12rem] bg-white  rounded-md shadow-lg`}
                      >
                        <button
                          className={`w-full h-[11rem] text-black grid place-items-center`}
                        >
                          <img
                            src={food.image}
                            alt="food"
                            className={`w-[6rem] h-[6rem]`}
                          />
                        </button>
                        <span
                          className={`w-full font-jeju text-xs text-center`}
                        >
                          {food["식품명"]}
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
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
