import { Box, type BoxProps } from "./box.tsx";
import { CSSProperties, ElementType, use, useMemo } from "react";
import { CSSSelectors, StyleContext } from "./uiprovider.tsx";
import { color as colorFn, spacing, typography, xStack } from "./tokens.ts";
import { Tooltip } from "./tooltip.tsx";
import { AnimatePresence } from "motion/react";

let ghost = (g: any, s: string) => g ? "transparent" : s

let padding = {
	sm: `${spacing["1"]} ${spacing["2"]}`,
	md: `${spacing["1"]} ${spacing["3"]}`,
	lg: `${spacing["2"]} ${spacing["6"]}`,
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
		pending?: boolean,
	}
): Partial<CSSSelectors> => ({
	position: "relative",
	overflow: "hidden",
	padding: padding[args.size],
	transition: "all 0.1s ease-in-out",
	borderRadius: "999px",
	backgroundColor: ghost(
		args.ghost,
		colorFn({ name: args.color, usage: "bg", action: "normal" })
	),
	color: colorFn({ name: args.color, usage: "text", action: "normal" }),
	border: `1px solid ${ghost(args.ghost, colorFn({ name: args.color, usage: "fg", action: "normal" }))}`,
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
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
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
		color = "neutral",
		size,
		ghost,
		invert,
		pending,
		tooltip,
		children,
		...restProps
	} = props;

	let cssFn = use(StyleContext).css

	let _css = useMemo(() => cssFn(
			makeButtonStyles({
				size: size ?? "md",
				color,
				ghost,
				pending,
			}),
			css
		),
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
				>
					{children}
					<AnimatePresence>
						{pending && (
							<ButtonSpinner color={color} />
						)}
					</AnimatePresence>
				</Box>
			</Tooltip>
		)
	}

	return (
		<Box
			as={as ?? "button"}
			{...restProps}
			className={classes}
			css={_css}
		>
			{children}
			<AnimatePresence>
				{pending && (
					<ButtonSpinner color={color} />
				)}
			</AnimatePresence>
		</Box>
	);
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