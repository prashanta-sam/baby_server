
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
exports.generateAccessToken=async (uuid)=>{
      console.log("uuid ",uuid)
      return jwt.sign({ uuid }, JWT_KEY, { expiresIn: "1800s", });
}

exports.validateToken=(req, res, next)=> {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
    
      if (token == null) return res.json({code: 401,status:0,msg:'no token'});
    
      jwt.verify(token,JWT_KEY, (err, decoded) => {
        if (err) return res.json({code: 403,status:0,msg:'invalid token'});
        req.tokenData = decoded;
        console.log(decoded)
        next();
      });
    }