import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [
          {
            type: String,
            required: true
          }
        ],
        validate: {
          validator: function (array) {
            return array.length === 4;
          },
          message: 'The options array must contain exactly four strings.'
        }
      },
      rightAnswer: {
        type: Number,
        min: 1,
        max: 4,
        required: true
      },
     startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        default: 'inactive',
        enum: ['inactive', 'active', 'finished']
      }

})

const Model = new mongoose.model("quizs", quizSchema);
export default Model;