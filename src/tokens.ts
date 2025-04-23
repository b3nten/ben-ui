import { CSSProperties } from "react";

export let yStack = (
	args: {
		align?: CSSProperties["alignItems"],
		justify?: CSSProperties["justifyContent"],
		gap?: string,
	} = {}
): Partial<CSSProperties> => ({
	display: "flex",
	flexDirection: "column",
	alignItems: args.align ?? "center",
	justifyContent: args.justify ?? "center",
	gap: args.gap ?? "0px",
})

export let xStack = (
	args: {
		align?: CSSProperties["alignItems"],
		justify?: CSSProperties["justifyContent"],
		gap?: string,
	} = {}
): Partial<CSSProperties> => ({
	display: "flex",
	flexDirection: "row",
	alignItems: args.align ?? "center",
	justifyContent: args.justify ?? "center",
	gap: args.gap ?? "0px",
})

export const intents = {
	warning: "gold",
	positive: "green",
	negative: "love",
	neutral: "gray",
	primary: "rose",
}

export const spacing = {
	[0]: 'var(--spacing-0)',
	[1]: 'var(--spacing-1)',
	[2]: 'var(--spacing-2)',
	[3]: 'var(--spacing-3)',
	[4]: 'var(--spacing-4)',
	[5]: 'var(--spacing-5)',
	[6]: 'var(--spacing-6)',
	[7]: 'var(--spacing-7)',
	[8]: 'var(--spacing-8)',
	[9]: 'var(--spacing-9)',
	[10]: 'var(--spacing-10)',
}

export const typography = {
	style: {
		serif: 'var(--typography-serif)',
		sansSerif: 'var(--typography-sans)',
		monospace: 'var(--typography-monospace)',
	},
	scale: {
		[0]: 'typography-scale-0',
		[1]: 'typography-scale-1',
		[2]: 'typography-scale-2',
		[3]: 'typography-scale-3',
		[4]: 'typography-scale-4',
		[5]: 'typography-scale-5',
		[6]: 'typography-scale-6',
		[7]: 'typography-scale-7',
		[8]: 'typography-scale-8',
		[9]: 'typography-scale-9',
		[10]: 'typography-scale-10',
	},
	size: {
		[0]: 'var(--typography-size-0)',
		[1]: 'var(--typography-size-1)',
		[2]: 'var(--typography-size-2)',
		[3]: 'var(--typography-size-3)',
		[4]: 'var(--typography-size-4)',
		[5]: 'var(--typography-size-5)',
		[6]: 'var(--typography-size-6)',
		[7]: 'var(--typography-size-7)',
		[8]: 'var(--typography-size-8)',
		[9]: 'var(--typography-size-9)',
		[10]: 'var(--typography-size-10)',
	},
	spacing: {
		[0]: 'var(--typography-spacing-0)',
		[1]: 'var(--typography-spacing-1)',
		[2]: 'var(--typography-spacing-2)',
		[3]: 'var(--typography-spacing-3)',
		[4]: 'var(--typography-spacing-4)',
		[5]: 'var(--typography-spacing-5)',
		[6]: 'var(--typography-spacing-6)',
		[7]: 'var(--typography-spacing-7)',
		[8]: 'var(--typography-spacing-8)',
		[9]: 'var(--typography-spacing-9)',
		[10]: 'var(--typography-spacing-10)',
	},
	height: {
		[0]: 'var(--typography-height-0)',
		[1]: 'var(--typography-height-1)',
		[2]: 'var(--typography-height-2)',
		[3]: 'var(--typography-height-3)',
		[4]: 'var(--typography-height-4)',
		[5]: 'var(--typography-height-5)',
		[6]: 'var(--typography-height-6)',
		[7]: 'var(--typography-height-7)',
		[8]: 'var(--typography-height-8)',
		[9]: 'var(--typography-height-9)',
		[10]: 'var(--typography-height-10)',
	},
	weight: {
		light: 'var(--typography-weight-light)',
		normal: 'var(--typography-weight-normal)',
		medium: 'var(--typography-weight-medium)',
		bold: 'var(--typography-weight-bold)',
	}
}

export let makeColor = (args: {
	name: string,
	usage: "fg" | "bg" | "text" | "surface" | "overlay" | "shadow"
	action?: "hover" | "active" | "normal" | "disabled" | "highlighted",
	variant?: "string",
	opacity?: number,
}) =>
	["surface", "overlay", "shadow"].includes(args.usage) ?
	`var(--color-${args.name}-${args.usage}${args.variant ? `-${args.variant}` : ""})` :
	args.opacity ? `color-mix(in srgb, var(--color-${args.name}-${args.usage}-${args.action ?? "normal"}${args.variant ? `-${args.variant}` : ""}), rgba(0, 0, 0, ${args.opacity}%))` : `var(--color-${args.name}-${args.usage}-${args.action ?? "normal"}${args.variant ? `-${args.variant}` : ""})`
