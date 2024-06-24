const express = require('express');
const AptitudeRoundRouter = express.Router();
const mcqController = require('../../controller/InterviewSchedule/AptitudeRoundController');

// Route to get all MCQs
AptitudeRoundRouter.get('/', mcqController.getAllMCQs);

// Route to create a new MCQ
AptitudeRoundRouter.post('/', mcqController.createMCQ);

// Route to update an existing MCQ
AptitudeRoundRouter.patch('/:id', mcqController.updateMCQ);

// Route to delete an MCQ
AptitudeRoundRouter.delete('/:id', mcqController.deleteMCQ);

module.exports = AptitudeRoundRouter;
