#!/usr/bin/env node
// @ts-check

const core = require("@actions/core");
const github = require("@actions/github");

(async () => {
  try {
    // Retrieve token and use it to construct an authenticated REST API client
    const token = process.env.GITHUB_TOKEN;
    core.debug(
      !!token ? "Retrieved a GitHub token" : "Failed to retrieve a GitHub token"
    );
    const octokit = new github.GitHub(token);

    // Retrieve request data and make a request for jobs
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    const run_id = Number(process.env.GITHUB_RUN_ID);
    core.debug(
      `Finding jobs for run ${run_id} in repository ${owner}/${repo}.`
    );
    const { data } = await octokit.actions.listJobsForWorkflowRun({
      owner,
      repo,
      run_id,
    });

    // Retrieve the identifier of the specified job
    const jobIndex = core.getInput("job_index") || 0;
    core.debug(`Retrieving identifier for job at index ${jobIndex}.`);
    const job_id =
      data && data.jobs && data.jobs[jobIndex] && data.jobs[jobIndex].id;
    console.log(`Retrieved 'job_id': ${job_id}`);
    core.setOutput("job_id", job_id);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
