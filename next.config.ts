import type { NextConfig } from "next";

const githubPagesBasePath = process.env.GITHUB_PAGES_BASE_PATH ?? "/road-bridge";
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  ...(isGithubPagesBuild
    ? {
        assetPrefix: githubPagesBasePath,
        basePath: githubPagesBasePath,
        output: "export" as const,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
