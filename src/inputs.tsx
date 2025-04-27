import { ElementType, ReactNode, use, useMemo } from "react";
import {
	makeColor,
	spacing,
	StyleContext,
	ThemeContext,
	typography,
	useCache,
	withTooltip,
	Box,
	BoxProps, makeTransition
} from "./mod.ts";

export type TextboxProps<T extends ElementType = "input"> = BoxProps<T> & {
	color?: string;
	size?: 0 | 1 | 2 | 3;
	tooltip?: string;
	icon?: ReactNode
	button?: ReactNode
	ghost?: boolean
}

export let Textbox = <T extends ElementType = "input">(props: TextboxProps<T>) => {
	let {
		as,
		css,
		className,
		color = use(ThemeContext).color,
		size,
		tooltip,
		button,
		icon,
		ghost,
		children,
		...restProps
	} = props;

	let cssFn = use(StyleContext).css

	let compiledInputStyles = useCache("textboxStyles", () => ({
		position: "relative",
		color: makeColor({
			name: color,
			usage: "text"
		}),
		transition: "var(--transition)",
		paddingTop: `${spacing[2]}`,
		paddingBottom: `${spacing[2]}`,
		paddingLeft: icon ? spacing[7] : spacing[3],
		paddingRight: button ? spacing[6] : spacing[3],
		borderRadius: "999px",
		border: !ghost && `1px solid ${makeColor({
			name: color,
			usage: "fg",
			opacity: 50,
		})}`,
		boxShadow: `inset 0 0 6px ${makeColor({
			name: color,
			usage: "shadow",
			opacity: ghost ? 60 : 20,
		})}`,
		hover: {
			border: !ghost && `1px solid ${makeColor({
				name: color,
				usage: "fg",
				action: "hover"
			})}`,
			backgroundColor: ghost ? makeColor({
				name: color,
				usage: "bg",
				action: "hover"
			}) : "transparent",
		},
		focus: {
			border: !ghost && `1px solid ${makeColor({
				name: color,
				usage: "bg",
				action: "active"
			})}`,
			outline: `2px solid ${makeColor({
				name: color,
				usage: "fg",
				action: "active"
			})}`,
			outlineOffset: "2px",
		},
	}), [color, !!button, !!icon, ghost])

	let styles = useMemo(() =>
			cssFn(compiledInputStyles, css),
		[compiledInputStyles, css]
	)

	let classes = `${size ? typography.scale[size ?? "0"] : ""} ${className ?? ""}`

	if(button || icon) {
		return withTooltip(
			<Box
				css={{
					position: "relative"
				}}
			>
				{icon && (
					<Box
						css={{
							position: "absolute",
							top: "50%",
							left: spacing[2],
							transform: "translateY(-50%)",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: spacing[5],
							aspectRatio: 1,
							zIndex: 1,
						}}
					>
						{icon}
					</Box>
				)}
				<Box
					as={as ?? "input"}
					{...restProps}
					className={classes}
					css={styles}
				/>
				{button && (
					<Box
						css={{
							position: "absolute",
							top: "50%",
							right: spacing[2],
							transform: "translateY(-50%)",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: spacing[5],
							aspectRatio: 1,
							zIndex: 1,
						}}
					>
						{button}
					</Box>
				)}
			</Box>,
			tooltip,
			color
		)
	}

	return withTooltip(
		<Box
			as={as ?? "input"}
			{...restProps}
			className={classes}
			css={styles}
		/>,
		tooltip,
		color
	)
}

export type TextareaProps<T extends ElementType = "textarea"> = BoxProps<T> & {
	color?: string;
	size?: 0 | 1 | 2 | 3;
	tooltip?: string;
	ghost?: boolean
	resize?: "none" | "both" | "horizontal" | "vertical"
}

export let Textarea = <T extends ElementType = "textarea">(props: TextareaProps<T>) => {
	let {
		as,
		css,
		className,
		color = use(ThemeContext).color,
		size,
		tooltip,
		ghost,
		resize,
		children,
		...restProps
	} = props;

	let cssFn = use(StyleContext).css

	console.log(makeTransition({ target: "border-color" }, { target: "background" }))

	let compiledInputStyles = useCache("textAreaStyles", () => ({
		position: "relative",
		resize: resize ?? "none",
		color: makeColor({
			name: color,
			usage: "text"
		}),
		transition: makeTransition({ target: "border" }, { target: "background-color" }),
		paddingTop: spacing[2],
		paddingBottom: spacing[2],
		paddingLeft: spacing[3],
		paddingRight: spacing[3],
		borderRadius: spacing[3],
		border: !ghost && `1px solid ${makeColor({
			name: color,
			usage: "fg",
			opacity: 50,
		})}`,
		boxShadow: `inset 0 0 6px ${makeColor({
			name: color,
			usage: "shadow",
			opacity: ghost ? 60 : 20,
		})}`,
		hover: {
			border: !ghost && `1px solid ${makeColor({
				name: color,
				usage: "fg",
				action: "hover"
			})}`,
			backgroundColor: ghost ? makeColor({
				name: color,
				usage: "bg",
				action: "hover"
			}) : "transparent",
		},
		focus: {
			border: !ghost && `1px solid ${makeColor({
				name: color,
				usage: "bg",
				action: "active"
			})}`,
			outline: `2px solid ${makeColor({
				name: color,
				usage: "fg",
				action: "active"
			})}`,
			outlineOffset: "2px",
		},
	}), [color, ghost])

	let styles = useMemo(() =>
			cssFn(compiledInputStyles, css),
		[compiledInputStyles, css]
	)

	let classes = `${size ? typography.scale[size ?? "0"] : ""} ${className ?? ""}`

	return withTooltip(
		<Box
			as={as ?? "textarea"}
			{...restProps}
			className={classes}
			css={styles}
		/>,
		tooltip,
		color
	)
}