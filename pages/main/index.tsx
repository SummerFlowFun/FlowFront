import { ApiBaseURL } from "@/components/URL";
import { PregnantWeekCalculator } from "@/components/utils/Pregnant";
import Header from "@/src/component/atom/Header/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getColor } from "../../components/main/colorManage";
import { Face0, Face100, Face25, Face50, Face75, WhiteBar } from "../../components/main/mainSVG";

const MainPage = () => {
  const [pregnantPeriod, setPregnantPeriod] = useState<number>(0);
  const [UserScore, setUserScore] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<string>("#8CA4EE");
  const [animateNumber, setAnimateNumber] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [foodId, setFoodId] = useState<string>("");
  const [food, setFood] = useState<string>("");
  const [mealData, setMealData] = useState<any>(null);

  const router = useRouter();

  const getUserData = async () => {
    try {
      const pregnantWeek = 1;
      setPregnantPeriod(pregnantWeek);

      setUserScore(0);
      setBackgroundColor(getColor(0));
      setAnimateNumber(Math.floor(0 / 20) - 1);
    } catch (e: any) {
      alert(e.message);
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userId") === null) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (router.query.food) {
      setFood(router.query.food as string);
      setShowModal(true);
    }
  }, [router.query.food]);

  const closeModalHandler = () => {
    setShowModal(false);
    router.replace("/main");
  };

  useEffect(() => {
    // try {
    //   const fetchData = async () => {
    //     const params = {
    //       mealDate: new Date().toISOString().split("T")[0],
    //     };
    //     const res = await axios.get(`${ApiBaseURL}/user/daily-info/${localStorage.getItem("userId")}`, {
    //       params,
    //     });
    //     setMealData(res.data);
    //   };
    //   if (localStorage.getItem("userId")) {
    //     fetchData();
    //   }
    // } catch (error) {
    //   console.log("Error fetching mealData:", error);
    // }
  }, []);

  return (
    <>
      <main className={`w-screen h-screen grid place-items-center`}>
        <div className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`} style={{ backgroundColor: backgroundColor }}>
          <div className={`w-full font-jeju`}>
            <Header title={`임신 ${pregnantPeriod}주차`} />
          </div>
          <div className={`w-full h-full pt-4 relative grid grid-rows-[6fr_1.4fr_2.6fr] `}>
            <div className={`grid place-items-center relative overflow-hidden`}>
              <WhiteBar WhiteSpace={Math.abs(UserScore / 100 - 1)} />
              <div className={`absolute bottom-0 -right-20 animate-FadeIn   ${UserScore < 20 ? "animate-MoveIn" : animateNumber === 0 && "animate-MoveOut"}`}>
                <Face0 />
              </div>
              <div className={`absolute bottom-0 -right-20 animate-FadeIn  ${UserScore >= 20 && UserScore < 40 ? "animate-MoveIn" : animateNumber === 1 && "animate-MoveOut"}`}>
                <Face25 />
              </div>
              <div className={`absolute bottom-0 -right-20 animate-FadeIn  ${UserScore >= 40 && UserScore < 60 ? "animate-MoveIn" : animateNumber === 2 && "animate-MoveOut"}`}>
                <Face50 />
              </div>
              <div className={`absolute bottom-0 -right-20 animate-FadeIn  ${UserScore >= 60 && UserScore < 80 ? "animate-MoveIn" : animateNumber === 3 && "animate-MoveOut"}`}>
                <Face75 />
              </div>
              <div className={`absolute bottom-0 -right-20 animate-FadeIn  ${UserScore >= 80 && UserScore < 100 ? "animate-MoveIn" : animateNumber === 4 && "animate-MoveOut"}`}>
                <Face100 />
              </div>
            </div>
            <div className={`w-full h-full flex flex-col  justify-evenly`}>
              <div className={`w-full grid place-items-center`}>
                <span className={` w-full text-center text-white font-jeju text-xl`}>오늘의 필수 영양소</span>
              </div>
              <div className={`grid grid-cols-3 gap-2 mx-2 items-center justify-evenly`}>
                <div className={`bg-white text-center py-2 flex items-center justify-center rounded-full`}>
                  <span className={`font-neoB`}>지방</span>
                </div>
                <div className={`bg-white text-center py-2 flex items-center justify-center rounded-full`}>
                  <span className={`font-neoB`}>탄수화물</span>
                </div>
                <div className={`bg-white text-center py-2 flex items-center justify-center rounded-full`}>
                  <span className={`font-neoB`}>단백질</span>
                </div>
              </div>
            </div>
            <div className={`bg-white w-full h-full flex flex-col items-center gap-2`}>
              <span className={`font-jeju`}>오늘 어떤 걸 드셨나요?</span>
              <div className={`rounded-full font-neoB w-4/5 items-center justify-between  h-[3rem] flex gap-4`}>
                <button className={`bg-milky_white py-2 px-8 rounded-full shadow-lg`} onClick={() => router.push("/main/searchmeal?time=breakfast")}>
                  아침
                </button>
                <button className={`bg-milky_white py-2 px-8 rounded-full shadow-lg`} onClick={() => router.push("/main/searchmeal?time=lunch")}>
                  점심
                </button>
                <button className={`bg-milky_white py-2 px-8 rounded-full shadow-lg`} onClick={() => router.push("/main/searchmeal?time=dinner")}>
                  저녁
                </button>
              </div>
              <div className={`w-4/5 h-[3rem] grid grid-cols-[8fr_2fr] place-items-center gap-2`}>
                <button className={`bg-milky_white shadow-lg rounded-full w-full h-full`} onClick={() => router.push("/main/search")}>
                  나 이거 먹어도 돼??
                </button>

                <button
                  className={`shadow-lg relative w-[3rem] h-[3rem] rounded-full relative`}
                  style={{ backgroundColor: backgroundColor }}
                  onClick={() => router.push("/main/detect")}
                >
                  <div className={`absolute w-[1.2rem] h-[1.2rem] rounded-full shadow-lg bg-white top-4 right-1`} />
                  <div className={`absolute w-[1.2rem] h-[1.2rem] rounded-full shadow-lg bg-white top-4 right-4`} />
                  <div className={`absolute w-[0.5rem] h-[0.5rem] rounded-full shadow-lg bg-black top-[1.3rem] right-1 animate-MovingAround`} />
                  <div className={`absolute w-[0.5rem] h-[0.5rem] rounded-full shadow-lg bg-black top-[1.3rem] right-4 animate-MovingAround`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {showModal && (
        <div
          className="
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-lg w-80 h-fit z-50 
        "
        >
          <span className="font-jeju text-2xl ">나의 점수</span>
          <div className="mt-4">
            <span className="font-jeju text-5xl text-juicy_orange ">{mealData && mealData?.score ? mealData?.score : 0}</span>
            <span className="font-jeju">점</span>
          </div>
          <div className="h-[1px] bg-[#8E8E8E] my-10" />
          <span className="font-jeju text-lg ">오늘의 나의 식단</span>
          <div className="flex flex-col gap-1 mt-4 ">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-5 jb">
                <span className="font-bold w-[60px]">단백질</span>
              </div>
              <span>{mealData?.nutritions.단백질 * 2}mg</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-5 jb">
                <span className="font-bold w-[60px]">지방</span>
              </div>
              <span>{mealData?.nutritions.지방 * 2}mg</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-5 jb">
                <span className="font-bold w-[60px]">탄수화물</span>
              </div>
              <span>{mealData?.nutritions.탄수화물 * 2}mg</span>
            </div>
          </div>
          <div className="flex flex-row w-full justify-between mt-10">
            <button className="bg-juicy_orange text-white w-full rounded-full py-2 px-4" onClick={closeModalHandler}>
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
