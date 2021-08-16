const dynamoDB = require('../dynamoDB');

module.exports.listJobs = async(evt, context) => {
try {
    const data = await dynamoDB.scan({
        TableName: process.env.JOBS_TABLE
    }).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
} catch(err) {
    return {
        statusCode: 500,
        body: JSON.stringify(err)
    };
}    
};