import nodeCorn from "node-cron";
import Model from "../model/quizModel.js";
import moment from "moment-timezone";


const script = nodeCorn.schedule("*/30 * * * * *", async () => {
  try {
    
    const now = moment().tz('Asia/Kolkata').toDate();

    const activeQuizzes = await Model.find({
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).exec();

    
    activeQuizzes.forEach(async (quiz) => {
      quiz.status = "active";

      console.log(' quiz got updated ');
      await quiz.save();
      
    });

    const finishedQuizzes = await Model.find({
      endDate: { $lt: now },
    }).exec();

    // console.log(finishedQuizzes)
    finishedQuizzes.forEach(async (quiz) => {
      quiz.status = "finished";
      await quiz.save();
    });
  } catch (error) {
    console.error("Error in cron job:", error);
    console.log("error: ", error)
  }
})

export default script;