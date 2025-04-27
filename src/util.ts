import {
	type CSSProperties,
	type PropsWithChildren,
	ReactNode,
	createElement,
	useMemo,
} from "react";
import { ThemeProvider } from "./themeprovider.tsx";

export type DistributiveOmit<T, K extends keyof any> = T extends any
	? Omit<T, K>
	: never;

export type Nullable<T> = T | null | undefined | void | 0 | false;

export type ValueType = string | number | boolean | null | undefined;

export let useMergedStyles = (
	...styles: Array<Nullable<Record<string, any>>>
): CSSProperties => useMemo(() => Object.assign({}, ...styles), styles);

let cache: Record<string, any> = {};
export let useCache = <T>(key: string, fn: () => T, deps: Array<ValueType>) => {
	let _key = `${key}::${deps.join("::")}`;
	if (!cache[_key]) {
		return (cache[_key] = fn());
	}
	return cache[_key];
};

export let WithTheme = (props: PropsWithChildren<{ color?: string }>) =>
	props.color ? createElement(ThemeProvider, props) : props.children;
