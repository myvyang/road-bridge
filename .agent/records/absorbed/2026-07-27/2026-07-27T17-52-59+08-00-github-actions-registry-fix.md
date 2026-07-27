# Session Record: Fix GitHub Actions npm registry

- Time: 2026-07-27T17:52:59+08:00 Asia/Shanghai
- Window: 2026-07-27T17:42:39+08:00 Asia/Shanghai to 2026-07-27T17:52:59+08:00 Asia/Shanghai
- Previous Record: `.agent/records/2026-07-27T17-42-39+08-00-github-pages-target.md`
- Commit: self, recorded in the same commit as this file
- Branch: main
- Task: Fix the first GitHub Pages workflow failure after switching deployment to GitHub Pages.
- Source Sessions:
  - Harness: Codex
  - Evidence: GitHub Actions run `30255152034` for `myvyang/road-bridge`.
  - Checked: GitHub Actions run status and build job log, local package lock, lint/test output.
  - Used: workflow log showing `npm ci` timed out fetching `lucide-react` from `registry.anpm.alibaba-inc.com`.
  - Unavailable: the rerun result for the fix is unavailable until this commit is pushed.

## Outcome

- Added `.npmrc` with `registry=https://registry.npmjs.org/`.
- Regenerated `package-lock.json` with public npm registry URLs.
- Recorded the GitHub Actions registry rule in project memory.

Verification:

- `PATH="$HOME/.volta/tools/image/node/22.13.0/bin:$PATH" npm run lint` passed.
- `PATH="$HOME/.volta/tools/image/node/22.13.0/bin:$PATH" npm test` passed.
- `rg` confirmed the lockfile no longer contains `registry.anpm.alibaba-inc.com`.

## Engineering Context

GitHub-hosted runners cannot rely on the user's internal npm mirror. Any committed lockfile resolved URL must be reachable from GitHub Actions, or `npm ci` may hang until network timeout.

## Open Questions And Risks

- The next GitHub Actions run still needs to be observed after push.
