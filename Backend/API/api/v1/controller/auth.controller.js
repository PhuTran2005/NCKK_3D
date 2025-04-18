const Account = require("../../../model/account.model");

module.exports.login = async (req, res) => {
  const account = await Account.findOne({ loginName: req.body.loginName });
  if (account.password == req.body.password) {
    res.json({code : 200 , message: "Login Success", token: req.body.token });
  }
  else res.json({code : 400 , message : "Invalid Login Name or Password" });
};

module.exports.signup = async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save();
    res.json({code : 200 , message: "Sign Up Success" });
  } catch {
    res.json({code : 400 , message: "Sign Up Failed" });
  }
};
