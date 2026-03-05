
const validate = (schema) => (req, res, next) =>{
    const { error } = schema.validate(req.body);

    if(error){
        return res.status(400).json({error: error.details[0].massege});
    }

    next();
}

module.exports = validate;
