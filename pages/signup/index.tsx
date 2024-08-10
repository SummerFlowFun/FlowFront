import Header from "@/src/component/atom/Header/Header";
import Text from "@/src/component/atom/Text";
import { color } from "@/src/utils/color-map";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const signUpHandler = () => {
    if (!id) {
      alert("아이디를 입력해주세요");
    } else if (!password) {
      alert("비밀번호를 입력해주세요");
    } else if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다");
    } else {
      // 회원가입 로직
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
                  맘마미에 오신걸
                  <br /> 환영합니다!
                </Text>
              </div>
              <Text fontSize="body1Bold" className="font-neo text-sm">
                저희와 함께 하세요
              </Text>
            </div>
          </div>
          <section className="px-5 mt-[88px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Text className="pl-4 text-sm" color="">
                  아이디 입력
                </Text>
                <input
                  className="py-3 px-6 rounded-full outline-none"
                  placeholder="아이디"
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Text className="pl-4 text-sm" color="">
                  비밀번호 입력
                </Text>
                <input
                  className="py-3 px-6 rounded-full  outline-none"
                  placeholder="비밀번호"
                  type={isPasswordVisible ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Text className="pl-4 text-sm" color="">
                  비밀번호 확인
                </Text>
                <input
                  className="py-3 px-6 rounded-full  outline-none"
                  placeholder="비밀번호"
                  type={isPasswordVisible ? "text" : "password"}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
              </div>
            </div>
            <button
              className="py-3 bg-juicy_orange rounded-full w-full mt-12"
              onClick={signUpHandler}
            >
              <Text fontSize="body1Bold" color={color.milky_white}>
                회원가입
              </Text>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
