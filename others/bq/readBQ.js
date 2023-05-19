const { BigQuery } = require('@google-cloud/bigquery');

function createClient(projectId) {
    const bigquery = new BigQuery({
        projectId
    });
    return bigquery;
}

async function runQuery(client, query, priority = 'INTERACTIVE') {
    const queryJobConfig = {
        query,
        priority: priority,
        useLegacySql: false
    };
    const jobConfig = {
        configuration: {
            query: queryJobConfig,
        },
    };
    const [ job ] = await client.createJob(jobConfig);
    return job.id;
}

async function awaitJobCompletion(client, jobId) {
    return new Promise((resolve, reject) => {
        const job = client.job(jobId);
        job.on('complete', () => {
            resolve(job);
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function getQueryResults(bqJob, pageToken, maxResults = 5000) {
    return await bqJob.getQueryResults({ maxResults: maxResults, pageToken });
}

async function* fetch(projectId, query, options) {
    const client = createClient(projectId);
    const jobId = await runQuery(client, query, options.priority);
    const job = await awaitJobCompletion(client, jobId);
    
    let pageToken = null;
    do {
        const result = await getQueryResults(job, pageToken, options.maxResults);
        pageToken = result?.[1]?.pageToken;
        yield result[0];
    } while (pageToken);

}

async function run(projectId, query, options) {
    if (!projectId || !query) {
        throw new Error('Required values not present')
    }
    const dataStream = fetch(projectId, query, options);
    for await (const data of dataStream) {
        // DO WORK
    }
    console.log('READ ALL');
}

// run('projectId', 'select * from t', { maxResults: 10000, priority: 'BATCH' });

// 1. make sure that GOOGLE_APPLICATION_CREDENTIALS path is set before running the script
// 2. RUN npm i
// 3. Set variabes in the run method
// 4. Complete the fetch method with your work
// 5. RUN npm run read