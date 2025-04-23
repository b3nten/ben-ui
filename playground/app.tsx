import { Box, Button, tags } from "../src/mod.ts";
import { yStack } from "../src/tokens.ts";

export default () => (
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
		<Button color={"rose"} tooltip={"hello :)"} size={"sm"}>
			Click me
		</Button>
		<Button color={"neutral"} tooltip={"hello :)"} size={"md"}>
			Click me
		</Button>
		<Button color={"foam"} tooltip={"hello :)"} size={"md"} scale={2}>
			Click me
		</Button>
		<Button color={"pine"} tooltip={"hello :)"} size={"lg"}>
			Click me
		</Button>
	</Box>
)