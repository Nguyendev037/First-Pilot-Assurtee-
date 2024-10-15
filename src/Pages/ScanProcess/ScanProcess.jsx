import React from "react";
import "./ScanProcess.css";
import { Link, useNavigate } from "react-router-dom";
import { createWorker } from "tesseract.js";
import Webcam from "react-webcam";
import { useState, useRef, useCallback, useEffect } from "react";
import { Height, ScannerRounded } from "@mui/icons-material";
import { width } from "@mui/system";
import Swal from "sweetalert2";
export default function ScanProcess() {

  const [output, setOutput] = useState({
    계약자: null ,
    등록번호: null,
    상호법인명: null,
    주소: null,
    place: null,
  });

  const [lineOutput, setLineOutput] = useState([]);

  const navigate = useNavigate();
  const [image, setImage] = useState();

  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        Swal.fire("SweetAlert2 is working!");
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

      const worker = await createWorker('kor');
  

      try {
        const {
          data: { text, blocks, lines },
        } = await worker.recognize(image);
        console.log("Recognized Text:", text);
        console.log("Recognized Line:", lines);

        const extractedData = parseOCRText(text);
        setOutput(extractedData);

        if (Object.values(output.filter(item => item !== null)).length > 3) {
          navigate("/ScanOutput", {state : {scanResult: output}});
        }
        
        setLineOutput(lines)

      } catch (error) {
        console.error("Recognition error:", error);
      }

      await worker.terminate();
    } else {
      console.error("No image captured.");
    }
  };

  const parseOCRText = (text) => {

    const lines = text.split("\n");
    let result = {
      계약자: "홍길동", 
      등록번호: "",
      상호법인명: "",
      주소: "",
      place: "",
    };

    lines.forEach((line) => {
      if (line.includes("등록번호")) {
        result.등록번호 = line.split(":")[1]?.trim() || "";
      } else if (line.includes("상호")) {
        result.상호법인명 = line.split(":")[1]?.trim() || "";
      } else if (line.includes("주소")) {
        result.주소 = line.split(":")[1]?.trim() || "";
      }
      // Add more conditions based on the structure of the text.
    });

    return result;
  };


  console.log('output: ', output);

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
          style={{ padding: "16px 80px 14px", marginTop:"0px"}}
          onClick={handleScanImage}
        >
          사업자등록번호
        </button>
      </div>


      <section className="text-output">
        {
          lineOutput && lineOutput.map((line, index) => {
            return (
              <>
              <p>{line.text}</p>
              <p>{line.confidence}</p>
              </>
            )
          }) 
        }
      </section>


    </div>
  );
}
