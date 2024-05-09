const erroMiddleware = (err, req, res, next) => {
    try{
         const status = err.status || 500;
        const message = err.message || "BACKEND ERROR";
        const extraDetails = err.extraDetails || "Error form backend";
    
        return res.status(status).json({
            message,
            extraDetails
        });
    }
    catch (err){
        console.log(err)
};

module.exports = erroMiddleware;
