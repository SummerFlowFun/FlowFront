import Header from "@/src/component/atom/Header/Header";
import useDebounce from "@/src/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";

// 임시 데이터
const goodFood = "소고기";
const badFood = "피자";

const SearchPage = () => {
  const [Name, setName] = useState("소고기");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const NameIndex = useRef(0);

  useEffect(() => {
    setInterval(() => {
      const NameArr = [
        "소고기",
        "피자",
        "치킨",
        "햄버거",
        "족발",
        "초밥",
        "라면",
      ];

      if (NameIndex.current >= 0) {
        setName(NameArr[NameIndex.current]);
        NameIndex.current += 1;
        if (NameIndex.current === NameArr.length) NameIndex.current = 0;
      }
    }, 500);
  }, []);

  const handleName = (e: any) => {
    const Value = e.target.value;

    setSearchQuery(Value);
    if (Value === "") NameIndex.current = 0;
    else NameIndex.current = -1;
  };

  return (
    <>
      <main className={`w-screen h-screen grid place-items-center`}>
        <div
          className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`}
        >
          <div className={`w-full px-4 bg-white`}>
            <Header title="검색" />
          </div>
          <div
            className={`w-full bg-milky_white flex flex-col items-center justify-center gap-2`}
          >
            <span className={`font-jeju text-8xl`}>나는</span>
            <input
              type="text"
              onChange={handleName}
              value={searchQuery}
              placeholder={Name}
              className={`w-3/4 h-10 my-6 h-[4rem] placeholder:text-gray1 text-4xl placeholder:text-4xl text-water_blue rounded-full focus:outline-none text-center font-jeju text-2xl`}
            />
            <span className={`font-jeju text-8xl`}>먹고</span>
            <span className={`font-jeju text-8xl`}>싶다</span>{" "}
            {debouncedSearchQuery === goodFood && (
              <div className="flex flex-col gap-4 items-center">
                <span className={`font-jeju text-4xl mt-10 text-[#3B7DA5]`}>
                  +70점!
                </span>

                <span
                  className={`font-jeju text-xl text-gray-400 underline cursor-pointer`}
                >
                  왜?
                </span>
              </div>
            )}
            {debouncedSearchQuery === badFood && (
              <div className="flex flex-col gap-4 items-center">
                <span className={`font-jeju text-4xl mt-10 text-[#E56A40]`}>
                  -70점!
                </span>

                <span
                  className={`font-jeju text-xl text-gray-400 underline cursor-pointer`}
                  onClick={() => alert("왜?")}
                >
                  왜?
                </span>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchPage;
