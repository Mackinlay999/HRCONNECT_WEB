const assessmentCollection = require("../../model/Assessment.Model");

const create = async (req, res) => {
  try {
    const data = await assessmentCollection.create({ ...req.body });

    res.status(200).send({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const get = async (req, res) => {
  try {
    const data = await assessmentCollection.findById(req.params.id);
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await assessmentCollection.find({});
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};
const update = async (req, res) => {
  try {
    const data = await assessmentCollection.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );

    res.status(200).send({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const remove = async (req, res) => {
  try {
    const data = await assessmentCollection.findByIdAndDelete(req.params.id);

    res.status(200).send({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  create,
  get,
  update,
  remove,
  getAll,
};
