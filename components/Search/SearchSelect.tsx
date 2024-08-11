import Header from "@/src/component/atom/Header/Header";
import { MiniLoading, SmallMiniLoading } from "../Loading/Loading";
import axios from "axios";
import { ApiBaseURL } from "../URL";
import { useEffect, useState } from "react";

export const SearchSelect = ({
  setStage,
  foodName,
  foodArr,
  setFoodArr,
  setFoodData,
  lastEvaluatedKey,
  foodNumber,
  setFoodNumber,
}: any) => {
  const [isFind, setIsFind] = useState<boolean>(true);

  const handleSelect = async (food: any) => {
    const TempData = food;
    const UserId = localStorage.getItem("userId");

    const ScoreReq = await axios.get(
      `https://api.summerflow.fun/v1/foods/daily-score-diff?userId=${UserId}&foodId=${
        TempData["id"]
      }&mealDate=${"2024-08-11"}`
    );

    const ScoreData = ScoreReq.data.score_diff;
    TempData.score = ScoreData;
    setFoodData(food);
    setStage(2);
  };

  const getFoodData = async () => {
    while (true) {
      try {
        const FoodReq = await axios.get(
          `https://api.summerflow.fun/v1/foods?query=${foodName}&lastEvaluatedKey=${lastEvaluatedKey.current}`
        );
        const FoodTempArr = FoodReq.data.foodInfos;
        const FoodlastEvaluatedKey = FoodReq.data.lastEvaluatedKey.id;
        setFoodArr((prev: any) => [...prev, ...FoodTempArr]);
        setFoodNumber((prev: any) => (prev += FoodTempArr.length));
        lastEvaluatedKey.current = FoodlastEvaluatedKey;
        if (!FoodlastEvaluatedKey || FoodlastEvaluatedKey === "NONE") break;
      } catch (e: any) {
        console.log(e.message);
        if (e.message.includes("id")) {
          setIsFind(false);
          break;
        }
        if (e.response.status === 404) {
          alert("검색 결과가 없습니다.");
          setIsFind(false);
          break;
        } else {
          continue;
        }
      }
    }
  };

  useEffect(() => {
    getFoodData();
  }, []);

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
        <div
          className={`w-full h-[10rem] bg-milky_white flex flex-col items-center justify-center gap-2`}
        >
          {isFind && <SmallMiniLoading />}
          <div className={`flex flex-col text-center justify-center`}>
            <span
              className={`font-jeju `}
            >{`맘마미는 10만개의 음식데이터중에서 원하는 음식`}</span>

            <span
              className={`font-jeju `}
            >{`성분과 데이터를 최소 100개 이상 찾아줘요!`}</span>
            {isFind ? (
              <span
                className={`font-jeju `}
              >{`현재 ${foodNumber}개의 ${foodName}에 대한 정보를 찾고있어요...`}</span>
            ) : (
              <span
                className={`font-jeju `}
              >{`${foodNumber}개의 ${foodName}에 대한 정보를 찾았어요...`}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
