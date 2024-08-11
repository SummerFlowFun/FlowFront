import Header from "@/src/component/atom/Header/Header";
import { useEffect, useState } from "react";
import { MiniLoading } from "../Loading/Loading";
import axios from "axios";
import { ApiBaseURL } from "../URL";

export const SearchLoading = ({
  foodName,
  foodArr,
  setFoodArr,
  setStage,
  lastEvaluatedKey,
  foodNumber,
  setFoodNumber,
}: any) => {
  const getFoodData = async () => {
    try {
      let Pagechecker = 0;
      while (true) {
        const FoodReq = await axios.get(
          `https://api.summerflow.fun/v1/foods?query=${foodName}&lastEvaluatedKey=${lastEvaluatedKey.current}`
        );
        const FoodTempArr = FoodReq.data.foodInfos;
        const FoodlastEvaluatedKey = FoodReq.data.lastEvaluatedKey.id;
        setFoodArr((prev: any) => [...prev, ...FoodTempArr]);
        setFoodNumber((prev: number) => (prev += FoodTempArr.length));
        lastEvaluatedKey.current = FoodlastEvaluatedKey;
        Pagechecker += FoodTempArr.length;
        if (Pagechecker >= 10) break;
        if (!FoodlastEvaluatedKey || FoodlastEvaluatedKey === "NONE") break;
      }
      setStage(5);
    } catch (e: any) {
      console.log(e);
      if (e.response?.status === 404) {
        alert("검색 결과가 없습니다.");
        setStage(0);
        return;
      }
    }
  };

  useEffect(() => {
    getFoodData();
  }, []);

  return (
    <>
      <div
        className={`w-full max-w-[26.875rem]  h-full grid grid-rows-[3rem_auto]`}
      >
        <div className={`w-full px-4 bg-white`}>
          <Header title="검색" />
        </div>
        <div
          className={`w-full h-full bg-milky_white flex flex-col items-center justify-center gap-10`}
        >
          <MiniLoading />
          <div className={`flex flex-col text-center justify-center`}>
            <span
              className={`font-jeju `}
            >{`맘마미는 10만개의 음식데이터중에서`}</span>

            <span
              className={`font-jeju `}
            >{` 원하는 음식 성분과 데이터를 찾아줘요!`}</span>
            <span
              className={`font-jeju `}
            >{`현재 ${foodNumber}개의 ${foodName}에 대한 정보를 찾고있어요...`}</span>
          </div>
        </div>
      </div>
    </>
  );
};
