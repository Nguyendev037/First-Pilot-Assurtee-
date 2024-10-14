import React from "react";
import "./ScanImage.css";
import { Link } from "react-router-dom";
import { createWorker } from "tesseract.js";
import Webcam from "react-webcam";
import group9 from "../../assets/Images/group-9.png";
import { useState, useRef, useCallback, useEffect } from "react";
export default function ScanImage() {
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
    width: 1280,
    height: 720,
    facingMode: "environment",
  };

  return (
    <div className="ScanPages">
      <section className="scan-header">
        <Link to="/" style={{ color: "#00000" }}>
          <i class="fa-solid fa-chevron-left icon"></i>
        </Link>

        <p className="header-title">사업자등록번호 입력</p>
      </section>

      <section className="scaner-banner">
        <p>
          촬영을 위해 사업자등록증을 <br /> 준비해 주세요.
        </p>
        <p className="banner-des" style={{ marginTop: "17px" }}>
          기본 정보 입력을 위해 <br /> 고객님의 사업자등록증이 필요해요.
        </p>
      </section>

      <section className="" style={{ marginTop: "50px" }}>
        <img src={group9} alt="" />
      </section>

      <section className="camera-component">
        <Webcam
          width={540}
          height={720}
          ref={webcamRef}
          imageSmoothing={true}
          forceScreenshotSourceSize={true}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </section>

      <button
        className="confirm-button active"
        style={{ padding: "16px 80px 14px", margin: "131px" }}
        onClick={handleScanImage}
      >
        사업자등록번호
      </button>
    </div>
  );
}
