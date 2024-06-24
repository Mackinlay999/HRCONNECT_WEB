import React, { useEffect, useState } from "react";
import layout from "./RecruiterLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { IoMicOutline } from "react-icons/io5";
import { IoMicOffOutline } from "react-icons/io5";
import { handleSearchData } from "../../../Redux/ReduxFilterSlice";
import { VscSettings } from "react-icons/vsc";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import NotificationBox from "../../Common-Components/NotificationBox";
import axios from "axios";
import { useDispatch } from "react-redux";
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
const newUrl = process.env.REACT_APP_BACKEND_BASE_URL_WITHOUT_API;
export default function TopBar() {
  const socket = io(`${newUrl}`);
  const { email } = useSelector((state) => state.Assessment.currentUser);
  const [searhOption, setSearchOption] = useState({ searchText: "" });
  const [notificationCount, setNotificationCount] = useState(0);
  const [ToggleNotification, SetToggleNotification] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const recognition = new window.webkitSpeechRecognition(); // Initialize speech recognition

  recognition.continuous = false; // Enable continuous listening
  recognition.lang = "en-US"; // Set the language for speech recognition

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    setSearchOption({ ...searhOption, "searchText": transcript });
    setIsListening(false);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  const toggleMicListening = (e) => {
    e.preventDefault();
    if (isListening) {
      recognition.stop(); // Stop speech recognition if it's currently listening
      setIsListening(false);
    } else {
      recognition.start(); // Start speech recognition
      setIsListening(true);
    }
  };
  const handleSearchInputChange = (e) => {
    setSearchOption({ ...searhOption, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const setTextTimeOut = setTimeout(() => {
      if (searhOption.searchText || searhOption.Location) {
        dispatch(handleSearchData(searhOption));
      } else {
        dispatch(handleSearchData(searhOption));
      }
    }, 1000);
    return () => clearTimeout(setTextTimeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searhOption]);

  // !Load Notifications
  const LoadNotifications = () => {
    axios
      .get(`${baseUrl}/user/notifications/get-notification/${email}`)
      .then((response) => {
        if (response.data.success) {
          setNotificationCount(
            response.data.notification.filter(
              (data) =>
                data.notificationStatus.toLowerCase() === "Unread".toLowerCase()
            ).length
          );
        } else {
          setNotificationCount(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    socket.emit("userConnect", JSON.stringify({ userEmail: email }));
    LoadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      axios
        .post(
          `${baseUrl}/user/notifications/save-notification`,
          JSON.parse(data)
        )
        .then((response) => {
          if (response.data.success) {
            LoadNotifications();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  return (
    <>
      <div className={layout.__topbar}>
        <div className={layout.__searchbar}>
          <FontAwesomeIcon
            className={layout.__topbar_Icon}
            icon={faMagnifyingGlass}
          />
          <input
            className={layout.__input}
            type="text"
            name="searchText"
            id="searchText"
            placeholder="search by keyword......"
            onChange={handleSearchInputChange}
            value={searhOption.searchText}
          />
          {isListening ? (
            <IoMicOutline
              className={layout.__topbar_Icon}
              onClick={toggleMicListening}
            />
          ) : (
            <IoMicOffOutline
              className={layout.__topbar_Icon}
              onClick={toggleMicListening}
            />
          )}
        </div>
        <button
          onClick={() => navigateTo("/addemployee")}
          className={layout.__btn_Add_Employee}
        >
          <FontAwesomeIcon icon={faUserPlus} /> Add Employee
        </button>
        <VscSettings
          className={layout.__btn_filter}
          style={{ color: "white", fontSize: "25" }}
        />
        <Badge color="primary" badgeContent={notificationCount}>
          <IoIosNotificationsOutline
            className={layout.__btn_notfication}
            style={{ color: "white", fontSize: "25" }}
            onClick={() => SetToggleNotification(!ToggleNotification)}
          />
        </Badge>
      </div>
      {ToggleNotification && (
        <NotificationBox
          notificationCounter={setNotificationCount}
          CbCloseNotification={SetToggleNotification}
        />
      )}
    </>
  );
}
