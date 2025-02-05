
const login = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const { email, password, role } = req.body;
    const result = await userModel.find({ role: role });
    let passwordMatch = false;
    let emailMatch = false;
    let data = null;
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].email === email) {
          emailMatch = true;
          if (result[i].password === password) {
            passwordMatch = true;
            data = result[i];
            break;
          }
        }
      }
      if (emailMatch && passwordMatch) {
        res.status(200).json({
          status: true,
          message: "Login success",
          data: data,
        });
      } else if (!emailMatch) {
        res.status(200).json({
          status: false,
          message: "No such user exists",
        });
      } else if (emailMatch && !passwordMatch) {
        res.status(200).json({
          status: false,
          message: "Password does not match",
        });
      }
    } else {
      res.status(200).json({
        status: false,
        message: "Role not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,ssssssssssssssssssssssssssssssssssssss
    });
  }
};

module.exports = {
  login,
};
