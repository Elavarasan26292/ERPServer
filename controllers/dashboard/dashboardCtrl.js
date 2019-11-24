module.exports = {
    simpleSessionTest:((req,res,next) =>{
        res.json({
            status:true,
            message:"session_passed_enjoy_your_data"
        })
    })
}