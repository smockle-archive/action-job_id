# action-job_id

An action which outputs the identifier of a specified workflow-run’s job.

## Inputs

### `job_index`

**Optional** The index of the job whose identifier will be output. Defaults to the first job. Default: `0`

## Environment Variables

### `GITHUB_TOKEN`

**Required** A token to authenticate on behalf of the GitHub App installed on your repository.

### `GITHUB_REPOSITORY`

**Required** The owner and repository name. For example, `smockle/action-job_id`.

### `GITHUB_RUN_ID`

**Required** A unique number for each run within a repository. This number does not change if you re-run the workflow run.

## Outputs

### `job_id`

The job identifier retrieved by this action

## Example usage

```YAML
- id: retrieve_job_id
  name: Retrieve 'job_id'
  uses: "smockle/action-job_id@master"
  with:
    job_index: 0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    GITHUB_REPOSITORY: ${{ github.repository }}
    GITHUB_RUN_ID: ${{ github.run_id }}

- name: Print 'job_id'
  run: |
    echo ${{ steps.retrieve_job_id.outputs.job_id }}
```
