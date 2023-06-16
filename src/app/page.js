'use client'
import React, { useState } from 'react';

import { load as loadModel, decodeImage } from '@tensorflow-models/mobilenet';
import { browser } from '@tensorflow/tfjs';

const ImageClassifier = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      setLoading(true);
      const image = await loadImage(e.target.result);
      const model = await loadModel();
      const predictions = await model.classify(image);

      setPredictions(predictions);
      setImageUrl(URL.createObjectURL(file));
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const loadImage = async (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  return (
    <div className="max-w-md mx-auto  p-6 shadow-lg rounded-lg">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 py-2 px-4 border border-gray-300 rounded-md w-full"
      />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="my-4 mx-auto w-64 h-auto rounded"
        />
      )}
      <h3 className="text-xl font-bold mb-2">Predictions:</h3>
      <ul>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index} className="mb-2">
              {`${prediction.className}: ${Math.round(prediction.probability * 100)}%`}
            </li>
          ))}
        </ul>
      )}
      </ul>
    </div>


  );
};

export default ImageClassifier;
