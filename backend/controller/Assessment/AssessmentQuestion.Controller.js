const questionCollection = require("../../model/AssessmentQuestion.Model");

const create = async (req, res) => {
  try {
    const data = await questionCollection.create({ ...req.body });

    res.status(200).send({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const list = async (req, res) => {
  try {

    const { filter = {}, ...rest } = req.query || {};
    const { data, meta } = await questionCollection.paginate({assessment:  req.params.id  }, rest);

    res.status(200).send({ data, meta });
  } catch (error) {
    res.send({ error });
  }
};

const get = async (req, res) => {
  try {
    const data = await questionCollection.find({ assessment: req.params.id });

    res.status(200).send({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const update = async (req, res) => {
  try {
    const data = await questionCollection.findByIdAndUpdate(
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
    const data = await questionCollection.findByIdAndDelete(req.params.id);

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
  list,
};
