import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

import { MiniLoading } from "@/components/Loading/Loading";
import { CloseIconV2 } from "@/src/assets/icon/close-icon-v2";
import { Modal } from "@/src/component/atom/Modal.tsx/Modal";
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [translatedPredictions, setTranslatedPredictions] = useState<string[]>(
    []
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (!image) {
      setShowModal(true);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL?.createObjectURL(file);
      setImage(imageUrl);
      processImage(imageUrl);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL("image/png");
    setImage(imageUrl);

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    processImage(imageUrl);
  };

  const processImage = async (imageUrl: string) => {
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
        predictions.map(async (prediction: any) => {
          const translatedClass = await translate(prediction.class, {
            to: "ko",
          });
          return translatedClass;
        })
      );

      setTranslatedPredictions(translatedClasses);
      drawPredictions(predictions);
      setIsLoading(false);
    };
  };

  useEffect(() => {
    if (canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      canvas.width = imageRef.current.width;
      canvas.height = imageRef.current.height;
    }
  }, [image]);

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
        className={`w-full max-w-[26.875rem] h-full bg-milky_white grid grid-rows-[3rem_auto]`}
      >
        <div
          className="flex justify-end  p-4 cursor-pointer "
          onClick={() => router.back()}
        >
          <CloseIconV2 />
        </div>

        {isLoading ? (
          <>
            <div
              className={`w-full h-full flex flex-col items-center justify-center gap-4`}
            >
              <MiniLoading />
              <span className={`font-jeju`}>
                FLOW AI가 음식을 판별하는 중이에요.
              </span>
            </div>
          </>
        ) : (
          <div className="gap-10 items-center flex flex-col">
            {predictions.length > 0 ? (
              <div className="flex flex-row justify-center h-fit mt-5">
                <ul>
                  {translatedPredictions.map((translatedClass, index) => (
                    <li
                      key={index}
                      className="font-jeju text-6xl text-[#808080]"
                    >
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
              <>
                <button className="py-3 mt-5 cursor-pointer shadow-lg rounded-full justify-center flex text-base w-[247px] bg-white">
                  왜 -58점 인가요?
                </button>
                <button className="py-3 cursor-pointer shadow-lg rounded-full justify-center flex text-base w-[247px] bg-white">
                  더 안전하게 먹는법?
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="font-jeju text-7xl flex justify-center my-20">
            이거 <br />
            먹어도 <br />
            돼?!
          </div>
          <div className="flex flex-row justify-center gap-4 my-5">
            <button
              className="rounded-full font-jeju text-white bg-water_blue p-4 items-center flex justify-center w-[150px] h-fit"
              onClick={() => {
                handleTakePhoto();
                setShowModal(false);
              }}
            >
              사진찍기
            </button>
            <button
              className="rounded-full font-jeju text-white bg-water_blue p-4 items-center flex justify-center w-[150px] h-fit"
              onClick={() => {
                fileInputRef.current?.click();
                setShowModal(false);
              }}
            >
              사진 첨부하기
            </button>
          </div>
        </Modal>
      )}
      {stream && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <button
            className="rounded-full font-jeju text-white bg-water_blue p-4 items-center flex justify-center"
            onClick={capturePhoto}
          >
            사진 촬영
          </button>
        </div>
      )}
    </main>
  );
};

export default DetectPage;
