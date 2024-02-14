const db = require("../db/db");

exports.getAllNotifications = (req, res) => {
  try {
    const sql = "SELECT * FROM notifications";
    db.query(sql, (err, notifications) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ status_code: 500, error: "Internal server error" });
      }
      res.status(200).send({ status_code: 200, data: notifications });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

//check this api
exports.markNotificationAsRead = (req, res) => {
  try {
    const notificationId = req.params.id;
    const sql = "UPDATE notifications SET read = ? WHERE id = ?";
    const {read} = req.body;
    db.query(sql, [read, notificationId], (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ status_code: 500, error: "Internal server error" });
      }
      res.status(200).send({
        status_code: 200,
        message: "Notification marked as read",
        data: result,
      });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

exports.deleteNotification = (req, res) => {
  try {
    const notificationId = req.params.id;
    const sql = "DELETE FROM notifications WHERE id = ?";
    db.query(sql, [notificationId], (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ status_code: 500, error: "Internal server error" });
      }
      res.status(200).send({
        status_code: 200,
        message: "Notification deleted",
        data: result,
      });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};
