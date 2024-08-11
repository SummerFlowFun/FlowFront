import axios from "axios";
import { useEffect, useState } from "react";
import { MiniLoading } from "../Loading/Loading";
import TextWithLineBreaks from "../utils/TextBreakLine";
export const FoodGPTPopup = ({ foodData, closePopup }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [GPTMessage, setGPTMessage] = useState<string>("");
  const getGPTAnswer = async () => {
    const req = await axios.post("/api/gptGenerate", {
      foodName: foodData.name,
    });

    const message = req.data.answer;
    setGPTMessage(message);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getGPTAnswer();
  }, []);

  return (
    <>
      <div
        className={`fixed z-10 top-0 left-0 w-full h-full grid place-items-center animate-MoveUp`}
      >
        <div
          className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`}
        >
          <div
            className={`w-full h-[3rem] bg-milky_white grid grid-cols-[auto_3rem] place-items-center`}
          >
            <div></div>
            <button onClick={() => closePopup(false)} className={`font-bold`}>
              X
            </button>
          </div>

          {isLoading ? (
            <>
              <div
                className={`w-full h-full flex flex-col gap-4 items-center justify-center bg-milky_white`}
              >
                <MiniLoading />
                <span className={`font-jeju`}>
                  FLOW AI가 대답을 생성하는 중이에요.
                </span>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div
                className={`bg-milky_white overflow-scroll flex flex-col gap-4 justify-center`}
              >
                <div
                  className={`w-full h-[7rem] flex items-end justify-center`}
                >
                  <span className={`font-jeju`}>음식을 더 안전하게!</span>
                </div>
                <div
                  className={`w-full h-full overflow-scroll  bg-milky_white flex rounded-lg justify-center`}
                >
                  <div
                    className={`w-4/5 h-[25rem] font-neo p-4 overflow-scroll text-water_blue rounded-lg flex flex-col bg-white`}
                  >
                    <TextWithLineBreaks text={GPTMessage} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
