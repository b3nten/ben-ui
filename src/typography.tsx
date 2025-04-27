import { ElementType, use, useMemo } from "react";
import { Box, BoxProps } from "./box.tsx";
import { StyleContext } from "./uiprovider.tsx";
import { useCache, WithTheme } from "./util.ts";
import { withTooltip } from "./tooltip.tsx";
import { makeColor, spacing, typography } from "./tokens.ts";
import { ThemeContext } from "./themeprovider.tsx";

export type HeadingProps<T extends ElementType = "button"> = BoxProps<T> & {
	color?: string;
	size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	tooltip?: string;
}

export let Heading = <T extends ElementType = "h1">(props: HeadingProps<T>) => {
	let {
		as,
		css,
		className,
		color = use(ThemeContext).color,
		size,
		tooltip,
		children,
		...restProps
	} = props;

	let cssFn = use(StyleContext).css

	let compiledHeadingStyles = useCache("headingStyles", () => ({
		color: makeColor({
			name: color,
			usage: "text"
		}),
	}), [color])

	let styles = useMemo(() =>
		cssFn(compiledHeadingStyles, css),
		[compiledHeadingStyles, css]
	)

	let classes = `${typography.scale[props.size ?? "10"]} ${className ?? ""}`

	return withTooltip(
		<Box
			as={as ?? "h1"}
			{...restProps}
			className={classes}
			css={styles}
		>
			<WithTheme color={color}>
				{children}
			</WithTheme>
		</Box>,
		tooltip,
		color
	)
}

export type TextProps<T extends ElementType = "button"> = BoxProps<T> & {
	color?: string;
	size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	tooltip?: string;
}

export let Text = <T extends ElementType = "p">(props: TextProps<T>) => {
	let {
		as,
		css,
		className,
		color = use(ThemeContext).color,
		size,
		tooltip,
		children,
		...restProps
	} = props;

	let cssFn = use(StyleContext).css

	let compiledTextStyles = useCache("textStyles", () => ({
		color: makeColor({
			name: color,
			usage: "text"
		}),
	}), [color])

	let styles = useMemo(() =>
			cssFn(compiledTextStyles, css),
		[compiledTextStyles, css]
	)

	let classes = `${size ? typography.scale[size] : ""} ${className ?? ""}`

	return withTooltip(
		<Box
			as={as ?? "p"}
			{...restProps}
			className={classes}
			css={styles}
		>
			<WithTheme color={color}>
				{children}
			</WithTheme>
		</Box>,
		tooltip,
		color
	)
}

export type LinkProps<T extends ElementType = "a"> = BoxProps<T> & {
	color?: string;
	size?: 0 | 1 | 2;
	tooltip?: string;
}

export let Link = <T extends ElementType = "a">(props: TextProps<T>) => {
	let {
		as,
		css,
		className,
		color = use(ThemeContext).color,
		size,
		tooltip,
		children,
		...restProps
	} = props;

	let classes = `link ${size ? typography.scale[size] : ""} ${className ?? ""}`

	let cssFn = use(StyleContext).css

	let styles = useMemo(() =>
		cssFn({
			"--current-color": makeColor({
				name: color,
				usage: "text"
			}),
			"--current-visited-color": makeColor({
				name: color,
				usage: "text",
				action: "highlighted"
			})
		}, css),
		[css, color]
	)

	return withTooltip(
		<Box
			as={as ?? "a"}
			{...restProps}
			className={classes}
			css={styles}
		>
			<WithTheme color={color}>
				{children}
			</WithTheme>
		</Box>,
		tooltip,
		color
	)
}

export type CodeProps<T extends ElementType = "code"> = BoxProps<T> & {
	color?: string;
	tooltip?: string;
	children: string;
}

export let Code = <T extends ElementType = "code">(props: CodeProps<T>) => {
	let {
		as,
		css,
		className,
		color = use(ThemeContext).color,
		tooltip,
		children,
		...restProps
	} = props;

	let cssFn = use(StyleContext).css

	let compiledCodeStyles = useCache("codeStyles", () => ({
		color: makeColor({
			name: color,
			usage: "text"
		}),
		backgroundColor: makeColor({
			name: color,
			usage: "bg",
			action: "normal"
		}),
		fontStyle: typography.style.monospace,
		padding: `0 ${spacing["1"]}`,
	}), [color])

	let styles = useMemo(() =>
			cssFn(compiledCodeStyles, css),
		[compiledCodeStyles, css]
	)

	let classes = `${className ?? ""}`

	return withTooltip(
		<Box
			as={as ?? "code"}
			{...restProps}
			className={classes}
			css={styles}
		>
			{children}
		</Box>,
		tooltip,
		color
	)
}

export type BlockquoteProps<T extends ElementType = "blockquote"> = BoxProps<T> & {
	color?: string;
	tooltip?: string;
	size?: 0 | 1 | 2 | 3;
	children: string;
	maxWidth?: string;
}

export let Blockquote = <T extends ElementType = "blockquote">(props: BlockquoteProps<T>) => {
	let {
		as,
		css,
		className,
		color = use(ThemeContext).color,
		size,
		maxWidth = "30rem",
		tooltip,
		children,
		...restProps
	} = props;

	let cssFn = use(StyleContext).css

	let compiledCodeStyles = useCache("codeStyles", () => ({
		color: makeColor({
			name: color,
			usage: "text"
		}),
		backgroundColor: makeColor({
			name: color,
			usage: "bg",
		}),
		fontStyle: typography.style.serif,
		maxWidth: maxWidth,
		padding: `${spacing[4]} ${spacing[4]}`,
		borderTop: `1px solid ${makeColor({
			name: color,
			usage: "fg",
			opacity: 2,
		})}`,
		borderBottom: `1px solid ${makeColor({
			name: color,
			usage: "fg",
			opacity: 2,
		})}`,
		marginLeft: `calc(${spacing[4]})`,
	}), [color, maxWidth])

	let styles = useMemo(() =>
			cssFn(compiledCodeStyles, css),
		[compiledCodeStyles, css]
	)

	let classes = `${size ? typography.scale[size] : ""} ${className ?? ""}`

	return withTooltip(
		<Box
			as={as ?? "blockquote"}
			{...restProps}
			className={classes}
			css={styles}
		>
			{children}
		</Box>,
		tooltip,
		color
	)
}