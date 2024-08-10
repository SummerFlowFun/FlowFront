import Header from "@/src/component/atom/Header/Header";
import { useEffect, useState } from "react";
import {
  Face0,
  Face100,
  Face25,
  Face50,
  Face75,
  WhiteBar,
} from "../../components/main/mainSVG";
import { getColor } from "../../components/main/colorManage";
import { useRouter } from "next/router";

const MainPage = () => {
  const [pregnantPeriod, setPregnantPeriod] = useState<number>(0);
  const [UserScore, setUserScore] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<string>("#8CA4EE");
  const [animateNumber, setAnimateNumber] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    setBackgroundColor(getColor(UserScore));
    setAnimateNumber(Math.floor(UserScore / 20) - 1);
  }, [UserScore]);

  return (
    <>
      <main className={`w-screen h-screen grid place-items-center`}>
        <div
          className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`}
          style={{ backgroundColor: backgroundColor }}
        >
          <div className={`w-full font-jeju`}>
            <Header title={`임신 ${pregnantPeriod}주차`} />
          </div>
          <div
            className={`w-full h-full pt-4 relative grid grid-rows-[6fr_1.4fr_2.6fr] `}
          >
            <div className={`grid place-items-center relative overflow-hidden`}>
              <WhiteBar WhiteSpace={Math.abs(UserScore / 100 - 1)} />
              <div
                className={`absolute bottom-0 -right-20 animate-FadeIn   ${
                  UserScore < 20
                    ? "animate-MoveIn"
                    : animateNumber === 0 && "animate-MoveOut"
                }`}
              >
                <Face0 />
              </div>
              <div
                className={`absolute bottom-0 -right-20 animate-FadeIn  ${
                  UserScore >= 20 && UserScore < 40
                    ? "animate-MoveIn"
                    : animateNumber === 1 && "animate-MoveOut"
                }`}
              >
                <Face25 />
              </div>
              <div
                className={`absolute bottom-0 -right-20 animate-FadeIn  ${
                  UserScore >= 40 && UserScore < 60
                    ? "animate-MoveIn"
                    : animateNumber === 2 && "animate-MoveOut"
                }`}
              >
                <Face50 />
              </div>
              <div
                className={`absolute bottom-0 -right-20 animate-FadeIn  ${
                  UserScore >= 60 && UserScore < 80
                    ? "animate-MoveIn"
                    : animateNumber === 3 && "animate-MoveOut"
                }`}
              >
                <Face75 />
              </div>
              <div
                className={`absolute bottom-0 -right-20 animate-FadeIn  ${
                  UserScore >= 80 && UserScore < 100
                    ? "animate-MoveIn"
                    : animateNumber === 4 && "animate-MoveOut"
                }`}
              >
                <Face100 />
              </div>
            </div>
            <div className={`w-full h-full flex flex-col  justify-evenly`}>
              <div className={`w-full grid place-items-center`}>
                <span
                  className={` w-full text-center text-white font-jeju text-xl`}
                >
                  오늘의 필수 영양소
                </span>
              </div>
              <div
                className={`grid grid-cols-3 gap-2 mx-2 items-center justify-evenly`}
              >
                <div
                  className={`bg-white text-center py-2 flex items-center justify-center rounded-full`}
                >
                  <span className={`font-neoB`}>지방</span>
                </div>
                <div
                  className={`bg-white text-center py-2 flex items-center justify-center rounded-full`}
                >
                  <span className={`font-neoB`}>탄수화물</span>
                </div>
                <div
                  className={`bg-white text-center py-2 flex items-center justify-center rounded-full`}
                >
                  <span className={`font-neoB`}>영양소</span>
                </div>
              </div>
            </div>
            <div
              className={`bg-white w-full h-full flex flex-col items-center gap-2`}
            >
              <span className={`font-jeju`}>오늘 어떤 걸 드셨나요?</span>
              <div
                className={`rounded-full font-neoB w-4/5 items-center justify-between  h-[3rem] flex gap-4`}
              >
                <button
                  className={`bg-milky_white py-2 px-8 rounded-full shadow-lg`}
                >
                  아침
                </button>
                <button
                  className={`bg-milky_white py-2 px-8 rounded-full shadow-lg`}
                >
                  점심
                </button>
                <button
                  className={`bg-milky_white py-2 px-8 rounded-full shadow-lg`}
                >
                  저녁
                </button>
              </div>
              <div
                className={`w-4/5 h-[3rem] grid grid-cols-[8fr_2fr] place-items-center gap-2`}
              >
                <button
                  className={`bg-milky_white shadow-lg rounded-full w-full h-full`}
                  onClick={() => router.push("/main/search")}
                >
                  나 이거 먹어도 돼??
                </button>
                <button
                  className={`shadow-lg relative w-[3rem] h-[3rem] rounded-full relative`}
                  style={{ backgroundColor: backgroundColor }}
                >
                  <div
                    className={`absolute w-[1.2rem] h-[1.2rem] rounded-full shadow-lg bg-white top-4 right-1`}
                  />
                  <div
                    className={`absolute w-[1.2rem] h-[1.2rem] rounded-full shadow-lg bg-white top-4 right-4`}
                  />
                  <div
                    className={`absolute w-[0.5rem] h-[0.5rem] rounded-full shadow-lg bg-black top-[1.3rem] right-1 animate-MovingAround`}
                  />
                  <div
                    className={`absolute w-[0.5rem] h-[0.5rem] rounded-full shadow-lg bg-black top-[1.3rem] right-4 animate-MovingAround`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
