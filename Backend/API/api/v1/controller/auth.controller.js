const Account = require('../../../model/account.model') ;

module.exports.login = async (req,res) => {
    const account = await Account.findOne({loginName : req.body.loginName});
    if (account.password == req.body.password) {
        res.json({message : "Login Success", token : req.body.token});
    }
}

module.exports.signup = async (req,res) => {
    const account = new Account(req.body) ;
    await account.save() ;
    res.json({message : "Sign Up Success"})
}
