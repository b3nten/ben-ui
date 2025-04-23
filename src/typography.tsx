import { ElementType, use } from "react";
import { Box, BoxProps } from "./box.tsx";
import { CSSSelectors, StyleContext } from "./uiprovider.tsx";
import { useCache } from "./util.ts";
import { Tooltip } from "./tooltip.tsx";
import { typography } from "./tokens.ts";

export type HeadingProps<T extends ElementType = "button"> = BoxProps<T> & {
	color?: string;
	scale?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	tooltip?: string;
}

export let Heading = <T extends ElementType = "h1">(props: HeadingProps<T>) => {
	let {
		as,
		className,
		color = "neutral",
		scale,
		tooltip,
		children,
		...restProps
	} = props;

	let classes = `${typography.scale[props.scale ?? "10"]} ${className ?? ""}`

	if(tooltip) {
		return (
			<Tooltip content={tooltip}>
				<Box
					as={as ?? "h1"}
					{...restProps}
					className={classes}
				>
					{children}
				</Box>
			</Tooltip>
		)
	}

	return (
		<Box
			as={as ?? "h1"}
			{...restProps}
			className={classes}
		>
			{children}
		</Box>
	)
}

export type TextProps<T extends ElementType = "button"> = BoxProps<T> & {
	color?: string;
	scale?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	tooltip?: string;
}

export let Text = <T extends ElementType = "p">(props: TextProps<T>) => {
	let {
		as,
		className,
		color = "neutral",
		scale,
		tooltip,
		children,
		...restProps
	} = props;

	let classes = `${typography.scale[props.scale ?? "2"]} ${className ?? ""}`

	if(tooltip) {
		return (
			<Tooltip content={tooltip}>
				<Box
					as={as ?? "p"}
					{...restProps}
					className={classes}
				>
					{children}
				</Box>
			</Tooltip>
		)
	}

	return (
		<Box
			as={as ?? "p"}
			{...restProps}
			className={classes}
		>
			{children}
		</Box>
	)
}