const conn = require("../db/db");
const {
  getAllNotifications,
  idDbValueQuery,
  deleteNotification,
  readDbValueQuery,
  updateNotificationQuery,
} = require("../db/notificationDB");

exports.getAllNotifications = async (req, res) => {
  try {
    let notifications = await getAllNotifications(conn);
    if (notifications) {
      return res.status(200).send({ status_code: 200, data: notifications });
    } else {
      return res
        .status(404)
        .send({ status_code: 404, message: "Notification not found!" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const { read } = req.body;
    const readTableValue = await readDbValueQuery(conn, notificationId);

    if (readTableValue) {
      const currentReadValue = readTableValue[0].read;
      if (currentReadValue === 0) {
        const markNotificationAsRead = await updateNotificationQuery(
          conn,
          read,
          notificationId
        );
        return res.status(200).send({
          status_code: 200,
          message: "Notification marked as read!" 
        });

      } else {
        return res.status(404).json({
          status_code: 404,
          error: "Notification already marked as read!",
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status_code: 500, error: "Internal server error" });
  }
};

//not working
exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    let idInTable = await idDbValueQuery(conn, notificationId);
    console.log("id",idInTable[0].id)
    if (idInTable) {
      let notifications = await deleteNotification(conn, notificationId);

      if (notifications) {
        return res.status(200).send({
          status_code: 200,
          message: "Notification deleted!",
          data: notifications,
        });
      } else {
        return res.status(404).send({
          status_code: 404,
          message: "Notification not deleted!",
        });
      }
    } else {
      return res.status(404).send({
        status_code: 404,
        message: "Notification not found in the database!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status_code: 500,
      message: "Internal server error",
    });
  }
};
