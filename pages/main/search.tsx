import { useEffect, useRef, useState } from "react";
import Header from "@/src/component/atom/Header/Header";
import { WhiteBar } from "./svg";

const SearchPage = () => {
  const [Name, setName] = useState("소고기");
  const NameIndex = useRef(0);
  //1.5초

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
    console.log(Value);
    if (Value === "") NameIndex.current = 0;
    else NameIndex.current = -1;
  };

  return (
    <>
      <main className={`w-screen h-screen grid place-items-center`}>
        <div
          className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`}
        >
          <div className={`w-full bg-white`}>
            <Header title="검색" />
          </div>
          <div
            className={`w-full bg-milky_white flex flex-col items-center justify-center gap-2`}
          >
            <span className={`font-jeju text-8xl`}>나는</span>
            <input
              type="text"
              onChange={handleName}
              placeholder={Name}
              className={`w-3/4 h-10 my-6 h-[4rem] placeholder:text-gray1 text-4xl placeholder:text-4xl text-water_blue rounded-full focus:outline-none text-center font-jeju text-2xl`}
            />
            <span className={`font-jeju text-8xl`}>먹고</span>
            <span className={`font-jeju text-8xl`}>싶다</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchPage;
