# Session Record: Asset-first map rework

- Time: 2026-07-27T13:52:32+08:00 Asia/Shanghai
- Window: 2026-07-27T13:40:16+08:00 Asia/Shanghai to 2026-07-27T13:52:32+08:00 Asia/Shanghai
- Previous Record: `.agent/records/2026-07-27T13-40-16+08-00-sites-hosting-config.md`
- Commit: self, recorded in the same commit as this file
- Branch: main
- Task: Fix the failed map and reorganize the product around listed companies, their road assets, and route-first map details.
- Source Sessions:
  - Harness: Codex
  - Evidence: current workspace `/Users/haha/aicode/useful/road_bridge`; user correction in current conversation.
  - Checked: current conversation, project docs, project memory, app source, lint/build/test output, browser open checks, HTTP content checks.
  - Used: user's explicit correction that the flow should be listed companies first, then company assets, then mapped assets; map page should be 2/3 map plus 1/3 selected route information; stock page should be a non-map asset list.
  - Unavailable: production Sites deployment still blocked by the previously recorded `git.chatgpt-team.site` 403.

## Outcome

- Reworked data model from route records carrying stock symbols into `ListedRoadCompany` plus `RoadAsset.ownerCompanyId`.
- Rebuilt the map page so the map occupies the left `2/3` and the right `1/3` is route detail only.
- Made the right panel default to an empty state until a road asset is selected.
- Added company filtering and route search on the map page without restoring a separate left sidebar.
- Added `/stocks/[symbol]` stock asset list pages without maps.
- Added route-to-stock links from road detail and stock-to-route links back to `/?asset=<assetId>`.
- Fixed the likely map failure: route drawing now waits for Leaflet initialization through a `mapReady` state instead of relying only on refs.
- Updated README, data model docs, project overview, experience notes, and rendered HTML tests.

Verification:

- `npm run lint` passed.
- `PATH="$HOME/.volta/tools/image/node/22.13.0/bin:$PATH" npm test` passed.
- Opened `http://localhost:3000/?asset=jiangsu-huning` and `http://localhost:3000/stocks/600377.SH` in Chrome.
- `curl` content checks confirmed default empty map detail and stock asset list rendering.

## Engineering Context

The project direction is now explicitly asset-first:

1. Maintain listed road-bridge companies.
2. Attach road and bridge assets to those companies.
3. Put the assets on the map.

Map detail is route-dimensional. Stock information appears only as a navigational link to a stock asset list page. The stock page does not include a map; it is an ownership/asset inventory view.

## Open Questions And Risks

- Current data remains sample / needs-source. Real route geometry and toll-right facts still require disclosure-backed ingestion.
- OpenStreetMap tile availability is still an external runtime dependency. If that remains unreliable in the user's environment, the next slice should add a non-tile fallback layer or switch to a controlled map tile source.
