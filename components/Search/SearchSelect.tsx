import Header from "@/src/component/atom/Header/Header";
import { MiniLoading } from "../Loading/Loading";
import axios from "axios";
import { ApiBaseURL } from "../URL";

export const SearchSelect = ({ setStage, foodArr, setFoodData }: any) => {
  const handleSelect = async (food: any) => {
    const TempData = food;
    const UserId = localStorage.getItem("userId");

    const ScoreReq = await axios.get(
      `https://api.summerflow.fun/v1/foods/daily-score-diff?userId=${UserId}&foodId=${
        TempData["id"]
      }&mealDate=${"2024-08-11"}`
    );

    const ScoreData = ScoreReq.data;
    console.log(ScoreData);
    const Score = -30;
    TempData.score = Score;
    setFoodData(food);
    setStage(2);
  };
  return (
    <>
      <div
        className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`}
      >
        <div className={`w-full px-4 bg-milkty_white`}>
          <Header title="검색" />
        </div>
        <div
          className={`flex flex-col w-full  items-center py-6 bg-milky_white h-full gap-4`}
        >
          {foodArr.map((food: any, index: number) => {
            return (
              <button
                onClick={() => handleSelect(food)}
                key={index}
                className={`h-[3rem] w-4/5 bg-white rounded-lg flex flex-col shadow-lg p-2 hover:-translate-y-1 hover:-translate-x-1`}
              >
                <span className={`font-jeju`}>{food["식품명"]}</span>
                <span className={`font-neo text-xs text-gray1`}>
                  {food["제조사명"]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
