import { Fragment, useEffect, useState } from "react";
import { getNutritionFromFoodData } from "../utils/Nutrition";

export const FoodPopup = ({ foodData, setFoodPopup }: any) => {
  const [NutriArr, setNutriArr] = useState<any>([]);

  const getPopUpData = () => {
    const NutriData = getNutritionFromFoodData(foodData);
    setNutriArr(NutriData);
  };

  useEffect(() => {
    getPopUpData();
  }, []);

  return (
    <>
      <div
        className={`fixed z-10 top-0 left-0 w-full h-full grid place-items-center animate-MoveUp`}
      >
        <div
          className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`}
        >
          <div
            className={`w-full h-[3rem] bg-milky_white grid grid-cols-[auto_3rem] place-items-center`}
          >
            <div></div>
            <button onClick={() => setFoodPopup(0)} className={`font-bold`}>
              X
            </button>
          </div>

          <div
            className={`bg-milky_white overflow-scroll flex flex-col gap-4 justify-center`}
          >
            <div className={`w-full h-[7rem] flex items-end justify-center`}>
              <span className={`font-jeju`}>식단 영양 분포</span>
            </div>
            <div
              className={`w-full h-full overflow-scroll  bg-milky_white flex flex-col rounded-lg items-center gap-2 justify-center`}
            >
              <div
                className={`w-4/5 h-[25rem] p-4 overflow-scroll text-water_blue rounded-lg flex flex-col bg-white`}
              >
                {NutriArr.map((item: any, index: number) => {
                  return (
                    <div key={index} className={`flex gap-2`}>
                      <span>{item.Name}</span>
                      <span>{`:`}</span>
                      <span>{item.Value}</span>
                    </div>
                  );
                })}
              </div>
              <div className={`text-xs flex flex-col text-center font-jeju`}>
                <span>해당 영양소를 참고해봤을떄 사용자님에겐</span>
                <span>{`${foodData.score}점이 적당해요!`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
