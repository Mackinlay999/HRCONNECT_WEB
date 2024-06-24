const { saveNotification, getNotification, deleteAllNotifications, deleteNotification, updateNotificationStatus, updateAllNotificationStatus } = require("../controller/Notification.controller.js");

const notificationRoutes = require("express").Router();

notificationRoutes.post("/save-notification", saveNotification);
notificationRoutes.get("/get-notification/:email", getNotification);
notificationRoutes.delete("/delete-all-notification/:email", deleteAllNotifications);
notificationRoutes.delete("/delete-notification/:notificationID", deleteNotification);
notificationRoutes.patch("/update-notification-status/:notificationID", updateNotificationStatus);
notificationRoutes.patch("/update-all-notification-status/:email", updateAllNotificationStatus);

module.exports = {
    notificationRoutes,
}