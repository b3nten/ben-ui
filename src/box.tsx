import { type MotionProps, motion } from "motion/react";
import {
	type ComponentPropsWithRef,
	type ElementType,
	createElement,
	use,
	useMemo,
} from "react";
import { type CSSSelectors, StyleContext } from "./uiprovider.tsx";
import { type DistributiveOmit, useMergedStyles } from "./util.ts";

type PolymorphicProps<T extends ElementType = ElementType> = {
	as?: T;
	css?: CSSSelectors;
};

export type BoxProps<C extends ElementType, Props = {}> = Props &
	PolymorphicProps<C> &
	DistributiveOmit<
		ComponentPropsWithRef<C>,
		keyof Props | keyof PolymorphicProps<C>
	> & {
		animated?: boolean;
		scale?: number | string;
	} & Omit<
		MotionProps,
		| "style"
		| "children"
		| "_dragX"
		| "_dragY"
		| "data-framer-appear-id"
		| "data-framer-portal-id"
		| "custom"
	>;

export let Box = <T extends ElementType = "div">(props: BoxProps<T>) => {
	let {
		css,
		style,
		as = "div",
		scale,
		animated: motionEnabled,
		...restProps
	} = props;

	(restProps as any).style = useMergedStyles(
		css && use(StyleContext).css(css),
		style,
		useMemo(() => ({ ["--scale"]: scale }), [scale]),
	);

	if (motionEnabled) {
		return createElement(motion[(as ?? "div") as "div"], restProps);
	}

	return createElement(as, restProps);
};
