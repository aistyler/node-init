const { Octokit } = require("octokit");
const path = require("path");
const fs = require('fs');

const { download } = require("./download");

const octokit = new Octokit({
  userAgent: "node-init"
});

function _parseRepoUrl(repoUrl) {
  // github:user/repo[/branch]
  let res = repoUrl.split("/");
  if (res.length > 3 || res.length < 2) return null;

  const owner = res[0].split(":");
  if (owner.length > 2) return null;
  const repo = res[1];
  const ref = res.length === 3 ? res[2]:"main";
  return {
    server: owner.length === 2 ? owner[0] : "github",
    owner: owner.length === 1 ? owner[0] : owner[1],
    repo,
    ref,
  };
}

function _makeDownloadUrl(repoInfo, blob) {
  return `https://raw.githubusercontent.com/${repoInfo.owner}/${repoInfo.repo}/${repoInfo.ref}/${blob.path}`;
}

async function _downloadBlobsInTree(repoInfo, tree, {outdir, force}) {
  /*
  BLOB(Binary Large Object) item:
    {
      path: '.gitignore',
      mode: '100644',
      type: 'blob',
      sha: '67045665db202cf951f839a5f3e73efdcfd45021',
      size: 1610,
      url: 'https://api.github.com/repos/aistyler/node-init/git/blobs/67045665db202cf951f839a5f3e73efdcfd45021'
    },
  */
  const toBeDownloaded = tree.filter((e) => e.mode !== "040000" && (force || !fs.existsSync(path.join(outdir, e.path))));
  const promiseAll = toBeDownloaded.map((item) => {
    const filePath = path.join(outdir, item.path);
    return download(_makeDownloadUrl(repoInfo, item), {
      path: filePath,
    });
  });
  return await Promise.all(promiseAll);
}

async function downloadFromGithub(repoUrl, options) {
  const repoInfo = _parseRepoUrl(repoUrl);
  if (!repoInfo) {
    console.error("!!! Invalid repo information,", repoUrl);
    console.error("!!! Expected format: {owner-id}/{repo-name}/{branch-name}");
    return;
  }

  let branchInfo;
  try {
    branchInfo = await octokit.rest.git.getRef({
      accept: "application/vnd.github.v3+json",
      ...repoInfo,
      ref: `heads/${repoInfo.ref}`,
    });
  } catch (e) {
    console.error(`!!! Failed to retrieve the information of the branch:`, e.message);
    console.error(`!!! Parsed repo info: "${repoInfo.ref}" in "${repoInfo.owner}/${repoInfo.repo}"`);
    return;
  }
  console.log("sha of target branch:", branchInfo.data.object.sha);

  let treeInfo;
  try {
    treeInfo = await octokit.rest.git.getTree({
      accept: "application/vnd.github.v3+json",
      ...repoInfo,
      tree_sha: branchInfo.data.object.sha,
      recursive: "true",
    });
  } catch (e) {
    console.error(`!!! Failed to retrieve the tree info from github:`, e.message);
    return;
  }
  const toBeDownloaded = treeInfo.data.tree.filter((e) => e.mode !== "040000");
  console.log("# of files to be downloaded:", toBeDownloaded.length);

  try {
    const res = await _downloadBlobsInTree(repoInfo, toBeDownloaded, options);
    console.log("# of files downloaded:", res.length);
    //console.log(res);
  } catch (e) {
    console.error(`!!! Failed to downlaod files from github:`, e.message);
  }
}

module.exports = {
  downloadFromGithub,
};
