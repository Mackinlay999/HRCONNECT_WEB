const mongoose = require("mongoose");
const mongoosePaginate = require("../utility/mongoosePaginate")
const questionSchema = new mongoose.Schema(
  {
    assessment: {
      type: mongoose.Types.ObjectId,
      ref: "assessment",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        answer: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
          default: false,
        },
        _id: false,
      },
    ],
    codeSnippet: {
      code: String,
      language: String,
    },
  },
  { timestamps: true }
);

questionSchema.plugin(mongoosePaginate);
const questionCollection = mongoose.model("questions", questionSchema);

module.exports = questionCollection;
