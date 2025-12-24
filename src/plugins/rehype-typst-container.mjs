import { visit } from "unist-util-visit";

/**
 * Rehype plugin to wrap typst display equations in a scrollable container.
 * Runs at build time to avoid runtime DOM manipulation and animation replay.
 */
export function rehypeTypstContainer() {
	return (tree) => {
		visit(tree, "element", (node, index, parent) => {
			if (
				node.tagName === "svg" &&
				node.properties?.className?.includes("typst-doc") &&
				!node.properties?.className?.includes("typst-inline")
			) {
				const wrapper = {
					type: "element",
					tagName: "div",
					properties: {
						className: ["typst-display-container"],
						"aria-label": "scrollable container for formulas",
						"data-overlayscrollbars-initialize": true,
					},
					children: [node],
				};
				parent.children[index] = wrapper;
			}
		});
	};
}
