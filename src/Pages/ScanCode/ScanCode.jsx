import React from "react";
import "./ScanCode.css";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useRef, useState } from "react";
export default function ScanCode() {
  const inputRefs = useRef([]);
  const [inputValues, setInputValues] = useState(Array(10).fill(""));
  const [isComplete, setIsCompleted] = useState(false);

  const handleInputChange = (e, index) => {
    const newValue = e.target.value;

    if (newValue.length <= 1) {
      const updateValues = [...inputValues];
      updateValues[index] = newValue;
      setInputValues(updateValues);

      // Move to the next input if the current one is filled
      if (newValue && index < 9) {
        inputRefs.current[index + 1].focus();
      }

      const isAllFilled = updateValues.every((value) => value !== "");
      setIsCompleted(isAllFilled);
    }
  };

 const handleSummit = () => {
    Swal.fire({
      title: 'Success',
      text: 'Your code is success',
      icon: 'succes',
      confirmButtonText: 'Cool'
    })
    setInputValues(Array(10).fill(''));
    setIsCompleted(false); 
    inputRefs.current[0].focus(); 
 }





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
        {inputValues.map((value, index) => (
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
