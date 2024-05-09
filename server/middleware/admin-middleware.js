const adminMiddleware = async (req, res, next) => {
    try {
        console.log("user is : ", req.user)
        const adminRole = req.user.isAdmin;
        console.log("admin role is : ", adminRole);
        //validation
        if (!adminRole) {
            return res.status(401).json({
                success: false,
                msg: "You are not authorized to perform this action"
            });
        }
        //return response
        // res.status(200).json({
        //     msg:'Authorized' 
        // });
        next();

    } catch (error) {
        console.log(err)
    }
}

module.exports = adminMiddleware;