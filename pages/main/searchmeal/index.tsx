import ArrowIconV2 from "@/src/assets/icon/arrow-left-icon-v2";
import useDebounce from "@/src/hooks/useDebounce";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { MiniLoading } from "@/components/Loading/Loading";
import fallbackImage from "../../../public/FlowSmile.webp";

const SearchMealPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 0);
  const [data, setData] = useState<any>(null);

  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [foodArr, setFoodArr] = useState<any>([]);
  const [foodNumber, setFoodNumber] = useState<number>(0);

  const [isFind, setIsFind] = useState<boolean>(true);

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

  const searchHandler = async () => {
    if (!debounceSearch) return;
    setLoading(true);

    let apiChecker = 0;
    let allFoodInfos: any[] = [];
    let lastEvaluatedKey = "";

    try {
      while (true) {
        const res = await axios.get(
          `https://api.summerflow.fun/v1/foods?query=${debounceSearch}&lastEvaluatedKey=${lastEvaluatedKey}`
        );

        const FoodTempArr = res.data.foodInfos;
        const FoodlastEvaluatedKey = res.data.lastEvaluatedKey.id;
        setFoodArr((prev: any) => [...prev, ...FoodTempArr]);
        setFoodNumber((prev: any) => (prev += FoodTempArr.length));

        const foodInfos = res.data.foodInfos;
        lastEvaluatedKey = res.data.lastEvaluatedKey?.id;

        if (foodInfos && foodInfos.length > 0) {
          allFoodInfos = [...allFoodInfos, ...foodInfos];

          const imagesMap: { [key: string]: string } = {};
          await Promise.all(
            foodInfos.map(async (item: any) => {
              const imageUrl = await getProductImage(item.식품명);
              if (imageUrl) {
                imagesMap[item.식품명] = imageUrl;
              }
            })
          );

          setImages((prevImages) => ({ ...prevImages, ...imagesMap }));
        }

        if (!lastEvaluatedKey || apiChecker >= 10) break;

        apiChecker++;
      }

      setData({ foodInfos: allFoodInfos });
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setIsFind(false);
        setData([]);
      } else {
        setIsFind(false);
        console.error("Error fetching data:", error);
      }
      setIsFind(false);
      setLoading(false);
    }
  };

  const submitHandler = async (itemTitle: string, foodId: string) => {
    try {
      const res = await axios.post("https://api.summerflow.fun/v1/user/meal", {
        userId: localStorage.getItem("userId"),
        foodId: foodId,
        mealType: router.query.time,
        mealDate: new Date().toISOString().split("T")[0],
      });
      router.push({
        pathname: "/main",
        query: {
          ...router.query,
          food: itemTitle,
          foodId: foodId,
        },
      });
    } catch (error: any) {
      console.log("Error fetching image:", error);
      if (error.response.status === 409) {
        alert("이미 추가된 음식입니다.");
        return;
      } else {
        alert("음식 추가에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    if (!debounceSearch) {
      setData(null);
      return;
    }
  }, [debounceSearch]);

  useEffect(() => {
    localStorage.getItem("userId") || router.push("/login");
  }, []);

  return (
    <main className={`w-screen h-screen grid place-items-center`}>
      <div
        className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto] `}
      >
        <div className="flex flex-col px-4">
          <div className="p-4 cursor-pointer" onClick={() => router.back()}>
            <ArrowIconV2 />
          </div>
          <div className="font-jeju text-3xl flex justify-center">
            {router.query.time === "breakfast" && "아침"}
            {router.query.time === "lunch" && "점심"}
            {router.query.time === "dinner" && "저녁"}
          </div>
          <div className="flex flex-row justify-center mt-2">
            에 무엇을 드셨나요?
          </div>
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-3 px-4 rounded-full border outline-none w-full mt-4 border-black bg-milky_white"
              placeholder="음식을 입력해주세요"
            />
            <div
              className="absolute right-1 top-1/2 -translate-y-3 bg-white rounded-full p-2 cursor-pointer"
              onClick={searchHandler}
            >
              검색
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col items-center gap-5 mt-10">
              <MiniLoading />
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
                  >{`현재 ${foodNumber}개의 ${debounceSearch}에 대한 정보를 찾고있어요...`}</span>
                ) : (
                  <span
                    className={`font-jeju `}
                  >{`${foodNumber}개의 ${debounceSearch}에 대한 정보를 찾았어요...`}</span>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 mt-5 pb-10">
                {data?.foodInfos?.length > 0 && debounceSearch ? (
                  data?.foodInfos?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-row gap-2 items-end cursor-pointer"
                      onClick={() => submitHandler(item.식품명, item.id)}
                    >
                      <div className="w-[116px] h-[116px] relative">
                        <img
                          src={images[item.식품명] || fallbackImage.src}
                          alt={item.식품명}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = fallbackImage.src;
                          }}
                        />
                      </div>
                      <div className="flex w-auto flex-col gap-1 max-w-[230px]">
                        <span className="text-sm font-bold">{item.식품명}</span>
                        <span className="text-xs">{item.제조사명}</span>
                        <span className="text-xs">{item.식품소분류명}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center">
                    검색 결과가 없습니다.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchMealPage;
