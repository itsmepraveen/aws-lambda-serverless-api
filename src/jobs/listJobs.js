const jobs = [{"id":1, "name": "SDET role"},{"id":2, "name": "DEV role"},{"id":3, "name": "QA role"}];

module.exports.listJobs = async(evt, context) => {

    return {
        statusCode: 200,
        body: JSON.stringify(jobs)
    }
}