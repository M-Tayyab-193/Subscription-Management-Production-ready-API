import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
   
    const decision = await aj.protect(req, { requested: 1});
    console.log('Arcjet decision:', decision.reason);
    if(decision.isDenied()){
        if(decision.reason.isRateLimit()){
            return res.status(429).json({
              success: false,
              message: 'Rate limit exceeded. Please try again later.'
            });
        }
        if(decision.reason.isBot()){
            return res.status(403).json({
              success: false,
              message: 'Request blocked due to bot detection.',
              error: decision.reason.message
            });
        }
        return res.status(403).json({
          success: false,
          message: 'Access denied',
          error: decision.reason.message
        });
    } 

    next();
  } catch (error) {
    console.error('Arcjet middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

export default arcjetMiddleware;