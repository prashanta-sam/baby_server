

const UserModel = require('../models/UserModel');
const Rules = require('../config/rules.json')
exports.getUser=async(req,res)=>{

   // console.log(Rules['user'])
    const input=req.body;
    const data=await UserModel.getAllUsers(input);
    res.json({status:1,data:data})
}

exports.signUp=async(req,res)=>{      
    const obj=req.body;

    const data=await UserModel.signUp(obj);   
    return res.json(data)
}
exports.signIn=async(req,res)=>{      
   try {
        const { email, password } = req.body;     
        const user = await UserModel.isValidUser({ email, password });
        console.log(user)
        if (user.status) 
        {
          
          res.json({
            status:1,
            data:user.data,
            token: `Bearer ${user.token}`,
          });
        } 
        else
        {
          res.json({
            status:0,
            token: ``,
            msg:"Invalid email or password"
          });
        }
   } catch (error) 
   {
        res.json({
          status:0,
          token: `Internal error`,
        });
   }
   
}