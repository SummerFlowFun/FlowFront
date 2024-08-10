import Head from "next/head";
import Image from "next/image";
import ARROW_LEFT_ICON from "../../src/assets/icon/arrow-left-icon.svg";
import CLOSE_ICON from "../../src/assets/icon/close-icon.svg";
import { useRouter } from "next/router";

const SearchPage = () => {
  const router = useRouter();

  return (
    <>
      <main className={`w-screen h-screen grid place-items-center bg-black`}>
        <div
          className={`w-full max-w-[26.875rem] h-full bg-milky_white flex flex-col items-center justify-center gap-2`}
        >
          <span className={`font-jeju text-4xl`}>나는 </span>
          <input
            type="text"
            className={`w-3/4 h-10 border-2 border-black rounded-full`}
          />
          <span className={`font-jeju text-4xl`}>먹고</span>
          <span className={`font-jeju text-4xl`}>싶다</span>
        </div>
      </main>
    </>
  );
};

export default SearchPage;
