const MCQ = require('../../model/InterviewSchedule/AptitudeRoundModel')

// Controller function to get all MCQs
exports.getAllMCQs = async (req, res) => {
    try {
        const mcqs = await MCQ.find();
        res.json(mcqs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to create a new MCQ
exports.createMCQ = async (req, res) => {
    const mcq = new MCQ({
        question: req.body.question,
        options: req.body.options,
        correctAnswer: req.body.correctAnswer
    });
    try {
        const newMCQ = await mcq.save();
        res.status(201).json(newMCQ);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller function to update an existing MCQ
exports.updateMCQ = async (req, res) => {
    try {
        const mcq = await MCQ.findById(req.params.id);
        if (mcq == null) {
            return res.status(404).json({ message: 'MCQ not found' });
        }
        if (req.body.question != null) {
            mcq.question = req.body.question;
        }
        if (req.body.options != null) {
            mcq.options = req.body.options;
        }
        if (req.body.correctAnswer != null) {
            mcq.correctAnswer = req.body.correctAnswer;
        }
        const updatedMCQ = await mcq.save();
        res.json(updatedMCQ);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller function to delete an MCQ
exports.deleteMCQ = async (req, res) => {
    try {
        const mcq = await MCQ.findById(req.params.id);
      if (mcq == null) {
        return res.status(404).json({ message: 'MCQ not found' });
      }
      await mcq.deleteOne({ _id: req.params.id });
      res.json({ message: "MCQ deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
