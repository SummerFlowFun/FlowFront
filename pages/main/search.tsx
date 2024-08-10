import { SearchData } from "@/components/Search/SearchData";
import { SearchLoading } from "@/components/Search/SearchLoading";
import { SearchMain } from "@/components/Search/SearchMain";
import { SearchPopup } from "@/components/Search/SearchPopup";
import { useState } from "react";

// 임시 데이터

const SearchPage = () => {
  const [stage, setStage] = useState<number>(0);
  const [foodName, setFoodName] = useState<string>("");
  const [foodData, setFoodData] = useState<any>();

  return (
    <>
      <main className={`w-screen h-screen grid place-items-center`}>
        {stage === 0 && (
          <SearchMain
            foodName={foodName}
            setFoodName={setFoodName}
            setStage={setStage}
          />
        )}
        {stage === 1 && (
          <SearchLoading
            foodName={foodName}
            setStage={setStage}
            setFoodData={setFoodData}
          />
        )}
        {(stage === 2 || stage === 3) && (
          <SearchData setStage={setStage} foodData={foodData} />
        )}
        {stage === 3 && <SearchPopup setStage={setStage} />}
      </main>
    </>
  );
};

export default SearchPage;
