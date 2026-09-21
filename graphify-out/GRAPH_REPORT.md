# Graph Report - heavy-clone  (2026-09-21)

## Corpus Check
- 4 files · ~81,079 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 60 nodes · 71 edges · 6 communities (5 shown, 1 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9968e58e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]

## God Nodes (most connected - your core abstractions)
1. `✨ Features & Architecture` - 12 edges
2. `Himanshi Parihar — Heavy Branding Studio Portfolio` - 8 edges
3. `Himanshi Parihar Portfolio — System Architecture & Graphify Knowledge Graph` - 6 edges
4. `3. Subsystem Architecture Deep-Dives` - 5 edges
5. `renderProjects()` - 4 edges
6. `kimiScroller` - 3 edges
7. `openProjectModal()` - 3 edges
8. `displayProjectInModal()` - 3 edges
9. `📁 Repository Structure` - 3 edges
10. `initScrollAnimations()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Subsystem 4: Batch Layout Injection & Modal Case Study Engine` --implements--> `openProjectModal()`  [INFERRED]
  PORTFOLIO_SYSTEM_ARCHITECTURE.md → js/portfolio-engine.js
- `4. Interactive Project Case Studies & Products Showcase` --renders--> `renderProjects()`  [INFERRED]
  README.md → js/portfolio-engine.js
- `Subsystem 2: 120Hz Hardware Acceleration & Paint Containment` --implements--> `kimiScroller`  [INFERRED]
  PORTFOLIO_SYSTEM_ARCHITECTURE.md → js/portfolio-engine.js
- `1. Buttery Smooth Inertial Momentum Scrolling` --executes--> `kimiScroller`  [INFERRED]
  README.md → js/portfolio-engine.js
- `Subsystem 1: CLICK TO MEET Badge Continuous Scroll Physics` --implements--> `initClickBadgeScroll()`  [INFERRED]
  PORTFOLIO_SYSTEM_ARCHITECTURE.md → js/portfolio-engine.js

## Communities (6 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.20
Nodes (9): 4. Interactive Project Case Studies & Products Showcase, displayProjectInModal(), filterProjects(), handleFormSubmit(), initScrollAnimations(), navigateProject(), openProjectModal(), renderProjects() (+1 more)

### Community 1 - "Community 1"
Cohesion: 0.18
Nodes (12): Clustered Functional Communities, code:bash (# Clone the repository), code:powershell (# Open the interactive 3D/2D physics graph in Chrome / Edge), code:block3 (├── index.html                   # Main long-scrolling portf), 🎨 Credits & Colophon, 🔍 Exploring the Graphify Knowledge Graph, 🚀 Getting Started, 🔍 Graphify Cluster View (Rendered on GitHub) (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.20
Nodes (10): 1. CLICK TO MEET Badge Continuous Scroll Physics, 2. Buttery Smooth Inertial Momentum Scrolling, 2. GPU Hardware Acceleration & Paint Containment, 3. GPU Hardware Acceleration & Paint Containment, 3. Progressive Skeleton Shimmer & Blur-Up Image Pipeline, 4. Progressive Skeleton Shimmer & Blur-Up Image Pipeline, 5. Glittering & Color-Changing "LET'S TALK ✨" Button, 5. Interactive Project Case Studies & Products Showcase (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.20
Nodes (10): 1. Graphify Knowledge Graph Summary, 2. Clustered Functional Communities, 4. End-to-End User Interaction Flow, 5. Exploring the Knowledge Graph via CLI, code:block1 (Graphify Topology Metrics:), code:mermaid (flowchart TD), code:mermaid (sequenceDiagram), code:powershell (# Open the interactive 3D/2D physics graph in Chrome / Edge) (+2 more)

### Community 8 - "Community 8"
Cohesion: 0.22
Nodes (9): 3. Subsystem Architecture Deep-Dives, Subsystem 1: CLICK TO MEET Badge Continuous Scroll Physics, Subsystem 2: 120Hz Hardware Acceleration & Paint Containment, Subsystem 3: Progressive Skeleton Shimmer & Blur-Up Pipeline, Subsystem 4: Batch Layout Injection & Modal Case Study Engine, 1. Buttery Smooth Inertial Momentum Scrolling, initClickBadgeScroll(), kimiScroller (+1 more)

## Knowledge Gaps
- **18 isolated node(s):** `code:block1 (Graphify Topology Metrics:)`, `code:mermaid (flowchart TD)`, `code:mermaid (sequenceDiagram)`, `code:powershell (# Open the interactive 3D/2D physics graph in Chrome / Edge)`, `🔍 Graphify Cluster View (Rendered on GitHub)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Himanshi Parihar — Heavy Branding Studio Portfolio` connect `Community 1` to `Community 2`, `Community 6`?**
  _High betweenness centrality (0.425) - this node is a cross-community bridge._
- **Why does `✨ Features & Architecture` connect `Community 2` to `Community 8`, `Community 1`, `Community 0`?**
  _High betweenness centrality (0.329) - this node is a cross-community bridge._
- **Why does `Himanshi Parihar Portfolio — System Architecture & Graphify Knowledge Graph` connect `Community 7` to `Community 8`, `Community 6`?**
  _High betweenness centrality (0.308) - this node is a cross-community bridge._
- **What connects `Automated Graphify Knowledge Graph Synchronizer. Runs on code updates to re-extr`, `code:block1 (Graphify Topology Metrics:)`, `code:mermaid (flowchart TD)` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._