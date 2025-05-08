const Account = require("../../../model/account.model");
const md5 = require('md5') ;
module.exports.login = async (req, res) => {
  const account = await Account.findOne({ loginName: req.body.loginName , delete : false });
  if (!account) {
    res.json({code : 400 , message : "Account is not exits" });
    return ;
  }
  if (account.password === md5(req.body.password)) {
    res.cookie("account_id" , account._id) ;
    res.json({code : 200 , message: "Login Success", token: account.token , account_id : account._id });
    // res.locals.loginName = req.body.loginName ;
  }

  else res.json({code : 400 , message : "Invalid Login Name or Password" });
};

module.exports.signup = async (req, res) => {
  try {
    const checkAccount = await Account.findOne({loginName : req.body.loginName , delete : false}) ;
    if (checkAccount) {
      res.json({code : 400 , message : "Account Already Exist" });
    }
    const account = new Account({
      loginName: req.body.loginName,
      password: md5(req.body.password),
    });
    await account.save();
    res.json({code : 200 , message: "Sign Up Success" });
  } catch {
    res.json({code : 400 , message: "Sign Up Failed" });
  }
};
