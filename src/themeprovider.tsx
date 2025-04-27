import { type PropsWithChildren, createContext, useContext } from "react";

export const ThemeContext = createContext<{ color: string }>({
	color: "neutral",
});

export type ThemeProps = {
	color?: string;
};

export let ThemeProvider = (props: PropsWithChildren<ThemeProps>) => {
	let parent = useContext(ThemeContext);
	return (
		<ThemeContext.Provider
			value={{ color: props.color ?? parent.color ?? "neutral" }}
		>
			{props.children}
		</ThemeContext.Provider>
	);
};
