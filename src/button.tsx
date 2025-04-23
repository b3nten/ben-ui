import { Box, type BoxProps } from "./box.tsx";
import { CSSProperties, ElementType, use, useMemo } from "react";
import { CSSSelectors, StyleContext } from "./uiprovider.tsx";
import { makeColor as colorFn, spacing, typography, xStack } from "./tokens.ts";
import { withTooltip } from "./tooltip.tsx";
import { AnimatePresence } from "motion/react";
import { useCache, WithTheme } from "./util.ts";
import { ThemeContext } from "./themeprovider.tsx";

let ghost = (g: any, s: string) => g ? "transparent" : s

let padding = {
	sm: `${spacing["2"]} ${spacing["2"]}`,
	md: `${spacing["2"]} ${spacing["3"]}`,
	lg: `${spacing["3"]} ${spacing["6"]}`,
}

let fontScale = {
	sm: typography.scale[0],
	md: typography.scale[1],
	lg: typography.scale[2],
}

let makeButtonStyles = (
	args: {
		size: "sm" | "md" | "lg",
		color: string,
		ghost?: boolean,
		pending?: boolean,
	}
): Partial<CSSSelectors> => ({
	position: "relative",
	overflow: "hidden",
	padding: padding[args.size],
	transition: "all 0.1s ease-in-out",
	borderRadius: "999px",
	fontFamily: typography.style.sansSerif,
	backgroundColor: ghost(
		args.ghost,
		colorFn({ name: args.color, usage: "bg", action: "normal" })
	),
	color: colorFn({ name: args.color, usage: "text", action: "normal" }),
	border: `1px solid ${ghost(args.ghost, colorFn({ name: args.color, usage: "fg", action: "normal" }))}`,
	pointerEvents: args.pending ? "none" : "auto",
	cursor: args.pending ? "not-allowed" : "pointer",
	hover: {
		backgroundColor: colorFn({ name: args.color, usage: "bg", action: "hover" }),
		color: colorFn({ name: args.color, usage: "text", action: "hover" }),
		border:
			`1px solid ${ghost(args.ghost, colorFn({ name: args.color, usage: "fg", action: "hover" }))}`,
	},
	active: {
		backgroundColor: colorFn({ name: args.color, usage: "bg", action: "active" }),
		color: colorFn({ name: args.color, usage: "text", action: "active" }),
		border:
			`1px solid ${ghost(args.ghost, colorFn({ name: args.color, usage: "fg", action: "active" }))}`,
	},
	disabled: {
		backgroundColor: colorFn({ name: args.color, usage: "bg", action: "disabled" }),
		color: colorFn({ name: args.color, usage: "text", action: "disabled" }),
		border:
			`1px solid ${ghost(args.ghost, colorFn({ name: args.color, usage: "fg", action: "disabled" }))}`,
		cursor: "not-allowed",
	},
	focus: {
		outline: `2px solid ${colorFn({ name: args.color, usage: "fg", action: "normal" })}`,
		outlineOffset: "2px",
	},
})

let makePendingStyles = (color: string) => ({
	zIndex: 10,
	position: "absolute",
	inset: 0,
	backgroundColor: colorFn({
		name: color,
		usage: "bg",
		action: "hover",
	}),
	...xStack(),
})

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
		color = use(ThemeContext).color,
		size,
		ghost,
		invert,
		pending,
		tooltip,
		children,
		...restProps
	} = props;

	let cssFn = use(StyleContext).css

	let compiledBtnStyles = useCache("buttonStyles", () => makeButtonStyles({
		size: size ?? "md",
		color,
		ghost,
		pending,
	}), [color, size, ghost, pending])

	let _css = useMemo(() =>
		cssFn(compiledBtnStyles, css),
		[compiledBtnStyles, css, color, size, ghost, pending]
	)

	let classes = `${size ? fontScale[size ?? "md"] : ""} ${className ?? ""}`

	return withTooltip(
		<Box
			as={as ?? "button"}
			{...restProps}
			className={classes}
			css={_css}
		>
			<WithTheme color={color}>
				{children}
			</WithTheme>
			<AnimatePresence>
				{pending && (
					<ButtonSpinner color={color} />
				)}
			</AnimatePresence>
		</Box>,
		tooltip,
		color,
	)
}

let ButtonSpinner = ({ color }: { color: string }) => {
	let cssFn = use(StyleContext).css
	return (
		<Box
			animated
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			css={cssFn(makePendingStyles(color))}
		>
			<span
				className="spinner"
				style={{
					"--spinner-color": colorFn({
						name: color,
						usage: "fg",
					})
				} as Partial<CSSProperties>}
			/>
		</Box>
	)
}