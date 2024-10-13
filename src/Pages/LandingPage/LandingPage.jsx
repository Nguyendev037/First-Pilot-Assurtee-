import React from "react";

import Logo1 from "../../assets/Images/Logo1.png";
import path1 from "../../assets/Images/path-10-copy.png";
import group7 from "../../assets/Images/group-7.png";
import group25 from "../../assets/Images/group-25.png";
import group26 from "../../assets/Images/group-26.png";
import group8 from "../../assets/Images/group-8.png";
import mainLogo from "../../assets/Images/ci.png";
import onTopIcon from "../../assets/Images/top.png";

import { Accordion, AccordionSummary } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="LandingPage">
      <section className="header">
        <div className="logo">
          <img src={Logo1} alt="" />
          <img src={path1} alt="" />
          <img className="logo-1" src={group7} alt="" />
        </div>

        <section className="banner-1">
          <div>
            <p>
              병원/약국
              <span>
                <p>풍수해보험</p>
              </span>
              무료가입
            </p>
          </div>
        </section>

        <section className="banner-f">
          <div className="intro">
            <p>입력 방식을 선택해 주세요.</p>
          </div>
          <div className="function-item">
            <div className="item">
              <Link to={"/Scancode"} style={{ textDecoration: "none" }}>
                <div className="item-detail">
                  <img src={group25} alt="" />
                  <p>
                    <span>
                      사업자등록번호 <br />
                      직접입력
                    </span>
                  </p>
                </div>
              </Link>
            </div>
            <div className="item">
              <Link to={"/ScanImage"} style={{ textDecoration: "none" }}>
                <div className="item-detail">
                  <img src={group26} alt="" />
                  <p>
                    <span>
                      사업자등증 <br />
                      촬영(스캔)입력
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="banner-2">
          <img src={group8} alt="" />
        </section>

        <section className="footer">
          <div className="footer-logo">
            <img src={mainLogo} alt="" />

            <button onClick={onTop}>
              <img src={onTopIcon} alt="" />
            </button>
          </div>
          <div className="footer-info">
            <p>
              주식회사 어슈어티 <br />
              대표 : 김영환 <br />
              사업자 등록번호 : 536-87-01775 <br />
              대리점 등록번호 : 제 2020080048호 <br />
              주소 : 서울특별시 마포구 마포대로 34, 6층 <br />
              고객센터 : 1588-5683 <br />
              팩스 : 02-6008-0801 <br />
              이메일 : info@assuretee.co.kr <br />
            </p>

            <div>
              <Accordion className="footer-accordion">
                <AccordionSummary
                  expandIcon={<AddIcon/>}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <p>관련사이트</p>
                </AccordionSummary>
              </Accordion>
            </div>

            <div className="footer-end">
              © assuretee Inc. All Rights Reserved.
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
