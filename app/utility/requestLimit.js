import { rateLimit } from "express-rate-limit";


const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100, 

    message: 'Too many requests from this IP, please try again later',
    handler: (req, res) => {
      // Custom handling when the limit is exceeded
      res.status(429).json({ error: 'Rate limit exceeded' });
    }
  });

export default limiter;