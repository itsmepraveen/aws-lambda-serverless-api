const Joi = require('joi');
const dynamoDB = require('../dynamoDB');

module.exports.updateJob = async(evt, context) => {
    const data = JSON.parse(evt.body);
    const timestamp = new Date().getTime();
    const id = evt.pathParameters.id;

    const schema = Joi.object({
        id: Joi.string(),
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
        Key: {
            id
        },
        UpdateExpression:
            'SET title = :title, published = :published, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
            ':title': data.title,
            ':published': data.published,
            ':updatedAt': timestamp
        },
        ReturnValues: 'ALL_NEW'
    };
    try{
        const results = await dynamoDB.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(results.Attributes)
        }
    } catch(error){
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
};
