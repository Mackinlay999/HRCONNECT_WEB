const { notificationCollection } = require("../model/Notification.Model");

const saveNotification = async (req, res) => {
    try {
        const { userEmail, NotificatioNText, updatedAt, notificationStatus } = req.body;

        await notificationCollection.create({
            email: userEmail,
            notificationText: NotificatioNText,
            notificationStatus: notificationStatus,
            notificationTime: updatedAt,
        });
        res.status(200).json({
            success: true,
        })
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getNotification = async (req, res) => {
    try {
        const { email } = req.params;
        const mongooseResponse = await notificationCollection.find({
            email: email,
        });
        if (mongooseResponse.length > 0) {
            res.status(200).json({
                success: true,
                notification: mongooseResponse,
            });
        } else {
            res.status(200).json({
                success: false,
                notification: mongooseResponse,
            });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteAllNotifications = async (req, res) => {
    try {
        const { email } = req.params;
        const mongooseResponse = await notificationCollection.deleteMany({
            email: email,
        });
        if (mongooseResponse.acknowledged) {
            res.status(200).json({
                success: true,
                msg: "All notifications deleted",
            });
        } else {
            res.status(404).json({
                success: false,
                msg: "No notifications found",
            });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteNotification = async (req, res) => {
    const { notificationID } = req.params
    try {
        const mongooseResponse = await notificationCollection.findByIdAndDelete(notificationID);
        if (mongooseResponse) {
            res.status(200).json({
                success: true,
                msg: "Notification deleted"
            })
        } else {
            res.status(200).json({
                success: false,
                msg: "Notification not found"
            })
        }
    } catch (error) {
        res.status(500).json({ error });
    }

}

const updateNotificationStatus = async (req, res) => {
    const { notificationID } = req.params
    try {
        const mongooseResponse = await notificationCollection.findByIdAndUpdate(notificationID, {
            notificationStatus: 'read'
        });
        if (mongooseResponse) {
            res.status(200).json({
                success: true,
                msg: "Notification marked as read"
            })
        } else {
            res.status(200).json({
                success: false,
                msg: "Notification not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }

}
const updateAllNotificationStatus = async (req, res) => {
    const { email } = req.params
    try {
        const mongooseResponse = await notificationCollection.updateMany({ email: email }, { notificationStatus: 'read' });
        if (mongooseResponse) {
            res.status(200).json({
                success: true,
                msg: "All Notification marked as read"
            })
        } else {
            res.status(200).json({
                success: false,
                msg: "Notification not found"
            })
        }
    } catch (error) {
        res.status(500).json({ error });
    }

}
module.exports = { saveNotification, getNotification, deleteAllNotifications, deleteNotification, updateNotificationStatus, updateAllNotificationStatus };
