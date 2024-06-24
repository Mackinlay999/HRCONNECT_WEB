const UserSession = require('../../model/users/UserSession');
const User = require('../../model/users/UserModel');

const calculateTimePeriod = (period) => {
  const today = new Date();
  switch (period) {
    case "half-hourly":
      const halfHourAgo = new Date(today.getTime() - (30 * 60 * 1000)); // 30 minutes ago
      return { startTime: { $gte: halfHourAgo } }; // Nest under startTime for consistency
    case "weekly":
      const startOfThisWeek = new Date(today);
      startOfThisWeek.setDate(startOfThisWeek.getDate() - startOfThisWeek.getDay());
      const endOfThisWeek = new Date(startOfThisWeek);
      endOfThisWeek.setDate(endOfThisWeek.getDate() + 7);
      return { startTime: { $gte: startOfThisWeek, $lt: endOfThisWeek } }; // Nest under startTime for consistency
    case "monthly":
      const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { startTime: { $gte: startOfThisMonth, $lt: endOfThisMonth } }; // Nest under startTime for consistency
    case "yearly":
      const startOfThisYear = new Date(today.getFullYear(), 0, 1);
      const endOfThisYear = new Date(today.getFullYear() + 1, 0, 1);
      return { startTime: { $gte: startOfThisYear, $lt: endOfThisYear } }; // Nest under startTime for consistency
    default:
      return {};
  }
};

exports.getHalfHourlyTimeSpent = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const periodFilter = calculateTimePeriod("half-hourly");
    const timeSpent = await UserSession.aggregate([
      { $match: { userId: user._id, ...periodFilter } },
      {
        $group: {
          _id: null,
          totalTime: { $sum: { $subtract: ['$endTime', '$startTime'] } },
        },
      },
    ]);
    const totalTimeSpent = timeSpent.length > 0 ? timeSpent[0].totalTime : 0;
    const timeSpentInMinutes = Math.floor(totalTimeSpent / (1000 * 60)); 

    res.json({ timeSpent: timeSpentInMinutes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getWeeklyTimeSpent = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const periodFilter = calculateTimePeriod("weekly");
    const timeSpent = await UserSession.aggregate([
      { $match: { userId: user._id, ...periodFilter } },
      {
        $group: {
          _id: null,
          totalTime: { $sum: { $subtract: ['$endTime', '$startTime'] } },
        },
      },
    ]);
    const totalTimeSpent = timeSpent.length > 0 ? timeSpent[0].totalTime : 0;
    const timeSpentInMinutes = Math.floor(totalTimeSpent / (1000 * 60)); 

    res.json({ timeSpent: timeSpentInMinutes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMonthlyTimeSpent = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const periodFilter = calculateTimePeriod("monthly");
    const timeSpent = await UserSession.aggregate([
      { $match: { userId: user._id, ...periodFilter } },
      {
        $group: {
          _id: null,
          totalTime: { $sum: { $subtract: ['$endTime', '$startTime'] } },
        },
      },
    ]);
    const totalTimeSpent = timeSpent.length > 0 ? timeSpent[0].totalTime : 0;
    const timeSpentInMinutes = Math.floor(totalTimeSpent / (1000 * 60)); 

    res.json({ timeSpent: timeSpentInMinutes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getYearlyTimeSpent = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const periodFilter = calculateTimePeriod("yearly");
    const timeSpent = await UserSession.aggregate([
      { $match: { userId: user._id, ...periodFilter } },
      {
        $group: {
          _id: null,
          totalTime: { $sum: { $subtract: ['$endTime', '$startTime'] } },
        },
      },
    ]);
    const totalTimeSpent = timeSpent.length > 0 ? timeSpent[0].totalTime : 0;
    const timeSpentInMinutes = Math.floor(totalTimeSpent / (1000 * 60)); 

    res.json({ timeSpent: timeSpentInMinutes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getHalfHourlyLoginFrequency = async (req, res) => {
  try {
    const { email} = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const periodFilter = calculateTimePeriod("half-hourly");
    const loginFrequency = await UserSession.countDocuments({ userId: user._id, ...periodFilter });
    res.json({ loginFrequency });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getWeeklyLoginFrequency = async (req, res) => {
  try {
    const { email,period } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const periodFilter = calculateTimePeriod("weekly");
    const loginFrequency = await UserSession.countDocuments({ userId: user._id, ...periodFilter });
    res.json({ loginFrequency });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMonthlyLoginFrequency = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const periodFilter = calculateTimePeriod("monthly");
    const loginFrequency = await UserSession.countDocuments({ userId: user._id, ...periodFilter });
    res.json({ loginFrequency });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getYearlyLoginFrequency = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const periodFilter = calculateTimePeriod("yearly");
    const loginFrequency = await UserSession.countDocuments({ userId: user._id, ...periodFilter });
    res.json({ loginFrequency });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



