const errorMiddleware = (err, req,res,next) => {
      try{
          let error = {...err};
          error.message = err.message;
          console.log(err);

          if(err.name == 'CastError'){
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
          }

          if(err.code == 11000){
            const message = "uplicate field value entered";
            error = new Error(message);
            err.statusCode = 400;
          }

          if(err.anme == 'ValidationError'){
            const message = Object.values(err.errors).map(val=> val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
          }

          res.status(error.statusCode || 500).json({success: false, error: error.message || 'Server Error'});

      }
      catch(error){
        next(error);
      }
} 
export default errorMiddleware;