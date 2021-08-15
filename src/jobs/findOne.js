const jobs = [{"id":1, "name": "SDET role"},{"id":2, "name": "DEV role"},{"id":3, "name": "QA role"}];

module.exports.findOne = async(evt, context) => {
    const findOne = jobs.findIndex(i => i.id == evt.pathParameters.id)
    return {
        statusCode: 200,
        body: JSON.stringify(jobs[findOne])
    }
}