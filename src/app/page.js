'use client'
import React, { useState } from 'react';
import { load as loadModel, decodeImage } from '@tensorflow-models/mobilenet';
import { browser } from '@tensorflow/tfjs';

const ImageClassifier = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [predictions, setPredictions] = useState([]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const image = await loadImage(e.target.result);
      const model = await loadModel();
      const predictions = await model.classify(image);

      setPredictions(predictions);
      setImageUrl(URL.createObjectURL(file));
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
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />}
      <h3>Predictions:</h3>
      <ul>
        {predictions.map((prediction, index) => (
          <li key={index}>{`${prediction.className}: ${Math.round(prediction.probability * 100)}%`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ImageClassifier;
