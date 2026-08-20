const errorHandler = (err, req, res, next) => {

    console.error(err.stack);


    // Mongoose Validation Error
    if(err.name === "ValidationError"){

        const errors = Object.values(err.errors)
            .map(error => error.message);


        return res.status(400).json({
            success:false,
            message:"Validation Error",
            errors
        });

    }



    // Invalid MongoDB ObjectId
    if(err.name === "CastError"){

        return res.status(400).json({
            success:false,
            message:"Invalid ID format"
        });

    }



    // Duplicate Data Error
    if(err.code === 11000){

        return res.status(400).json({
            success:false,
            message:"Duplicate value already exists"
        });

    }



    // Default Error

    res.status(
        err.statusCode || 500
    )
    .json({

        success:false,

        message:
        err.message || "Server Error"

    });

};


module.exports = errorHandler;