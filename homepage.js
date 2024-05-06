const fs = require('fs');

// Get the commit hash
const commitHash = process.env.COMMIT_HASH;

// Set the homepage
const homepage = commitHash ? `reblie-admin-s3/${commitHash}/` : '/';

// Read package.json
const packageJsonPath = './package.json';
const packageJson = require(packageJsonPath);

// Update homepage field
packageJson.homepage = homepage;

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
