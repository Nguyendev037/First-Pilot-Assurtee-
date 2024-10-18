import React from "react";
import "./ScanProcess.css";
import { Link, useNavigate } from "react-router-dom";
import { createWorker } from "tesseract.js";
import Webcam from "react-webcam";
import { useState, useRef, useCallback, useEffect } from "react";
import { base64ToBlob, postImage } from "../../Axios/Axios";
import Swal from "sweetalert2";
export default function ScanProcess() {
  const [output, setOutput] = useState({
    계약자: null,
    등록번호: null,
    상호법인명: null,
    주소: null,
    place: null,
  });

  const [imageURL, setImageURL] = useState(null);
  const [image, setImage] = useState();

  const navigate = useNavigate();

  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    try {
      const imageSrc = await webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
      }
    } catch (error) {
      Swal.fire("Please re-captured the images");
      console.log("error capturing image: ", error);
    }
  }, [webcamRef]);

  
  useEffect(() => {
    const captureFirst = () => {
        capture();
    }
    captureFirst();
  }, [image]);

  const handleScanImage = async () => {
    try {
      await capture();
    } catch (error) {
      console.log("error", error);
    }

    //Scan Process Function
    if (image) {
      console.log("Captured Image:", image);

      try {
        const imageChange64 =  base64ToBlob(image, "image/jpeg");

        const file =  blobToFile(imageChange64, "captured_image.jpg");

        const fileURL = URL.createObjectURL(file);

        setImageURL(fileURL)
        console.log("imageURL: ", imageURL);
        console.log("Captured Image File: ", file);
        
        let response = null;

        if (file) {
          response = await postImage(file);
        }

        console.log("response: ", response);

        return response;
      } catch (error) {
        console.log("error: ", error);
      }
    } else {
      console.error("No image captured.");
    }
  };

    const blobToFile = (blob, fileName) => {
    return new File([blob], fileName, { type: blob.type });
    };

  const videoConstraints = {
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
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </section>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <button
          className="confirm-button active"
          style={{ padding: "16px 80px 14px", marginTop: "0px" }}
          onClick={handleScanImage}
        >
          사업자등록번호
        </button>
      </div>

      <section className="text-output" style={{ textAlign: "center" }}>
        {imageURL && (
          <div>
            <h2>Captured Image Preview:</h2>
            <img src={imageURL} alt="Captured" width="300" />
          </div>
        )}
      </section>
    </div>
  );
}
