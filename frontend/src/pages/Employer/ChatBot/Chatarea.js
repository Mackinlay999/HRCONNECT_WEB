import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChatBotStyle from "./Chatbot.module.css";

import icon3 from "../../../Assets/icon3.png";
import icon4 from "../../../Assets/icon4.png";
import { GoDotFill } from "react-icons/go";
import ChatbotCompo from "./ChatbotCompo";

export default function Chatarea() {

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .JobSeeker_RightSideContainer__topHeaderContainer{
        display: none !important;
      }
      .JobSeeker___OutletContainer{
        height: 100vh;
      }
      
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);


  return (
<div style={{margin:'-24px -24px 0px -24px'}}>
<div className={ChatBotStyle.ai_full}>
      <Helmet>
      <style>{`
          .JobSeeker_RightSideContainer__topHeaderContainer {
            display: none !important;
          }

          .JobSeeker_LayoutContainer__RightSideContainer {
            height: auto;
          }
        `}</style>
      </Helmet>
      <Container>
        <Row>
          <Col md={12} className={ChatBotStyle.header_style_ai}>
            <div className={ChatBotStyle.ai_search_bar}>
              <div className={ChatBotStyle.ai_search_icons}>
                <img
                  src={icon3}
                  alt={"icon3"}
                  className={ChatBotStyle.chatbot_image_gender}
                />
                <div className={ChatBotStyle.ai_online}>
                  <GoDotFill className={ChatBotStyle.ai_online_green} />
                  <span>Online</span>
                </div>
              </div>
              <img
                src={icon4}
                alt={"icon4"}
                className={ChatBotStyle.chatbot_image_sound}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <div>
      <ChatbotCompo/>
      </div>
    </div>
</div>
  );
}
