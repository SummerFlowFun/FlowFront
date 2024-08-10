import Header from "@/src/component/atom/Header/Header";
import Text from "@/src/component/atom/Text";
import { color } from "@/src/utils/color-map";
import axios from "axios";
import { useEffect, useState } from "react";

const InfoPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [illnesses, setIllnesses] = useState<string[]>([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [isPragnent, setIsPragnent] = useState<boolean | null>(false);

  useEffect(() => {
    if (localStorage.getItem("userId") === null) {
      alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/login";
    }
  }, []);

  const submitHandler = async () => {
    if (year === "" || month === "" || day === "") {
      alert("날짜를 입력해주세요.");
      return;
    }

    if (illnesses.length === 0 && inputValue === "") {
      alert("질병을 선택 또는 입력해주세요.");
      return;
    }

    if (isPragnent === null) {
      alert("임신 여부를 선택해주세요.");
      return;
    }

    try {
      const res = await axios.post(
        `https://api.summerflow.fun/v1/user/information/${localStorage.getItem(
          "userId"
        )}`,
        {
          isPragnent: isPragnent,
          pragnentDate: `${year}-${month}-${day}`,
          illnesses:
            inputValue === "" ? illnesses : illnesses.concat(inputValue),
        }
      );
      if (res.status === 200) {
        alert("정보가 성공적으로 저장되었습니다.");
        window.location.href = "/main";
      }
    } catch (error) {
      alert("정보 저장에 실패하였습니다.");
      console.log(error);
    }
  };

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
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col gap-1">
                <Text className="pl-4 text-lg" color="">
                  임신중이신가요?
                </Text>

                <div className="flex mt-2 ml-4 flex-row gap-3">
                  <div
                    className={`flex flex-row rounded-full py-1 px-3 bg-white cursor-pointer ${
                      isPragnent ? "text-[#378FC1]" : ""
                    }`}
                    onClick={() => {
                      setIsPragnent(true);
                    }}
                  >
                    예
                  </div>
                  <div
                    className={`flex flex-row rounded-full py-1 px-3 bg-white cursor-pointer ${
                      !isPragnent ? "text-[#378FC1]" : ""
                    }`}
                    onClick={() => {
                      setIsPragnent(false);
                    }}
                  >
                    아니오
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-16">
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
                      illnesses.includes("빈혈") ? "text-[#378FC1]" : ""
                    }`}
                    onClick={() => {
                      if (illnesses.includes("빈혈")) {
                        setIllnesses(
                          illnesses.filter((item) => item !== "빈혈")
                        );
                        return;
                      } else {
                        setIllnesses([...illnesses, "빈혈"]);
                      }
                    }}
                  >
                    빈혈
                  </div>
                  <div
                    className={`flex flex-row rounded-full py-1 px-3 bg-white cursor-pointer ${
                      illnesses.includes("고혈압") ? "text-[#378FC1]" : ""
                    }`}
                    onClick={() => {
                      if (illnesses.includes("고혈압")) {
                        setIllnesses(
                          illnesses.filter((item) => item !== "고혈압")
                        );
                        return;
                      } else setIllnesses([...illnesses, "고혈압"]);
                    }}
                  >
                    고혈압
                  </div>
                  <div
                    className={`flex flex-row rounded-full py-1 px-3 bg-white cursor-pointer ${
                      illnesses.includes("당뇨") ? "text-[#378FC1]" : ""
                    }`}
                    onClick={() => {
                      if (illnesses.includes("당뇨")) {
                        setIllnesses(
                          illnesses.filter((item) => item !== "당뇨")
                        );
                        return;
                      } else setIllnesses([...illnesses, "당뇨"]);
                    }}
                  >
                    당뇨
                  </div>
                  <div
                    className={`flex flex-row rounded-full py-1 px-3 bg-white cursor-pointer ${
                      illnesses.includes("방광염") ? "text-[#378FC1]" : ""
                    }`}
                    onClick={() => {
                      if (illnesses.includes("방광염")) {
                        setIllnesses(
                          illnesses.filter((item) => item !== "방광염")
                        );
                        return;
                      } else setIllnesses([...illnesses, "방광염"]);
                    }}
                  >
                    방광염
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-16">
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
                      value={month}
                      onChange={(e) => {
                        if (Number(e.target.value) > 12) {
                          alert("월은 1~12 사이의 숫자만 입력해주세요.");
                          setMonth("");
                          return;
                        } else {
                          setMonth(e.target.value);
                        }
                      }}
                      className="py-2 px-6 rounded-full outline-none w-[72px]"
                      placeholder="MM"
                      maxLength={2}
                    />
                    월
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <input
                      value={day}
                      onChange={(e) => {
                        if (Number(e.target.value) > 31) {
                          alert("일은 1~31 사이의 숫자만 입력해주세요.");
                          setDay("");
                          return;
                        } else setDay(e.target.value);
                      }}
                      className="py-2 px-6 rounded-full outline-none w-[72px]"
                      placeholder="DD"
                      maxLength={2}
                    />
                    일
                  </div>
                </div>
              </div>
            </div>
            <button
              className="py-3 bg-juicy_orange rounded-full w-full mt-12"
              onClick={submitHandler}
            >
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
