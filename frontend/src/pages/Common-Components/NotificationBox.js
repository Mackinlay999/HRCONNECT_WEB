import React, { useEffect, useState } from "react";
import notificationStyle from "./Notification.module.css";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CalculateTimeAgo } from "./TimeAgo";
import noNotificationPoster from "../../Assets/No_notification.png"
import Loader from "./Loaders/Loader";
import axios from "axios";
import toast from "react-hot-toast"
import { useSelector } from "react-redux";
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL
function NotificationBox({ notificationCounter, CbCloseNotification }) {
  const { email } = useSelector((state) => state.Assessment.currentUser);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState('All')
  const [AllNotification, setAllnotification] = useState([]);

  // !Load Notifications
  const LoadNotifications = () => {
    setNotificationFilter('All')
    setNotificationLoading(true);
    axios.get(`${baseUrl}/user/notifications/get-notification/${email}`).then((response) => {
      if (response.data.success) {
        setAllnotification(response.data.notification);
        notificationCounter(response.data.notification.filter((data) => data.notificationStatus.toLowerCase() === 'Unread'.toLowerCase()).length);
        setNotificationLoading(false);
      } else {
        setAllnotification([]);
        setNotificationLoading(false);
      }
    }).catch((error) => {
      setNotificationLoading(false);
      console.log(error)
    })
  }

  // ! Delete the individual notification
  const handleDeleteNotificationClick = (e, notificationId) => {
    setNotificationFilter("All")
    e.preventDefault();
    axios.delete(`${baseUrl}/user/notifications/delete-notification/${notificationId}`).then((response) => {
      if (response.data.success) {
        toast.success(`${response.data.msg}`);
        LoadNotifications()
      } else {
        toast.error(`${response.data.msg}`);
        LoadNotifications()
      }
    }).catch((error) => {
      toast.error(`Check your internet connection and Try again ! ${error.message}`)
      LoadNotifications()
    })
  }

  // ! Mark All notifications as Read
  const handleMakrAllReadClick = (e) => {
    e.preventDefault();
    setNotificationFilter('All')
    axios.patch(`${baseUrl}/user/notifications/update-all-notification-status/${email}`).then((response) => {
      if (response.data.success) {
        toast.success(`${response.data.msg}`);
        LoadNotifications()
      } else {
        toast.error(`${response.data.msg}`);
        LoadNotifications()
      }
    }).catch((error) => {
      console.log(error)
      toast.error(`Check your internet connection and Try again ! ${error.message}`)
      LoadNotifications()
    })
  }

  // ! Mark Individual  notification as Read
  const handleMakrAsReadClick = (e, notificationId) => {
    e.preventDefault();
    axios.patch(`${baseUrl}/user/notifications/update-notification-status/${notificationId}`).then((response) => {
      if (response.data.success) {
        toast.success(`${response.data.msg}`);
        LoadNotifications()
      } else {
        toast.error(`${response.data.msg}`);
        LoadNotifications()
      }
    }).catch((error) => {
      toast.error(`Check your internet connection and Try again ! ${error.message}`)
      LoadNotifications()
    })
  }

  //! Load notification useeffect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(LoadNotifications, [email]);

  const handleToggleActiveNotification = (e, filterText) => {
    e.preventDefault()
    setNotificationFilter(filterText)
    if (filterText === "All") {
      LoadNotifications();
    } else {
      setAllnotification(AllNotification.filter((notification) => notification.notificationStatus === 'Unread'));
    }
  }

  return (
    <section className={notificationStyle.notificationBox__container}>
      <div className={notificationStyle.notificationBox}>
        <h1 className={notificationStyle.notificationBox_header}>
          {notificationFilter} Notifications
          <span className={notificationStyle.notificationCount}>
            {AllNotification.length}
          </span>
        </h1>

        <div className={notificationStyle.notification__buttonContainer}>
          <div>
            <button className={`${notificationStyle.notificationActionButton} ${notificationFilter === "All" && notificationStyle.notificationActiveButton}`} onClick={(e) => handleToggleActiveNotification(e, "All")} type="button" > All</button>
            <button className={`${notificationStyle.notificationActionButton} ${notificationFilter === "Unread" && notificationStyle.notificationActiveButton}`} onClick={(e) => handleToggleActiveNotification(e, "Unread")} type="button" > Unread</button>
            <button className={`${notificationStyle.notificationActionButton} ${AllNotification.some((notification) => notification.notificationStatus === 'Unread') && notificationStyle.notificationActionActiveButton}`} type="button" onClick={handleMakrAllReadClick} > Mark all as read</button>
          </div>
          <>
            <RxCross1 className={notificationStyle.notificationCloseButton} onClick={(e) => CbCloseNotification(false)} />
          </>
        </div>

        <div className={notificationStyle.notification__List}>
          {
            notificationLoading ? <Loader /> : <>

              {AllNotification.length === 0 ? (
                <NoNotification />
              ) : (
                <>
                  {AllNotification.sort((a, b) => b.notificationTime - a.notificationTime).map((notification) => {
                    return (
                      <div className={notificationStyle.notification__ListItem} key={notification._id}>
                        {
                          notification?.notificationStatus === "Unread" ? <span className={notificationStyle.notification__UnreadDot}></span> : <span className={notificationStyle.notification__readDot}></span>
                        }
                        <p className={`${notificationStyle.notification__Text} ${notification?.notificationStatus === "Unread" && notificationStyle.notification__ListItem_Unread}`}>
                          {notification.notificationText}.
                          <span className={notificationStyle.notification__time}>
                            <CalculateTimeAgo time={notification?.notificationTime} />
                          </span>
                        </p>
                        <div className={notificationStyle.notificationItem__iconContainer}>
                          <RiDeleteBin6Line onClick={(e) => handleDeleteNotificationClick(e, notification?._id)} className={notificationStyle.notificationItem__icon} title="Delete Notification" />
                          {
                            notification?.notificationStatus === "Unread" && <MdOutlineMarkEmailUnread className={notificationStyle.notificationItem__icon} onClick={(e) => handleMakrAsReadClick(e, notification?._id)} />
                          }
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          }
        </div>
      </div>
    </section>
  );
}

export default NotificationBox;


const NoNotification = () => {
  return <div className={notificationStyle.no_notificationBox}>
    <img src={noNotificationPoster} alt="No New Notification" />
    <h2 className={notificationStyle.no_notificationPrimaryText}>No notifications yet</h2>
    <h3 className={notificationStyle.no_notificationSecondaryText}>We will let you know when something needs your attention</h3>
  </div>
}