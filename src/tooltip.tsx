import { Tooltip as TooltipImpl } from "radix-ui";
import { createElement, PropsWithChildren, ReactNode, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Box } from "./mod.ts"
import { makeColor, spacing } from "./tokens.ts";

export let Root = TooltipImpl.Root;
export let Trigger = TooltipImpl.Trigger;

export let Content = (props: PropsWithChildren<TooltipImpl.TooltipContentProps>) => {
	let { children, ...rest } = props;
	return (
		<TooltipImpl.Portal>
			<TooltipImpl.Content sideOffset={5} {...rest}>
				<Box>
					{children}
					<TooltipImpl.Arrow
						fill={"var(--background2)"}
					/>
				</Box>
			</TooltipImpl.Content>
		</TooltipImpl.Portal>
	)
}

export let Tooltip = (props: PropsWithChildren<{ content: ReactNode, color?: string }>) => {
	let { content, color = "neutral" } = props;
	let [open, setOpen] = useState(false);
	return (
		<TooltipImpl.Root open={open} onOpenChange={setOpen}>
			{typeof props.children === "string" ? (
				<TooltipImpl.Trigger asChild>
					<span>{props.children}</span>
				</TooltipImpl.Trigger>
			) : (
				<TooltipImpl.Trigger asChild>
					{props.children}
				</TooltipImpl.Trigger>
			)}
				<AnimatePresence>
					{open && (
						<TooltipImpl.Portal forceMount>
						<TooltipImpl.Content
							sideOffset={5}
							forceMount
							asChild
						>
							<Box
								animated
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0 }}
								transition={{ type: "spring", duration: 0.3, bounce: .55,  }}
								css={{
									transformOrigin: "var(--radix-tooltip-content-transform-origin)",
									backgroundColor: makeColor({
										name: color,
										usage: "overlay"
									}),
									color: makeColor({
										name: color,
										usage: "text",
									}),
									border: `1px solid ${makeColor({
										name: color,
										usage: "fg",
									})}`,
									padding: `${spacing[1]} ${spacing[2]}`,
									borderRadius: "999px",
								}}
							>
								{content}
								<TooltipImpl.Arrow
									fill={makeColor({
										name: color,
										usage: "fg",
									})}
								/>
							</Box>
						</TooltipImpl.Content>
						</TooltipImpl.Portal>
					)}
				</AnimatePresence>
		</TooltipImpl.Root>
	)
}


export let withTooltip = (children: ReactNode, content?: ReactNode, color?: string) =>
	content ? (
		<Tooltip content={content} color={color}>
			{children}
		</Tooltip>
	) : (
		children
	)