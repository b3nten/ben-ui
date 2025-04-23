import { CSSProperties, useMemo } from "react";

export type DistributiveOmit<T, K extends keyof any> = T extends any
	? Omit<T, K>
	: never

export type Nullable<T> = T | null | undefined | void | 0 | false

export let useMergedStyles = (
	...styles: Array<Nullable<Record<string, any>>>
): CSSProperties => useMemo(
	() => Object.assign({}, ...styles), styles)

