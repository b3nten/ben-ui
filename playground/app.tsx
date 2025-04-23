import { Box, Button, Heading, tags, Text } from "../src/mod.ts";
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
			<Heading scale={0}>
				Hello world!
			</Heading>
			<Heading scale={1}>
				Hello world!
			</Heading>
			<Heading scale={2}>
				Hello world!
			</Heading>
			<Heading scale={3}>
				Hello world!
			</Heading>
			<Heading scale={4}>
				Hello world!
			</Heading>
			<Heading scale={5}>
				Hello world!
			</Heading>
			<Heading scale={6}>
				Hello world!
			</Heading>
			<Heading scale={7}>
				Hello world!
			</Heading>
			<Heading scale={8}>
				Hello world!
			</Heading>
			<Heading scale={9}>
				Hello world!
			</Heading>
			<Heading scale={10}>
				Hello world!
			</Heading>
			<Text>
				Hello this is a text block!
			</Text>
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