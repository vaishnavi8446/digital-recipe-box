
const db = require('../models/db'); 

exports.getAllNotifications = (req, res) => {

  db.query('SELECT * FROM notifications', (err, notifications) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ notifications });
  });
};

exports.markNotificationAsRead = (req, res) => {
  const notificationId = req.params.id;

  db.query('UPDATE notifications SET read = true WHERE id = ?', [notificationId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Notification marked as read' });
  });
};

exports.deleteNotification = (req, res) => {
  const notificationId = req.params.id;
  db.query('DELETE FROM notifications WHERE id = ?', [notificationId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Notification deleted' });
  });
};
