import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChatBotStyle from "./Chatbot.module.css";

import icon3 from "../../../Assets/icon3.png";
import icon4 from "../../../Assets/icon4.png";
import icon5 from "../../../Assets/icon5.png";
import icon6 from "../../../Assets/icon6.png";
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
    <>
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

      <div className={ChatBotStyle.chatbot_body}>
      <div>
      <ChatbotCompo/>
      </div>

    <div>
    <div className={ChatBotStyle.ai_inter}>
            <div
              className={ChatBotStyle.noPaddingRow}
            >
              <div className={ChatBotStyle.ai_inter_side}>
                <div className={ChatBotStyle.with_ai}>
                  Ace your <br /> interview with <br />{" "}
                  <span className={ChatBotStyle.ai_orange}>AI</span>
                </div>
                <div className={ChatBotStyle.ai_summary}>
                  Schedule your interview with AI, which can enhance your
                  confidence levels, thereby increasing your chances of seizing
                  opportunities at multinational corporations.
                </div>

                <img
                  src={icon5}
                  alt={"icon5"}
                  className={ChatBotStyle.chatbot_image_group}
                />

                <img
                  src={icon6}
                  alt={"icon6"}
                  className={ChatBotStyle.chatbot_image_camera}
                />

                <button className={ChatBotStyle.chatbot_shew}>
                  SCHEDULE NOW
                </button>
              </div>
            </div>
      </div>

    </div>
      </div>
    </div>
    </>
  );
}
