import React, { useState, useEffect } from "react";
import ChatBotStyle from "./Chatbot.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import icon2 from "./image/icon2.png";
import bg from "../../../Assets/backdropimage.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const EmployerChatBot = () => {
    const [showImage, setShowImage] = useState(true);
    const [showContent, setShowContent] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowImage(false);
        setShowContent(true);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div style={{margin:'-24px -24px 0px -24px'}}>
        <Helmet>
          <style>{`
            .JobSeeker_RightSideContainer__topHeaderContainer{
              display: none !important;
            }
  
            .JobSeeker_LayoutContainer__RightSideContainer{
              flex: 1;
              height:100vh;
            }
          `}</style>
        </Helmet>
        <div className={ChatBotStyle.chatbot_full}>
          {showImage && (
            <div className={ChatBotStyle.chatbot_full_image}>
              <img src={bg} alt={"bg"} className={ChatBotStyle.chatbot_bg} />
            </div>
          )}
          {showContent && (
                  <div className={ChatBotStyle.chatbot_full_content}>
                    <div className={ChatBotStyle.chatbot_title}>
                      Your AI Assistant
                    </div>
                    <div className={ChatBotStyle.chatbot_content}>
                      Using this software, you can ask <br /> questions and
                      receive articles using <br /> an artificial intelligence
                      assistant
                    </div>
                    <div className={ChatBotStyle.chatbot_content_image}>
                      <img src={icon2} alt={"icon2"} className={ChatBotStyle.chatbot_image} />
                    </div>
  
                    <Link to="/Chatarea" className={ChatBotStyle.chatbot_link}>
                      <button className={ChatBotStyle.chatbot_button}>
                        Continue
                        <span>
                          <FaArrowRightLong className={ChatBotStyle.chatbot_button_arrow} />
                        </span>
                      </button>
                    </Link>
                  </div>
          )}
        </div>
      </div>
    );
}

export default EmployerChatBot