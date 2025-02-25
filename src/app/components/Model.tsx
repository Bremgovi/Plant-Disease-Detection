"use client"; // Needed for Next.js App Router (if using)

import { useState, useRef } from "react";
import * as tmImage from "@teachablemachine/image";

const TeachableMachine = () => {
  const URL = "https://teachablemachine.withgoogle.com/models/6V2Q5fteq/"; // Replace with your model URL
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [predictions, setPredictions] = useState<{ className: string; probability: string }[]>([]);
  const [showAllPredictions, setShowAllPredictions] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  async function loadModel() {
    const loadedModel = await tmImage.load(modelURL, metadataURL);
    setModel(loadedModel);
  }

  async function predict(input: HTMLImageElement) {
    if (!model) {
      alert("Please load the model first!");
      return;
    }

    setPredictions([]);
    const prediction = await model.predict(input);
    const sortedPredictions = prediction
      .map((p) => ({
        className: p.className,
        probability: (p.probability * 100).toFixed(2) + "%",
      }))
      .sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    setPredictions(sortedPredictions);
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!model) {
      alert("Please load the model first!");
      return;
    }

    const file = event.target.files?.[0];
    if (file) {
      const img = new Image();
      const imageUrl = window.URL.createObjectURL(file);
      img.src = imageUrl;
      img.onload = async () => {
        setPredictions([]); // Clear previous predictions
        setUploadedImage(imageUrl); // Set the uploaded image
        await predict(img);
      };
    }
  }

  function formatPrediction(prediction: string) {
    const regex = /([a-zA-Z]+)\s\(([^)]+)\)/; // Matches "Planta (Enfermedad)"
    const match = prediction.match(regex);
    if (match) {
      const plant = match[1];
      const disease = match[2];
      return disease.toLowerCase() !== "sano" ? (
        <span>
          La planta es <span className="font-bold text-lime-200">{plant}</span> y tiene <span className="font-bold text-red-400">{disease}</span>
        </span>
      ) : (
        <span>
          La planta es <span className="font-bold text-lime-200">{plant}</span> y está <span className="font-bold text-green-400">{disease}</span>
        </span>
      );
    }
    return prediction;
  }
  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-bold mb-4">Chequemos tus plantas!</h2>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md m-2" onClick={loadModel} disabled={!!model}>
        {model ? "Modelo cargado ✅" : "Cargar modelo"}
      </button>

      <div className="my-4">
        <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageUpload} />
        <button className="bg-green-700 text-white px-4 py-2 rounded-md m-2" onClick={() => fileInputRef.current?.click()} disabled={!model}>
          Subir imagen
        </button>
      </div>

      <div className="mt-4">
        {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="mx-auto mb-4 rounded-xl" />}
        {predictions.length > 0 && (
          <div>
            <p className="text-lg text-gray-200 ">
              <strong>{formatPrediction(predictions[0].className)} con una probabilidad del:</strong>
            </p>
            <p className="text-5xl mt-5 mb-5 font-extra-bold">
              <strong>{predictions[0].probability}</strong>
            </p>
            {showAllPredictions && (
              <div className="mt-4 max-h-20 overflow-y-auto bg-gray-700 p-4 rounded-lg">
                {predictions.slice(1).map((p, index) => (
                  <p key={index} className="text-lg">
                    {formatPrediction(p.className)}: <strong>{p.probability}</strong>
                  </p>
                ))}
              </div>
            )}
            {!showAllPredictions && (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={() => setShowAllPredictions(true)}>
                Mostrar todas las predicciones
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachableMachine;
