const db = require('../config/connection');
const {infoLoger,errorLoger,customLogger} = require('../logger');
const { v1: uuidv1 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { JWT_KEY } = process.env;

const jwt = require('../middleware/JWT');
const { singleRow } = require('../helper/common');
const promisePool=db.promise();
exports.getAllUsers=async()=> {
    try {
       
        const envkey=await bcrypt.hash("I have no fear", 10)
        console.log(envkey)
        const sql = "SELECT * FROM users";
        const [rows] = await db.promise().query(sql);
        //customLogger.info(`this is an info : ${rows}`)
        return rows.length > 0 ? {status:1,data:rows} : {status:0,msg:'no data found',data:[]};
    } catch (error) {
        customLogger.error(`this is an error : ${error}`)
        return []
    }
    
} 
//signup
exports.signUp=async(obj)=> {
   
    try {
        const result=await this.isUserExist(obj)
        console.log(result)
        if(result.status==1)
        {
            const email=obj.email.toLowerCase()
            const hashPassword=await bcrypt.hash(obj.password, saltRounds)
            const uuid=uuidv1();
            const inputArr=[uuid,obj.username,email,hashPassword,0]
            console.log(inputArr)
            const [user] = await promisePool.execute(
                "INSERT INTO users (UUID,user_name, email, password,role) VALUES (?,?,?,?,?)",
                inputArr,
            )         
            console.log("user",user)  
            // Create token
            const id=user.insertId;
        
            const token = await jwt.generateAccessToken(uuid);
            user.token = token;
            return {status:1,token:token,msg:'success'}
        }
        return result
      } catch (err) {
        customLogger.error(`this is an exception: ${err}`)
        return {status:0,msg:'internal error'}
      };   
    
    
} 

exports.isUserExist=async(obj)=> {
    try {
        const result={status:1}
        const sql = "SELECT id FROM users where email = ?";
        const [rows] = await db.promise().query(sql,[obj.email]);
        //customLogger.info(`this is an info : ${rows}`)
        if( rows.length > 0 )
        {
            return {status:-1,msg:"Email-id is already exist"}
        }
        const sql2 = "SELECT id FROM users where  user_name=?";
        const [rows2] = await db.promise().query(sql2,[obj.username]);
        if( rows2.length > 0 )
        {
            return {status:-1,msg:"Username is already exist"}
        }

        return result

    } catch (error) {
        customLogger.error(`this is an error : ${error}`)
        return {status:0}
    }
    
} 
exports.isValidUser=async(arg)=>{
    try {
     
        const sql = "SELECT uuid,user_name,email,password FROM users where email = ? limit 1";
        const [rows] = await db.promise().query(sql,[arg.email]);
        //customLogger.info(`this is an info : ${rows}`)      
        user = singleRow(rows)
        let obj={status:false}

        if(user.password)
        {
           
             obj.status = await bcrypt.compare(arg.password, user.password);
             if(obj.status)
             {
                obj.token = await jwt.generateAccessToken(user.uuid);
                delete user.password;
                obj.data = user
             }
             
           
        }

        return obj
        
    } catch (error) {
        customLogger.error(`this is an error isValidUser : ${error}`)
        return []
    }
}
// const uuidV1 = require('uuid/v1');
// uuidV1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a' 

// // Generate a v4 UUID (random) 
// const uuidV4 = require('uuid/v4');
// uuidV4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1' 