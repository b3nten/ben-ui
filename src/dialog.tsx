import { Dialog as DialogImpl, VisuallyHidden } from "radix-ui";
import { createContext, type PropsWithChildren, use, useState } from "react";
import { Box, Text, ThemeContext, makeColor, spacing, sizes } from "./mod.ts";
import { AnimatePresence } from "motion/react";

export type DialogContentProps = {
	title?: string;
	description?: string;
	overlay?: boolean | React.ReactElement;
	color?: string;
};

let DialogContent = (props: PropsWithChildren<DialogContentProps>) => {
	let overlay = typeof props.overlay === "boolean" ? props.overlay : true;
	let color = props.color ?? use(ThemeContext).color;
	let open = use(DialogContext).open;
	return (
		<DialogImpl.Portal forceMount>
			<AnimatePresence>
				{open && (
					<Box
						animated
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.2 } }}
						exit={{ opacity: 0, transition: { duration: 0.1 } }}
						css={{ position: "fixed", inset: 0 }}
					>
						{overlay && (
							<Box
								css={{
									position: "fixed",
									inset: 0,
									zIndex: -10,
									backgroundColor: makeColor({
										name: "neutral",
										usage: "overlay",
									}),
									opacity: 0.8,
									pointerEvents: "none",
									transition: "opacity 0.2s ease-in-out",
								}}
							/>
						)}
						<DialogImpl.Content>
							{props.description && (
								<VisuallyHidden.Root asChild>
									<DialogImpl.Description>
										{props.description}
									</DialogImpl.Description>
								</VisuallyHidden.Root>
							)}
							<Box
								css={{
									position: "fixed",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									zIndex: 10,
									border: `1px solid ${makeColor({
										name: color,
										usage: "fg",
									})}`,
									backgroundColor: makeColor({
										name: color,
										usage: "bg",
									}),
									minWidth: "50vw",
									borderRadius: sizes[3],
								}}
							>
								<Box
									css={{
										padding: spacing[2],
									}}
								>
									{props.title && (
										<DialogImpl.Title asChild>
											<Text size={2}>{props.title}</Text>
										</DialogImpl.Title>
									)}
									<DialogImpl.Close asChild>
										<Box
											as={"button"}
											css={{
												position: "absolute",
												top: spacing[2],
												right: spacing[2],
												borderRadius: "100%",
												width: sizes[6],
												aspectRatio: 1,
												color: makeColor({
													name: "rose",
													shade: 500,
												}),
												padding: spacing[2],
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											&#x2715;
										</Box>
									</DialogImpl.Close>
									<Box
										css={{
											padding: `${spacing[2]} 0`,
										}}
									>
										{props.children}
									</Box>
								</Box>
							</Box>
						</DialogImpl.Content>
					</Box>
				)}
			</AnimatePresence>
		</DialogImpl.Portal>
	);
};

let DialogContext = createContext({ open: false })

let Root = (props: DialogImpl.DialogProps) => {
	let [open, setOpen] = useState(props.open ?? false)
	return (
		<DialogImpl.Root
			open={props.open ?? open}
			onOpenChange={(open) => {
				if (props.onOpenChange) {
					props.onOpenChange(open);
				}
				setOpen(open);
			}}
			{...props}
		>
			<DialogContext.Provider value={{ open: props.open ?? open }}>
				{props.children}
			</DialogContext.Provider>
		</DialogImpl.Root>
	)
}

export default {
	Root: Root,
	Trigger: DialogImpl.Trigger,
	Content: DialogContent,
	Close: DialogImpl.Close,
};
