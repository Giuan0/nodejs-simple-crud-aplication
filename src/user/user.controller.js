const userController = require('./user.dba');

exports.create = async (req, res)=>{
    const user = {
        name: req.body.name,
        email   : req.body.email,
        password: req.body.password,
        phone   : req.body.phone,
        registrationDate: Date.now(),
        addresses: req.body.addresses
    }

    if(!user.name)//400 stands for inválid request, https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
        return res.status(400).json({data: "'name' field is required.", code: 400});
    if(!user.email)
        return res.status(400).json({data: "'email' field is required.", code: 400});
    if(!user.password)
        return res.status(400).json({data: "'password' field is required.", code: 400});
    
    try{
        const result = await userController.create(user);
        return res.status(result.code).json(result);
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err.toString(), code: 500 });
    }
}

exports.login = async(req, res)=>{

    const [email, password] = [req.body.email, req.body.password] 

    if(!email)
        return res.status(400).json({data: "'email' field is required.", code: 400});
    if(!password)
        return res.status(400).json({data: "'password' field is required.", code: 400});
    
    try{
        const result = await userController.login(email, password);
        return res.status(result.code).json(result);
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: err.toString(), code: 500 });
    }

}

exports.getById = async(req, res)=>{
    const userId = req.params.userId;

    if(!userId)
        return res.status(400).json({data: "userId param is required", code: 400});
    
    try{
        const result = await userController.getById(userId);
        return res.status(result.code).json(result);
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: err.toString(), code: 500 });
    }

}

exports.getAll = async(req, res)=>{
    
    try{
        const result = await userController.getAll();
        return res.status(result.code).json(result);
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: err.toString(), code: 500 });
    }

}

exports.getByEmail = async(req, res)=>{
    const email = req.params.email;

    if(!email)
        return res.status(400).json({data: "email param is required", code: 400});
    
    try{
        const result = await userController.getByEmai(email);
        return res.status(result.code).json(result);
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: err.toString(), code: 500 });
    }

}

exports.putById = async(req, res)=>{
    const userId = req.params.userId;
    const update = req.body;

    if(!userId)
        return res.status(400).json({data: "userId param is required", code: 400});
    if(!update)
        return res.status(400).json({data: "some user fields are required", code: 400});
    
    try{
        const result = await userController.putById(userId, update);
        return res.status(result.code).json(result);
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: err.toString(), code: 500 });
    }

}

exports.removeById = async(req, res)=>{
    const userId = req.params.userId;

    if(!userId)
        return res.status(400).json({data: "userId param is required", code: 400});
    
    try{
        const result = await userController.removeById(userId);
        return res.status(result.code).json(result);
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: err.toString(), code: 500 });
    }

}