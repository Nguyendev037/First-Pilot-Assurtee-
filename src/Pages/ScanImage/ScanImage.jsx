import React from "react";
import "./ScanImage.css";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export default function ScanImage() {
  return (
    <div className="ScanPages">
      <section className="scan-header">

        <Link to="/" style={{color: "#00000"}}>
          <i class="fa-solid fa-chevron-left icon"></i>
        </Link>

        <p className="header-title">사업자등록번호 입력</p>
      </section>
    </div>
  );
}
