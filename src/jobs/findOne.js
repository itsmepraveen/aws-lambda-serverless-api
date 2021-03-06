const dynamoDB = require('../dynamoDB');

module.exports.findOne = async(evt, context) => {
    const id = evt.pathParameters.id;

    try {
        const data = await dynamoDB
        .get({
            TableName: process.env.JOBS_TABLE,
            Key: {
                id
            }
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };
    } catch(err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }  
}