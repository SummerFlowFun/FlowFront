import Header from "@/src/component/atom/Header/Header";
import { useState } from "react";

const MainPage = () => {
  const [pregnantPeriod, setPregnantPeriod] = useState<number>(0);
  return (
    <>
      <main className={`w-screen h-screen grid place-items-center`}>
        <div
          className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`}
        >
          <div className={`w-full bg-white font-jeju`}>
            <Header title={`임신 ${pregnantPeriod}주차`} />
          </div>
          <div className={`w-full h-full`}></div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
