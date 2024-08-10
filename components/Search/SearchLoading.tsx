import Header from "@/src/component/atom/Header/Header";
import { useEffect } from "react";
import { MiniLoading } from "../Loading/Loading";

export const SearchLoading = ({ foodName, setStage, setFoodData }: any) => {
  const getFoodData = () => {
    alert(foodName);
    setFoodData({ name: foodName, score: 30 });
    setTimeout(() => {
      setStage(2);
    }, 2000);
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
