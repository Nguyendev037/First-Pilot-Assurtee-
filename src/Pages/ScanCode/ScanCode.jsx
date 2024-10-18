import React from "react";
import "./ScanCode.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import database from "../../Data/Data";
import { useNavigate } from "react-router-dom";
export default function ScanCode() {
  const inputRefs = useRef([]);

  const [inputValues, setInputValues] = useState(Array(10).fill(""));

  const [isComplete, setIsCompleted] = useState(false);

  const navigate = useNavigate();

  const searchData = (resource) => {

    console.log("resource: ", resource);
    const record = database.find((entry) => entry.registerNumber === resource);

    if (record) {
      return record;
    } else {
      return {
        error: "No record found for the provided register number.",
      };
    }
  };

  const handleInputChange = (e, index) => {
    const newValue = e.target.value;

    // setInputNumber(preState => (...preState, newValue));

    if (newValue.length <= 1) {
      const updateValues = [...inputValues];
      updateValues[index] = newValue;
      setInputValues(updateValues);

      // Move to the next input if the current one is filled
      if (newValue && index < 9) {
        inputRefs.current[index + 1].focus();
      } else if ((newValue === "" && index > 0)){
         inputRefs.current[index-1].focus();
      }

      const isAllFilled = updateValues.every((value) => value !== "");
      setIsCompleted(isAllFilled);
    }
  };

  const handleSummit = () => {
    // Swal.fire({
    //   title: "Success",
    //   text: "Your code is success",
    //   icon: "succes",
    //   confirmButtonText: "Cool",
    // });

    const valuesArray = Object.values(inputValues);
    const resource1 = valuesArray.slice(0, 3).join("");
    const resource2 = valuesArray.slice(3, 5).join("");
    const resource3 = valuesArray.slice(5, 10).join("");
    const resource = `${resource1}-${resource2}-${resource3}`;

    const result = searchData(resource);
    console.log('result: ', result);

    if (result.error) {
      console.error(result.error);
      Swal.fire({
        title: "Error",
        text: "The register number is not found",
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      Swal.fire({
        title: "Success",
        icon: "success",
        confirmButtonText: "ok",
      });
      navigate("/ScanOutput", { state: {result : result} });
    }

    setInputValues(Array(10).fill(""));
    setIsCompleted(false);
    inputRefs.current[0].focus();
  };

  console.log("inputValues: ", inputValues);

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
          사업자 등록번호 10자리를 <br />
          입력해 주세요.
        </p>
      </section>

      <section className="input-pyramid">
        {inputValues.slice(0, 3).map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={value}
            maxLength={1}
            className="input-box"
            onChange={(e) => handleInputChange(e, index)}
          />
        ))}
      </section>

      <section className="input-pyramid">
        {inputValues.slice(3, 5).map((value, index) => (
          <input
            key={index + 3}
            ref={(el) => (inputRefs.current[index + 3] = el)}
            type="text"
            value={value}
            maxLength={1}
            className="input-box"
            onChange={(e) => handleInputChange(e, index + 3)}
          />
        ))}
      </section>

      <section className="input-pyramid">
        {inputValues.slice(5, 10).map((value, index) => (
          <input
            key={index + 5}
            ref={(el) => (inputRefs.current[index + 5] = el)}
            type="text"
            value={value}
            maxLength={1}
            className="input-box"
            onChange={(e) => handleInputChange(e, index + 5)}
          />
        ))}
      </section>

      <button
        className={`confirm-button ${isComplete ? "active" : ""}`}
        disabled={!isComplete}
        onClick={handleSummit}
      >
        확인
      </button>
    </div>
  );
}
