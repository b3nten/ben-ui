import {
	Condition,
	createHooks,
	CreateHooksResult,
	type Selector
} from "@css-hooks/react";
import {
	type PropsWithChildren,
	createContext,
	useContext,
	useRef,
	useCallback,
	useMemo,
	useLayoutEffect, CSSProperties
} from "react";
import { Tooltip } from "radix-ui";
import { Nullable } from "./util.ts";

interface IStyleContext {
	styleSheet: () => string
	css: (...styles: Array<Nullable<Record<string, any>>>) => any
	on: CreateHooksResult<any, any>["on"]
	not: CreateHooksResult<any, any>["not"]
	or: CreateHooksResult<any, any>["or"]
	and: CreateHooksResult<any, any>["and"]
}

export let defaultHooks = {
	hover: "&:hover",
	active: "&:active",
	focus: "&:focus",
	focusVisible: "&:focus-visible",
	focusWithin: "&:focus-within",
	disabled: "&:disabled",
	checked: "&:checked",
	valid: "&:valid",
	invalid: "&:invalid",
	required: "&:required",
	optional: "&:optional",
	firstChild: "&:first-child",
	lastChild: "&:last-child",
	"[data-state='on']": "[data-state='on']",
	"[data-state='off']": "[data-state='off']",
} satisfies Record<string, string>

export interface ExtendedCSSProperties extends CSSProperties {
	hover?: ExtendedCSSProperties,
	active?: ExtendedCSSProperties,
	focus?: ExtendedCSSProperties,
	focusVisible?: ExtendedCSSProperties,
	focusWithin?: ExtendedCSSProperties,
	disabled?: ExtendedCSSProperties,
	checked?: ExtendedCSSProperties,
	valid?: ExtendedCSSProperties,
	invalid?: ExtendedCSSProperties,
	required?: ExtendedCSSProperties,
	optional?: ExtendedCSSProperties,
	firstChild?: ExtendedCSSProperties,
	lastChild?: ExtendedCSSProperties,
	"[data-state='on']"?: ExtendedCSSProperties,
	"[data-state='off']"?: ExtendedCSSProperties,
}

export interface CSSSelectors extends ExtendedCSSProperties {

}

export const StyleContext = createContext<IStyleContext>(undefined as any);

/**
 * Return's a function to parse CSS objects to an object compatable with React's `style` prop.
 */
export let useCss = () =>
	useContext(StyleContext)?.css ?? ((style: Record<string, any>) => style);

let isNot = (str: string) => str.startsWith("&:!")
let parseNot = (str: string) => str.replace("&:!", "&:") as Selector;

export let colorModeQuery = typeof window !== "undefined"
	? window.matchMedia("(prefers-color-scheme: dark)")
	: undefined;

export let UIProvider = (props: PropsWithChildren<{
	/**
	 * A list of selectors to use for the base element's css prop. By default, it uses
	 * the exported `defaultHooks` array.
	 */
	selectors?: Record<string, string>,
	/**
	 * The name of the color theme to use. This is used to set the
	 * `data-webtui-theme` attribute on the `html` element.
	 *  If { dark: string, light: string } is passed, it will
	 *  use the user's color scheme preference.
	 */
	colorTheme?: string | { dark?: string, light?: string },
}>) => {
	let selectors = {
		...defaultHooks,
		...props.selectors,
	} as Record<string, Selector>

	let { not, and, on, or, styleSheet } =
		useRef(createHooks(
			...new Set<Selector>([...Object.values(selectors)])
		)).current

	let map = (selector: string) => selectors[selector] ?? selector

	let makeSelector = useCallback((selectors: string[]) => {
		let last = selectors[selectors.length - 1] as Selector
		let result: any = isNot(last)
			? not(map(parseNot(last)) as Selector)
			: and(map(last))
		for(let i = selectors.length - 2; i >= 0; i--) {
			if(isNot(selectors[i])) {
				result = and(result, not(map(parseNot(selectors[i]))))
			} else {
				result = and(map(selectors[i]), result)
			}
		}
		return result as Condition<Selector>
	}, [])

	let css = useCallback((...styles: Array<Nullable<Record<string, any>>>) => {
		let result: Record<string, any> = {}

		for(let i = 0; i < styles.length; i++) {
			let style = styles[i]
			if(typeof style !== "object") continue;
			for(let key in style) {
				if(typeof style[key] !== "object") {
					result[key] = style[key]
				}
			}
		}

		let recurse = (obj: any, prefix: any[] = []) => {
			for(let key in obj) {
				if(typeof obj[key] === "object") {
					let parentSelectors = [...prefix, key]
					result = on(makeSelector(parentSelectors), obj[key])(result)
					recurse(obj[key], parentSelectors)
				}
			}
		}

		for(let i = 0; i < styles.length; i++) {
			recurse(styles[i])
		}

		return result
	}, [])

	let ctx = useMemo(() => ({ css, on, or, and, not, styleSheet }), [])

	useLayoutEffect(() => {
		if(typeof window === "undefined") return;

		let set = (s: string) =>
			document.documentElement.setAttribute("data-theme", s)

		switch(typeof props.colorTheme) {
			case "undefined":
				document.documentElement.removeAttribute("data-theme");
				break;
			case "string":
				set(props.colorTheme);
				break;
			case "object":
				colorModeQuery?.matches
					? set(props.colorTheme.dark ?? "dark")
					: set(props.colorTheme.light ?? "light")
		}

		let onChange = (e: MediaQueryListEvent) => {
			if(typeof props.colorTheme !== "object") return;
			if(e.matches) {
				set(props.colorTheme.dark ?? "dark")
			} else {
				set(props.colorTheme?.light ?? "light")
			}
		}

		colorModeQuery?.addEventListener("change", onChange)

		return () => void colorModeQuery?.removeEventListener("change", onChange)
	}, typeof props.colorTheme === "string"
		? [props.colorTheme, undefined]
		: [props.colorTheme?.dark, props.colorTheme?.dark]
	);

	return <>
		<style dangerouslySetInnerHTML={{__html: styleSheet() }} />
		<Tooltip.Provider delayDuration={825}>
			<StyleContext.Provider value={ctx}>
				{props.children}
			</StyleContext.Provider>
		</Tooltip.Provider>
	</>
}