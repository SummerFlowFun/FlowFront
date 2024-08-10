import { MiniLoading } from "@/components/Loading/Loading";
import Text from "@/src/component/atom/Text";
import { color } from "@/src/utils/color-map";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("userId");
    if (isUserLoggedIn) {
      window.location.href = "/main";
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <main className={`w-screen h-screen grid place-items-center bg-black`}>
        <div
          className={`w-full max-w-[26.875rem] h-full bg-milky_white grid place-items-center`}
        >
          <MiniLoading />
        </div>
      </main>
    </>
  );
}
