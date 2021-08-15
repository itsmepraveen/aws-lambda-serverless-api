const jobs = [{"id":1, "name": "SDET role"},{"id":2, "name": "DEV role"},{"id":3, "name": "QA role"}];

module.exports.createJobs = async(evt, context) => {
    console.log(evt.body)
    console.log(evt)
    jobs.push(JSON.parse(evt.body));
    return {
        statusCode: 200,
        body: JSON.stringify(jobs)
    }
}
