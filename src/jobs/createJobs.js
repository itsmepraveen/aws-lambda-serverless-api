const Joi = require('joi');
const dynamoDB = require('../dynamoDB');

module.exports.createJobs = async(evt, context) => {
    const data = JSON.parse(evt.body);
    const timestamp = new Date().getTime();
   
    const schema = Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
        published: Joi.boolean().required() 
    });

    const { error, value } = schema.validate(data);
    if(error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error.details)
        }
    }

    const params = {
        TableName: process.env.JOBS_TABLE,
        Item: {
            id: data.id,
            title: data.title,
            published: data.published,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    };
    try{
        await dynamoDB.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        }
    } catch(error){
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}
