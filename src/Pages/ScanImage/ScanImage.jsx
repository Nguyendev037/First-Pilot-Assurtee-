import React from "react";
import "./ScanImage.css";
import { Link, useNavigate } from "react-router-dom";
import { createWorker } from "tesseract.js";
import Webcam from "react-webcam";
import group9 from "../../assets/Images/group-9.png";
import { useState, useRef, useCallback, useEffect } from "react";
export default function ScanImage() {
  
  const navigate = useNavigate();

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

      
      <button
        className="confirm-button active"
        style={{ padding: "16px 80px 14px", marginTop: "131px" }}
        onClick={()=> {navigate("/ScanProcess")}}
      >
        사업자등록번호
      </button>
    </div>
  );
}
