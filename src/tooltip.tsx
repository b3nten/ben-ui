import { Tooltip as TooltipImpl } from "radix-ui";
import { PropsWithChildren, ReactNode, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Box } from "./mod.ts"
import { color, spacing } from "./tokens.ts";

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

export let Tooltip = (props: PropsWithChildren<{ content: ReactNode }>) => {
	let { content } = props;
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
									backgroundColor: color({
										name: "neutral",
										usage: "overlay"
									}),
									color: color({
										name: "neutral",
										usage: "text",
									}),
									border: `1px solid ${color({
										name: "neutral",
										usage: "fg",
									})}`,
									padding: `${spacing[1]} ${spacing[2]}`,
									borderRadius: "999px",
								}}
							>
								{content}
								<TooltipImpl.Arrow
									fill={color({
										name: "neutral",
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