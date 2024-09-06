import Header from "@/src/component/atom/Header/Header";
import Text from "@/src/component/atom/Text";
import { color } from "@/src/utils/color-map";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loginHandler = async () => {
    try {
      localStorage.setItem("userId", "SUMMERFLOW");
      router.push("/main");
    } catch (error: any) {
      if (error.response.status === 403) {
        alert("비밀번호가 일치하지 않습니다");
      } else {
        alert("로그인에 실패했습니다");
      }
    }
  };

  return (
    <div className={`w-screen h-screen grid place-items-center `}>
      <div className={`w-full max-w-[26.875rem] h-full bg-white`}>
        <Header title="" />
        <div className="bg-milky_white h-full">
          <div className="pt-[80px] px-10">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-end ">
                <Text fontSize="bigTitle" className="font-jeju text-3xl">
                  맘마미를 시작합니다
                </Text>
              </div>
              <Text fontSize="body1Bold" className="font-neo text-sm">
                저희와 함께 하세요
              </Text>
            </div>
          </div>
          <section className="px-5 mt-[88px]">
            <div className="flex flex-col gap-3">
              <input value={id} className="py-3 px-6 rounded-full outline-none" placeholder="아이디" onChange={(e) => setId(e.target.value)} />
              <input
                value={password}
                className="py-3 px-6 rounded-full  outline-none"
                placeholder="비밀번호"
                type={isPasswordVisible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex flex-row gap-1 ml-8">
                <input type="checkbox" className="" onChange={(e) => setIsPasswordVisible(e.target.checked)} checked={isPasswordVisible} />
                <Text
                  fontSize="caption"
                  color={"#777777"}
                  className="cursor-pointer"
                  onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                >
                  비밀번호 보기
                </Text>
              </div>
            </div>
          </section>
          <div className="mt-12 mx-5 flex flex-col gap-3">
            <button className="py-3 bg-juicy_orange rounded-full w-full " onClick={loginHandler}>
              <Text fontSize="body1Bold" color={color.milky_white}>
                로그인
              </Text>
            </button>
            <div className="flex flex-row justify-between items-center px-6">
              <div className="flex flex-row items-center gap-5">
                <Text fontSize="caption" color={"#777777"} className="cursor-pointer">
                  아이디 찾기
                </Text>
                <Text fontSize="caption" color={"#777777"} className="cursor-pointer">
                  비밀번호 찾기
                </Text>
              </div>
              <Text fontSize="caption" color={"#777777"} className="cursor-pointer" onClick={() => router.push("/signup")}>
                회원가입
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
