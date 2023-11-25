/** @type {import('next').NextConfig} */

const branchName = process.env.GITHUB_PAGES ? "/myWorks" : "";

const nextConfig = {
    output: 'export',
    assetPrefix: branchName,
    basePath: branchName
}

module.exports = nextConfig
