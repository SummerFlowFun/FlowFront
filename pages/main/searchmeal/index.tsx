import ArrowIconV2 from "@/src/assets/icon/arrow-left-icon-v2";
import useDebounce from "@/src/hooks/useDebounce";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchMealPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/customsearch/v1?key=AIzaSyC5IVsS0Y4UTlDgV7ReDvENrYtv_l2wpiI&cx=06ccd531cf7d3469d&q==${debounceSearch}`
        );

        if (debounceSearch === "") return;
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [debounceSearch]);

  return (
    <main className={`w-screen h-screen grid place-items-center`}>
      <div
        className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto] `}
      >
        <div className="flex flex-col">
          <div className="p-4 cursor-pointer" onClick={() => router.back()}>
            <ArrowIconV2 />
          </div>
          <div className="font-jeju text-3xl flex justify-center">
            {router.query.time === "breakfast" && "아침"}
            {router.query.time === "lunch" && "점심"}
            {router.query.time === "dinner" && "저녁"}
          </div>
          <div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-3 px-4 rounded-full border outline-none w-full mt-4 border-black bg-milky_white"
              placeholder="음식을 입력해주세요"
            />
          </div>
          <div className="flex flex-col gap-4 mt-5">
            {data?.items?.map((item: any, index: number) => (
              <div key={index} className="flex flex-row  gap-2 items-end">
                <div className="w-[116px] h-[116px] relative">
                  <img
                    src={
                      item.pagemap?.cse_thumbnail
                        ? item.pagemap.cse_thumbnail[0]?.src
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    }
                    alt={""}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex w-auto flex-col gap-1 max-w-[230px]">
                  <span className="text-sm font-bold">{item.title}</span>
                  <span className="text-xs">{item.snippet}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchMealPage;
