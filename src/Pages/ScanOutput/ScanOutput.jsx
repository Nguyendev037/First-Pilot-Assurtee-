import React, { useEffect, useState } from "react";
import { Link, useLocation} from "react-router-dom";
import Logo1 from "../../assets/Images/Logo1.png";
import path1 from "../../assets/Images/path-10-copy.png";
import group7 from "../../assets/Images/group-7.png";
import mainLogo from "../../assets/Images/ci.png";
import onTopIcon from "../../assets/Images/top.png";

import { Accordion, AccordionSummary } from "@mui/material";
import {
  FilledInput,
  Box,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./ScanOutput.css";
export default function ScanOutput() {

  // const [output, SetOutput] = useState({
  //   계약자: "홍길동",
  //   등록번호: "536-87-01775",
  //   상호법인명: "홍대우리민박",
  //   주소: "경기도 고양시 덕양구 향기5로 66 (향동동, DMC 두산위브 더 퍼스트)",
  //   place: "1003동 213호",
  // });

  const [output, setOutput] = useState(null)
  console.log('output: ', output);

  const location = useLocation();

  const {result} = location.state || {};

  console.log('scanResult: ', result);

  useEffect(()=> {
    setOutput(result)
    setOutput(preState => ({...preState, placeDetail:"1003동 213호"}))
  },[])
  

  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="ScanOutPut1">
      <section className="header">
        <div className="logo">
          <img src={Logo1} alt="" />
          <img src={path1} alt="" />
          <img className="logo-1" src={group7} alt="" />
        </div>
      </section>

      <section className="scaner-banner">
        <p>스캔 정보를 확인해 주세요.</p>
      </section>

      <section className="ScanOutput">
        <div>
          <Typography variant="subtitle1" className="label">
            계약자
          </Typography>
          <Typography variant="h5" sx={{ mt: "11px" }} className="scan-output">
            {output?.bussinessType}
          </Typography>
          <Divider sx={{ mt: "13px", mb: "20px" }} />
        </div>
        <div>
          <Typography variant="subtitle1" className="label">
            등록번호
          </Typography>
          <Typography variant="h5" sx={{ mt: "11px" }} className="scan-output">
            {output?.registerNumber}
          </Typography>
          <Divider sx={{ mt: "13px", mb: "20px" }} />
        </div>
        <div>
          <Typography variant="subtitle1" className="label">
            상호(법인)명
          </Typography>
          <Typography variant="h5" sx={{ mt: "11px" }} className="scan-output">
            {output?.companyName}
          </Typography>
          <Divider sx={{ mt: "13px", mb: "20px" }} />
        </div>
        <div>
          <Typography variant="subtitle1" className="label">
            주소
          </Typography>
          <div className="locate">
            <Typography
              variant="h5"
              sx={{ mt: "11px" }}
              className="scan-output"
            >
              {output?.address}
            </Typography>
            <button style={{marginLeft: "5px"}}>주소검색</button>
          </div>
          <Divider sx={{ mt: "13px", mb: "20px" }} />
        </div>
        <div>
          <Typography variant="h5" sx={{ mt: "11px" }} className="scan-output">
            {output?.placeDetail}
          </Typography>
          <Divider sx={{ mt: "13px", mb: "20px" }} />
        </div>
      </section>

      <section>
        <button
          className="confirm-button active"
          style={{ padding: "16px 80px 14px", margin: "77px 0 40px" }}
        >
          사업자등록번호
        </button>
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
                expandIcon={<AddIcon />}
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
    </div>
  );
}
