const Products = require('../models/products');


exports.getAllProduct=async(req,res)=>{


    const data=await Products.findAll();
    res.json(data);

}
exports.postProduct=async(req,res)=>{
    const obj=req.body;
    const data=await Products.create({...obj,isPublished:false})
    res.status(201).send(data)
    
}
exports.getProductById=async(req,res)=>{
    const id=req.params.id;
    const payload=req.body;
    console.log(id)
    console.log("payload")
    console.log(payload)
    let error=[];

    const exist=await Products.findOne({where : { id: id}})
    console.log("exist")
    console.log(exist.mrp)
    if(exist && exist.mrp < exist.price)
    {
        error.push('MRP should be less than equal to the Price');
     
    }
    if(exist && exist.stock <=0)
    {
        error.push('Stock count is 0');
     
    }
    if(error.length > 0)
    {
        res.status(422).send(error)
    }
    else
    {       
        const update=await Products.update(req.body,{ where : {id:id}})
        res.status(204)
    }
   
  
}

exports.putProductById=(req,res)=>{
    console.log("req.params.id")
    console.log(req.params.id)
    res.status(405)
}

exports.deleteProductById=(req,res)=>{
    res.status(405)
}
