import Model from "../model/quizModel.js";
import { getCache, setCache } from "../utility/cache.js";
import moment from "moment/moment.js";

let CACHE_TIME = 30000;



const createQuiz = async (req, res) => {
    try {
      let { question, options, rightAnswer, startDate, endDate } = req.body;

      startDate = moment(startDate).utc().format();
      endDate = moment(endDate).utc().format();

      console.log(startDate, endDate);

      const quiz = new Model({
        question,
        options,
        rightAnswer,
        startDate,
        endDate,
        status: 'inactive'
      });
  
      const createdQuiz = await quiz.save();
  
      res.status(201).json(createdQuiz);
    } catch (error) {
      console.error('Error creating quiz:', error);
      res.status(500).json({ message: 'Failed to create quiz' });
    }
  };
  

  const getActiveQuiz = async (req, res) => {
    try {

    const cacheKey = 'activeQuizes';

    let cachedData = await getCache(cacheKey);
    if( cachedData != null) { return res.json(cachedData); }


    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

      const activeQuiz = await Model.find({
        startDate: { $lte: now },
        endDate: { $gte: now }
      });
      
      console.log("active quize ",activeQuiz);
      if (activeQuiz == null | activeQuiz.length === 0) {
        res.status(404).json({ message: 'No active quiz found' });
      } else 
      {
        await setCache(cacheKey, activeQuiz, CACHE_TIME);
        return res.json(activeQuiz);
        
      }
    } catch (error) {
      console.error('Error retrieving active quiz:', error);
      res.status(500).json({ message: 'Failed to retrieve active quiz' });
    }
  };
  
  const getQuizResult = async (req, res) => {
    try {

        const Id = req.params.id;
        const cacheKey = Id;
        let cachedData = await getCache(cacheKey);
        if( cachedData != null) { return res.json(cachedData) }


  
        const quiz = await Model.findById(Id);

        console.log("all quize ", quiz)
  
        if (quiz == null || quiz.length === 0) {
          res.status(404).json({ message: 'Quiz not found' });
            
        } else {
            const result = quiz.options[quiz.rightAnswer - 1];
            await setCache(cacheKey, result, CACHE_TIME);
            return res.json({ result });
        }
    } catch (error) {
      console.error('Error retrieving quiz result:', error);
      res.status(500).json({ message: 'Failed to retrieve quiz result' });
    }
  };

  const getAllQuizzes = async (req, res) => {
    try{

      let cacheKey = 'allQuizzes';
      let cachedData = await getCache(cacheKey);
      if( cachedData != null) { return res.json(cachedData) }

      const result = await Model.find({});

        if(result == null | result.length === 0){
            res.status(404).json({ message: 'Quiz not found' });
            
        } else {

          await setCache(cacheKey, result, CACHE_TIME);
          return res.json(result);
        }
    } catch(err){
        console.log('Failed to retrieve quiz data: ',err);
        res.status(500).json({ message: 'Failed to retrieve quiz data' });
    }
  }
  
  export {
    createQuiz,
    getActiveQuiz,
    getQuizResult,
    getAllQuizzes
  };