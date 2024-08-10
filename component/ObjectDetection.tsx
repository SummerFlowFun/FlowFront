// components/ObjectDetection.tsx
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { ChangeEvent, useRef, useState } from "react";

type Prediction = {
  bbox: [number, number, number, number];
  class: string;
  score: number;
};

export default function ObjectDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    const imgElement = new Image();
    imgElement.src = imageUrl;
    imgElement.onload = async () => {
      if (imageRef.current) {
        imageRef.current = imgElement;
      }

      const model = await cocoSsd.load();
      const predictions = await model.detect(imgElement);

      setPredictions(predictions);
      drawPredictions(predictions);
    };
  };

  const drawPredictions = (predictions: Prediction[]) => {
    if (!canvasRef.current || !imageRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = "red";
      ctx.font = "18px Arial";
      ctx.fillText(prediction.class, x, y > 10 ? y - 5 : 10);
    });
  };

  return (
    <div>
      <h1>Object Detection</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={image}
            alt="Uploaded"
            ref={imageRef}
            style={{ maxWidth: "300px", height: "auto" }}
          />
          <canvas
            ref={canvasRef}
            width={imageRef.current?.width || 0}
            height={imageRef.current?.height || 0}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </div>
      )}
      {predictions.length > 0 && (
        <div>
          <h2>Detected Objects:</h2>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>
                {prediction.class} - {Math.round(prediction.score * 100)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
