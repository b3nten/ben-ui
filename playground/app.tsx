import { Box, Button, tags } from "../src/mod.ts";
import { yStack } from "../src/tokens.ts";
import { useState } from "react";

export default () => {
	let [pending, setPending] = useState(false)
	let pend = () => {
		setPending(true)
		setTimeout(() => {
			setPending(false)
		}, 1000)
	}
	return (
		<Box
			css={{
				padding: "4rem",
				margin: "0 auto",
				...yStack({ gap: "1rem", align: "start" }),
			}}
		>
			<tags.h1
				css={{ fontSize: "5rem", marginBottom: "1rem" }}>
				Welcome to <br/> my own website
			</tags.h1>
			<Button
				color={"rose"}
				tooltip={"hello :)"}
				size={"sm"}
				pending={pending}
			>
				Size sm
			</Button>
			<Button
				color={"neutral"}
				tooltip={"hello :)"}
				size={"md"}
				onClick={pend}
				pending={pending}
			>
				Size md
			</Button>
			<Button color={"foam"} tooltip={"hello :)"} size={"md"} scale={1.125}>
				Scale 1.125
			</Button>
			<Button color={"pine"} tooltip={"hello :)"} size={"lg"}>
				Size lg
			</Button>
		</Box>
	)
}