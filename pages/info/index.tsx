import Header from "@/src/component/atom/Header/Header";
import Text from "@/src/component/atom/Text";
import { color } from "@/src/utils/color-map";
import { useState } from "react";

const InfoPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [year, setYear] = useState("");
  return (
    <div className={`w-screen h-screen grid place-items-center `}>
      <div className={`w-full max-w-[26.875rem] h-full bg-white`}>
        <Header title="정보입력" />
        <div className="bg-milky_white h-full">
          <div className="pt-[80px] px-10">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-end ">
                <Text fontSize="bigTitle" className="font-jeju text-3xl">
                  몇가지 여쭤볼게요~
                </Text>
              </div>
            </div>
          </div>
          <section className="px-5 mt-[88px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Text className="pl-4 text-lg" color="">
                  갖고 계신 질병이 있으신가요?
                </Text>
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="py-3 px-6 rounded-full outline-none"
                  placeholder="모두 알려주세요"
                />
                <div className="flex mt-2 ml-4 flex-row gap-3">
                  <div
                    className={`flex flex-row rounded-full py-1 px-3 bg-white cursor-pointer ${
                      inputValue === "빈혈" ? "text-[#378FC1]" : ""
                    }`}
                    onClick={() => {
                      setInputValue("빈혈");
                    }}
                  >
                    빈혈
                  </div>
                  <div
                    className={`flex flex-row rounded-full py-1 px-3 bg-white cursor-pointer ${
                      inputValue === "고혈압" ? "text-[#378FC1]" : ""
                    }`}
                    onClick={() => {
                      setInputValue("고혈압");
                    }}
                  >
                    고혈압
                  </div>
                  <div
                    className={`flex flex-row rounded-full py-1 px-3 bg-white cursor-pointer ${
                      inputValue === "당뇨" ? "text-[#378FC1]" : ""
                    }`}
                    onClick={() => {
                      setInputValue("당뇨");
                    }}
                  >
                    당뇨
                  </div>
                  <div
                    className={`flex flex-row rounded-full py-1 px-3 bg-white cursor-pointer ${
                      inputValue === "방광염" ? "text-[#378FC1]" : ""
                    }`}
                    onClick={() => {
                      setInputValue("방광염");
                    }}
                  >
                    방광염
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-20">
              <div className="flex flex-col gap-1">
                <Text className="pl-4 text-lg" color="">
                  임신한 날짜가 언제인가요?
                </Text>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row gap-3 items-center">
                    <input
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="py-2 px-6 rounded-full outline-none w-[96px]"
                      placeholder="YYYY"
                      maxLength={4}
                    />
                    년
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <input
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="py-2 px-6 rounded-full outline-none w-[72px]"
                      placeholder="MM"
                      maxLength={2}
                    />
                    월
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <input
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="py-2 px-6 rounded-full outline-none w-[72px]"
                      placeholder="DD"
                      maxLength={2}
                    />
                    일
                  </div>
                </div>
              </div>
            </div>
            <button className="py-3 bg-juicy_orange rounded-full w-full mt-12">
              <Text fontSize="body1Bold" color={color.milky_white}>
                완료
              </Text>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
