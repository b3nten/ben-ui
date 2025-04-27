import { createElement } from "react";
import { Box, type BoxProps } from "./box.tsx";

export default {
	h1: (props: BoxProps<"h1">) => createElement(Box, { as: "h1", ...props }),
	h2: (props: BoxProps<"h2">) => createElement(Box, { as: "h2", ...props }),
	h3: (props: BoxProps<"h3">) => createElement(Box, { as: "h3", ...props }),
	h4: (props: BoxProps<"h4">) => createElement(Box, { as: "h4", ...props }),
	h5: (props: BoxProps<"h5">) => createElement(Box, { as: "h5", ...props }),
	h6: (props: BoxProps<"h6">) => createElement(Box, { as: "h6", ...props }),
	p: (props: BoxProps<"p">) => createElement(Box, { as: "p", ...props }),
	span: (props: BoxProps<"span">) =>
		createElement(Box, { as: "span", ...props }),
	strong: (props: BoxProps<"strong">) =>
		createElement(Box, { as: "strong", ...props }),
	em: (props: BoxProps<"em">) => createElement(Box, { as: "em", ...props }),
	abbr: (props: BoxProps<"abbr">) =>
		createElement(Box, { as: "abbr", ...props }),
	ul: (props: BoxProps<"ul">) => createElement(Box, { as: "ul", ...props }),
	ol: (props: BoxProps<"ol">) => createElement(Box, { as: "ol", ...props }),
	li: (props: BoxProps<"li">) => createElement(Box, { as: "li", ...props }),
	a: (props: BoxProps<"a">) => createElement(Box, { as: "a", ...props }),
	img: (props: BoxProps<"img">) => createElement(Box, { as: "img", ...props }),
	hr: (props: BoxProps<"hr">) => createElement(Box, { as: "hr", ...props }),
	br: (props: BoxProps<"br">) => createElement(Box, { as: "br", ...props }),
	address: (props: BoxProps<"address">) =>
		createElement(Box, { as: "address", ...props }),
	blockquote: (props: BoxProps<"blockquote">) =>
		createElement(Box, { as: "blockquote", ...props }),
	footer: (props: BoxProps<"footer">) =>
		createElement(Box, { as: "footer", ...props }),
	section: (props: BoxProps<"section">) =>
		createElement(Box, { as: "section", ...props }),
	article: (props: BoxProps<"article">) =>
		createElement(Box, { as: "article", ...props }),
	aside: (props: BoxProps<"aside">) =>
		createElement(Box, { as: "aside", ...props }),
	nav: (props: BoxProps<"nav">) => createElement(Box, { as: "nav", ...props }),
	main: (props: BoxProps<"main">) =>
		createElement(Box, { as: "main", ...props }),
	figure: (props: BoxProps<"figure">) =>
		createElement(Box, { as: "figure", ...props }),
	figcaption: (props: BoxProps<"figcaption">) =>
		createElement(Box, { as: "figcaption", ...props }),
	details: (props: BoxProps<"details">) =>
		createElement(Box, { as: "details", ...props }),
	summary: (props: BoxProps<"summary">) =>
		createElement(Box, { as: "summary", ...props }),
	time: (props: BoxProps<"time">) =>
		createElement(Box, { as: "time", ...props }),
	dt: (props: BoxProps<"dt">) => createElement(Box, { as: "dt", ...props }),
	dd: (props: BoxProps<"dd">) => createElement(Box, { as: "dd", ...props }),
	dl: (props: BoxProps<"dl">) => createElement(Box, { as: "dl", ...props }),
	ins: (props: BoxProps<"ins">) => createElement(Box, { as: "ins", ...props }),
	del: (props: BoxProps<"del">) => createElement(Box, { as: "del", ...props }),
	small: (props: BoxProps<"small">) =>
		createElement(Box, { as: "small", ...props }),
	mark: (props: BoxProps<"mark">) =>
		createElement(Box, { as: "mark", ...props }),
	sup: (props: BoxProps<"sup">) => createElement(Box, { as: "sup", ...props }),
	sub: (props: BoxProps<"sub">) => createElement(Box, { as: "sub", ...props }),
	div: (props: BoxProps<"div">) => createElement(Box, { as: "div", ...props }),
};
