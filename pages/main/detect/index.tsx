import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

import { CloseIconV2 } from "@/src/assets/icon/close-icon-v2";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import translate from "translate";
type Prediction = {
  bbox: [number, number, number, number];
  class: string;
  score: number;
};
const DetectPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [translatedPredictions, setTranslatedPredictions] = useState<string[]>(
    []
  );

  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL?.createObjectURL(file);
      setImage(imageUrl);
    }

    const imageUrl = URL?.createObjectURL(files[0]);

    const imgElement = new Image();
    imgElement.src = imageUrl;
    imgElement.onload = async () => {
      if (imageRef.current) {
        imageRef.current = imgElement;
      }

      const model = await cocoSsd.load();
      const predictions = await model.detect(imgElement);

      setPredictions(predictions);

      const translatedClasses = await Promise.all(
        predictions.map(async (prediction) => {
          const translatedClass = await translate(prediction.class, {
            to: "ko",
          });
          return translatedClass;
        })
      );

      setTranslatedPredictions(translatedClasses);
      drawPredictions(predictions);
    };
  };

  const drawPredictions = (predictions: Prediction[]) => {
    if (!canvasRef.current || !imageRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    predictions.forEach((prediction, index) => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = "red";
      ctx.font = "18px Arial";
      ctx.fillText(translatedPredictions[index], x, y > 10 ? y - 5 : 10);
    });
  };

  return (
    <main className={`w-screen h-screen grid place-items-center`}>
      <div
        className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`}
      >
        <div
          className="flex justify-end  p-4 cursor-pointer "
          onClick={() => router.back()}
        >
          <CloseIconV2 />
        </div>
        <div className="gap-10 items-center flex flex-col">
          {predictions.length > 0 ? (
            <div className="flex flex-row justify-center h-fit mt-5">
              <ul>
                {translatedPredictions.map((translatedClass, index) => (
                  <li key={index} className="font-jeju text-6xl text-[#808080]">
                    {translatedClass}!!
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}{" "}
          <div className=" w-full justify-center h-fit flex ">
            {image && (
              <>
                <img
                  className=" rounded-lg  "
                  src={image}
                  alt="Uploaded"
                  width={300}
                  height={300}
                />
                <canvas
                  ref={canvasRef}
                  width={imageRef.current?.width || 0}
                  height={imageRef.current?.height || 0}
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
              </>
            )}
          </div>
          <div>
            {translatedPredictions.length > 0 ? (
              <div className="flex flex-row justify-center h-fit mt-5">
                <ul>
                  {translatedPredictions.map((prediction, index) => (
                    <li
                      key={index}
                      className="flex flex-col items-center gap-8"
                    >
                      <div>
                        <span className="text-7xl font-jeju mr-2  text-[#000]">
                          {prediction}
                        </span>
                        {"  "}
                        <span className="text-3xl  text-[#000] pt-4 flex justify-end">
                          를 먹으면
                        </span>
                      </div>
                      <div>
                        <span className="text-7xl font-jeju mr-2  text-[#E56A40]">
                          -58
                        </span>
                        <span className="text-3xl  text-[#000]">점</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
          {predictions.length > 0 && (
            <div className="py-3 mt-5 cursor-pointer rounded-full justify-center flex text-base w-[247px] bg-[#F5EEE6]">
              왜 -58점 인가요?
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </main>
  );
};

export default DetectPage;
