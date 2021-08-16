const dynamoDB = require('../dynamoDB');

module.exports.deleteOne = async(evt, context) => {
    const id = evt.pathParameters.id;

    try {
        const data = await dynamoDB
        .delete({
            TableName: process.env.JOBS_TABLE,
            Key: {
                id
            }
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({msg:`Job with ID: ${id} has been deleted successfully`})
        };
    } catch(err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }  
}