import { Box, type BoxProps } from "./box.tsx";
import { ElementType, use, useMemo } from "react";
import { CSSSelectors, StyleContext } from "./uiprovider.tsx";
import { pickColor, spacing, typography } from "./tokens.ts";
import { Tooltip } from "./tooltip.tsx";

export type ButtonProps<T extends ElementType = "button"> = BoxProps<T> & {
	color?: string;
	size?: "sm" | "md" | "lg";
	ghost?: boolean;
	invert?: boolean;
	pending?: boolean;
	tooltip?: string;
}

export let Button = <T extends ElementType = "button">(
	props: ButtonProps<T>
) => {
	let {
		as,
		css,
		className,
		color = "neutral",
		size,
		ghost,
		invert,
		pending,
		tooltip,
		...restProps
	} = props;

	let cssFn = use(StyleContext).css

	let _css = useMemo(() =>
		cssFn(makeButtonStyles({
			color,
			ghost,
			size: size ?? "md",
		}), css),
		[css, color, size, ghost, invert, pending]
	)

	let classes = `${fontScale[size ?? "md"]} ${className ?? ""}`

	if(tooltip) {
		return (
			<Tooltip content={tooltip}>
				<Box
					as={as ?? "button"}
					{...restProps}
					className={classes}
					css={_css}
				/>
			</Tooltip>
		)
	}

	return (
		<Box
			as={as ?? "button"}
			{...restProps}
			className={classes}
			css={_css}
		/>
	);
}

let ghost = (g: any, s: string) => g ? "transparent" : s
let padding = {
	sm: `${spacing["1"]} ${spacing["1"]}`,
	md: `${spacing["1"]} ${spacing["3"]}`,
	lg: `${spacing["2"]} ${spacing["4"]}`,
}
let fontScale = {
	sm: typography.scale[2],
	md: typography.scale[3],
	lg: typography.scale[6],
}

let makeButtonStyles = (
	args: {
		size: "sm" | "md" | "lg",
		color: string,
		ghost?: boolean,
	}
): Partial<CSSSelectors> => ({
	padding: padding[args.size],
	transition: "all 0.1s ease-in-out",
	borderRadius: "999px",
	backgroundColor: ghost(
		args.ghost,
		pickColor({ name: args.color, usage: "bg", action: "normal" })
	),
	color: pickColor({ name: args.color, usage: "text", action: "normal" }),
	border: `1px solid ${ghost(args.ghost, pickColor({ name: args.color, usage: "fg", action: "normal" }))}`,
	hover: {
		backgroundColor: pickColor({ name: args.color, usage: "bg", action: "hover" }),
		color: pickColor({ name: args.color, usage: "text", action: "hover" }),
		border:
			`1px solid ${ghost(args.ghost, pickColor({ name: args.color, usage: "fg", action: "hover" }))}`,
	},
	active: {
		backgroundColor: pickColor({ name: args.color, usage: "bg", action: "active" }),
		color: pickColor({ name: args.color, usage: "text", action: "active" }),
		border:
			`1px solid ${ghost(args.ghost, pickColor({ name: args.color, usage: "fg", action: "active" }))}`,
	},
	disabled: {
		backgroundColor: pickColor({ name: args.color, usage: "bg", action: "disabled" }),
		color: pickColor({ name: args.color, usage: "text", action: "disabled" }),
		border:
			`1px solid ${ghost(args.ghost, pickColor({ name: args.color, usage: "fg", action: "disabled" }))}`,
		cursor: "not-allowed",
	},
	focus: {
		outline: `2px solid ${pickColor({ name: args.color, usage: "fg", action: "normal" })}`,
		outlineOffset: "2px",
	},
})