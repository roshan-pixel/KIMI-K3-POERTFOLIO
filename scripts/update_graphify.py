"""
Automated Graphify Knowledge Graph Synchronizer.
Runs on code updates to re-extract AST, update community clusters, generate interactive HTMLs,
callflows, trees, and export high-resolution visual cluster images (graph.png & graph.svg).
"""
import json
import os
import re
import shutil
import sys
from pathlib import Path

def main():
    root = Path(__file__).resolve().parent.parent
    os.chdir(root)
    print("[graphify-sync] Updating Graphify Knowledge Graph for Heavy Studio Portfolio...")

    # 1. Run graphify update
    try:
        from graphify.watch import _rebuild_code
        _rebuild_code(root, force=True)
    except Exception as e:
        print(f"[graphify-sync] Rebuild code failed: {e}")

    out_dir = root / "graphify-out"
    out_dir.mkdir(exist_ok=True)
    graph_file = out_dir / "graph.json"

    # 2. Add high-level semantic cross-references between Architecture, Engine, and README
    if graph_file.exists():
        try:
            data = json.loads(graph_file.read_text(encoding="utf-8"))
            existing_links = {(e["source"], e["target"]) for e in data.get("links", [])}
            
            inferred_links = [
                ("readme_md", "portfolio_system_architecture_md", "references_architecture"),
                ("portfolio_system_architecture_md", "js_portfolio_engine_js", "documents_engine"),
                ("heavy_clone_portfolio_system_architecture_subsystem_1_click_to_meet_badge_continuous_scroll_physics", "js_portfolio_engine_initclickbadgescroll", "implements"),
                ("heavy_clone_portfolio_system_architecture_subsystem_2_120hz_hardware_acceleration_paint_containment", "js_portfolio_engine_kimiscroller", "implements"),
                ("heavy_clone_portfolio_system_architecture_subsystem_3_progressive_skeleton_shimmer_blur_up_pipeline", "js_portfolio_engine_onproductimageloaded", "implements"),
                ("heavy_clone_portfolio_system_architecture_subsystem_4_batch_layout_injection_modal_case_study_engine", "js_portfolio_engine_openprojectmodal", "implements"),
                ("heavy_clone_readme_1_buttery_smooth_inertial_momentum_scrolling", "js_portfolio_engine_kimiscroller", "executes"),
                ("heavy_clone_readme_4_interactive_project_case_studies_products_showcase", "js_portfolio_engine_renderprojects", "renders"),
                ("scripts_update_graphify_py", "portfolio_system_architecture_md", "synchronizes"),
            ]
            
            node_ids = {n["id"] for n in data.get("nodes", [])}
            added = 0
            for src, tgt, rel in inferred_links:
                if src in node_ids and tgt in node_ids and (src, tgt) not in existing_links:
                    data.setdefault("links", []).append({
                        "source": src,
                        "target": tgt,
                        "relation": rel,
                        "confidence": "INFERRED",
                        "source_file": "PORTFOLIO_SYSTEM_ARCHITECTURE.md",
                        "source_location": "L1",
                        "weight": 1.0,
                        "confidence_score": 0.88
                    })
                    existing_links.add((src, tgt))
                    added += 1
            
            if added > 0:
                graph_file.write_text(json.dumps(data, indent=2), encoding="utf-8")
                print(f"[graphify-sync] Linked {added} cross-subsystem architectural bridges")
        except Exception as e:
            print(f"[graphify-sync] Edge enhancement note: {e}")

    # 3. Rebuild Tree HTML
    try:
        from graphify.tree_html import write_tree_html
        tree_out = out_dir / "GRAPH_TREE.html"
        if graph_file.exists():
            write_tree_html(graph_file, tree_out)
            print("[graphify-sync] GRAPH_TREE.html updated")
    except Exception as e:
        print(f"[graphify-sync] Tree build failed: {e}")

    # 4. Rebuild Callflow HTML
    try:
        from graphify.callflow_html import write_callflow_html
        callflow_out = out_dir / "heavy-clone-callflow.html"
        write_callflow_html(project=root, output=callflow_out)
        print("[graphify-sync] Callflow HTML updated")
    except Exception as e:
        print(f"[graphify-sync] Callflow build failed: {e}")

    # 5. Copy to root and graphify/ for direct static hosting
    if (out_dir / "graph.html").exists():
        shutil.copy2(out_dir / "graph.html", root / "graph.html")
        (root / "graphify").mkdir(exist_ok=True)
        shutil.copy2(out_dir / "graph.html", root / "graphify" / "index.html")

    if (out_dir / "heavy-clone-callflow.html").exists():
        shutil.copy2(out_dir / "heavy-clone-callflow.html", root / "callflow.html")

    if (out_dir / "GRAPH_TREE.html").exists():
        shutil.copy2(out_dir / "GRAPH_TREE.html", root / "tree.html")

    # 6. Export high-res graph.png and graph.svg
    try:
        import networkx as nx
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        import matplotlib.patches as mpatches
        from graphify.build import build_from_json
        from graphify.export import COMMUNITY_COLORS, _node_community_map

        labels_file = out_dir / ".graphify_labels.json"

        if graph_file.exists():
            extraction = json.loads(graph_file.read_text(encoding="utf-8"))
            labels_raw = json.loads(labels_file.read_text(encoding="utf-8")) if labels_file.exists() else {}

            G = build_from_json(extraction)
            communities = {}
            for n in extraction.get("nodes", []):
                c = n.get("community", -1)
                if c >= 0:
                    communities.setdefault(c, []).append(n["id"])

            community_labels = {
                0: "Badge Physics & Scroll Engine",
                1: "Project Repository & Setup",
                2: "GPU Acceleration & Features",
                3: "Modal Lightbox & Navigation",
                4: "Masonry Grid & Reveal Observers",
                5: "Utilities & Feedback Controllers",
                6: "Automated Graphify Pipeline",
                7: "System Architecture Subsystems",
                8: "Interaction Flow & Diagrams",
                9: "CLI Tools & Traversal"
            }
            if labels_raw:
                for k, v in labels_raw.items():
                    community_labels[int(k)] = v

            for n in G.nodes():
                lbl = G.nodes[n].get("label", str(n))
                clean_lbl = re.sub(r"[^\x00-\x7F]+", "", lbl).strip()
                G.nodes[n]["clean_label"] = clean_lbl if clean_lbl else str(n)

            node_community = _node_community_map(communities)

            fig, ax = plt.subplots(figsize=(26, 17), facecolor="#0a0a0f")
            ax.set_facecolor("#0a0a0f")
            ax.axis("off")

            pos = nx.spring_layout(G, seed=42, k=1.4 / (G.number_of_nodes() ** 0.5 + 1), iterations=120)
            degree = dict(G.degree())
            max_deg = max(degree.values(), default=1) or 1

            node_colors = [COMMUNITY_COLORS[node_community.get(n, 0) % len(COMMUNITY_COLORS)] for n in G.nodes()]
            node_sizes = [500 + 1700 * (degree.get(n, 1) / max_deg) for n in G.nodes()]

            for u, v, data in G.edges(data=True):
                conf = data.get("confidence", "EXTRACTED")
                style = "solid" if conf == "EXTRACTED" else "dashed"
                alpha = 0.55 if conf == "EXTRACTED" else 0.35
                color = "#ff4081" if conf == "EXTRACTED" else "#38bdf8"
                width = 1.3 if conf == "EXTRACTED" else 1.6
                x0, y0 = pos[u]
                x1, y1 = pos[v]
                ax.plot([x0, x1], [y0, y1], color=color, linewidth=width, linestyle=style, alpha=alpha, zorder=1)

            nx.draw_networkx_nodes(G, pos, ax=ax, node_color=node_colors, node_size=node_sizes, alpha=0.95, edgecolors=(1.0, 1.0, 1.0, 0.7), linewidths=1.5)
            labels_dict = {n: G.nodes[n]["clean_label"][:26] for n in G.nodes()}
            nx.draw_networkx_labels(G, pos, ax=ax, labels=labels_dict, font_size=8.5, font_color="#ffffff", font_weight="bold")

            patches = [
                mpatches.Patch(
                    color=COMMUNITY_COLORS[cid % len(COMMUNITY_COLORS)],
                    label=f"{community_labels.get(cid, f'Community {cid}')} ({len(communities.get(cid, []))})",
                )
                for cid, nodes in sorted(communities.items())
                if len(nodes) > 0
            ]
            ax.legend(handles=patches, loc="upper left", framealpha=0.94, facecolor="#14141e", edgecolor="#2e2e42", labelcolor="#ffffff", fontsize=10.5, title="Graphify Clustered Communities", title_fontsize=12)

            plt.title("Himanshi Parihar Portfolio — Heavy Branding Studio Architecture Knowledge Graph", color="#ffffff", fontsize=20, pad=26, fontweight="bold")
            plt.tight_layout()

            plt.savefig(out_dir / "graph.svg", format="svg", bbox_inches="tight", facecolor=fig.get_facecolor())
            plt.savefig(out_dir / "graph.png", format="png", dpi=200, bbox_inches="tight", facecolor=fig.get_facecolor())
            plt.close(fig)
            print("[graphify-sync] Exported graph.png and graph.svg successfully")
    except Exception as e:
        print(f"[graphify-sync] Image export failed: {e}")

    print("[graphify-sync] Knowledge graph synchronization complete!")

if __name__ == "__main__":
    main()
