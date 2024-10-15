import React from "react";
import "./ScanProcess.css";
import { Link } from "react-router-dom";
import { createWorker } from "tesseract.js";
import Webcam from "react-webcam";
import { useState, useRef, useCallback, useEffect } from "react";
export default function ScanProcess() {
  const [image, setImage] = useState();

  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
      }
    } catch (error) {
      console.log("error capturing image: ", error);
    }
  }, [webcamRef]);

  const handleScanImage = async () => {
    await capture();

    if (image) {
      console.log("Captured Image:", image);

      const worker = await createWorker();

      await worker.loadLanguage("eng+kor+vie");
      await worker.initialize("eng+kor+vie");

      try {
        // Pass the base64 image to Tesseract for recognition
        const {
          data: { text },
        } = await worker.recognize(image);
        console.log("Recognized Text:", text);
      } catch (error) {
        console.error("Recognition error:", error);
      }

      await worker.terminate();
    } else {
      console.error("No image captured.");
    }
  };

  const videoConstraints = {
    width: 370,
    height: 700,
    facingMode: "environment",
  };
  return (
    <div className="">
      <section className="scan-header scan-process">
        <p className="header-title">사업자등록번호 입력</p>
      </section>
      <section className="scan-component">
        <div className="webcam-component">
          <Webcam
            ref={webcamRef}
            imageSmoothing={true}
            forceScreenshotSourceSize={true}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        </div>
      </section>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <button
          className="confirm-button active"
          style={{ padding: "16px 80px 14px", marginTop: "131px" }}
          onClick={handleScanImage}
        >
          사업자등록번호
        </button>
      </div>
    </div>
  );
}
