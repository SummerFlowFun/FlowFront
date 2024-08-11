import Header from "@/src/component/atom/Header/Header";
import { useEffect } from "react";
import { MiniLoading } from "../Loading/Loading";
import axios from "axios";
import { ApiBaseURL } from "../URL";

export const SearchLoading = ({ foodName, setFoodArr, setStage }: any) => {
  const getFoodData = async () => {
    try {
      const FoodReq = await axios.get(
        `https://api.summerflow.fun/v1/foods?query=${foodName}`
      );
      console.log(FoodReq.data);
      setFoodArr(FoodReq.data);
      setStage(5);
    } catch (e: any) {
      if (e.response.status === 404) {
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
          <span className={`font-jeju `}>음식에 대한 정보를 찾고있어요...</span>
        </div>
      </div>
    </>
  );
};
