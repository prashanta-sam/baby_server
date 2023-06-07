
const Validator = require('validatorjs');
const { errorLoger } = require('../logger');
const Rules = require('../config/rules.json')
const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};
exports.validate = (ruleFor) => { 
  
    return async (req, res, next) => {
        try {
            console.log(req.body);
            console.log('received the widget request');
 
                await validator(req.body, Rules[ruleFor], {}, (err, status) => {
                    if (!status) {                     
                        res.status(200)
                            .send({
                                status: 0,
                                msg:this.getErrorMsg(err),
                                err:err.errors
                            });
                    } else {
                        next();
                    }
                }).catch((err)=>{
                    errorLoger.error('Request validation/Rules error '+err)
                })
        }
        catch (error) {
            next(error)
        }
    }
}

exports.getErrorMsg=(err)=>{

    const {errors}=err;
    let msg=""
    for(let [k,v] of Object.entries(errors))
    {
        
        msg=v.toString();
        break;
    }
   
    return msg.replace(',',' and ').replace('.','')+"";
}
