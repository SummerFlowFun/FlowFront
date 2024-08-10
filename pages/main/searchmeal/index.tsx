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
  const debounceSearch = useDebounce(search, 250);
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
    try {
      const res = await axios.get(
        `https://api.summerflow.fun/v1/foods?query=${debounceSearch}`
      );
      setData(res.data);

      // Fetch images for each item
      const imagesMap: { [key: string]: string } = {};
      await Promise.all(
        res.data.map(async (item: any) => {
          const imageUrl = await getProductImage(item.식품명);
          if (imageUrl) {
            imagesMap[item.식품명] = imageUrl;
          }
        })
      );
      setImages(imagesMap);
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setData([]);
        setLoading(false);
      }
      setLoading(false);
      console.log(error);
    }
  };

  const submitHandler = (itemTitle: string) => {
    router.push({
      pathname: "/main",
      query: {
        ...router.query,
        food: itemTitle,
      },
    });
  };

  useEffect(() => {
    if (!debounceSearch) {
      setData(null);
      return;
    }
  }, [debounceSearch]);

  if (loading) {
    return <MiniLoading />;
  }

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
            <MiniLoading />
          ) : (
            <>
              <div className="flex flex-col gap-4 mt-5 pb-10">
                {data?.length > 0 && debounceSearch ? (
                  data?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-row gap-2 items-end cursor-pointer"
                      onClick={() => submitHandler(item.식품명)}
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
