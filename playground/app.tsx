import { Blockquote, Box, Button, Code, Heading, Link, Text, Textarea, Textbox } from "../src/mod.ts";
import { yStack } from "../src/tokens.ts";
import { useState } from "react";
import { Search, SunIcon } from "lucide-react";

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
			<Textbox
				ghost
				icon={<SunIcon />}
				button={<Search />}
				name={"text"}
			/>
			<Textarea
				ghost
				css={{
					width: "100%",
					height: "200px",
				}}
			/>
			<Heading size={0}>
				Hello world!
			</Heading>
			<Heading size={1}>
				Hello world!
			</Heading>
			<Heading size={2}>
				Hello world!
			</Heading>
			<Heading size={3}>
				Hello world!
			</Heading>
			<Heading size={4}>
				Hello world!
			</Heading>
			<Heading size={5}>
				Hello world!
			</Heading>
			<Heading size={6}>
				Hello world!
			</Heading>
			<Heading size={7}>
				Hello world!
			</Heading>
			<Heading size={8}>
				Hello world!
			</Heading>
			<Heading size={9}>
				Hello world!
			</Heading>
			<Heading size={10}>
				Hello world!
			</Heading>
			<Text color={"rose"} tooltip={"LOL"} size={3} scale={1}>
				Hello this is a text and <Code tooltip={"some code"}>code</Code> block!
			</Text>
			<Link href={"/foo"} color={"rose"}>
				Hello this is a link block!
			</Link>
			<Link href={"/bar"} color={"rose"} tooltip={"wow"}>
				Hello this is a link block!
			</Link>
			<Blockquote>
				"Ut nonummy habent soluta claritas veniam. Typi nunc soluta hendrerit mutationem sollemnes. Quis lius dolore et insitam vel. Aliquip consequat futurum claram ut mazim. Facilisi accumsan dolore ii imperdiet consequat. Claritatem aliquip quod putamus vulputate iusto. Doming minim typi zzril lius usus. In clari mutationem autem non sit. Qui augue mirum dynamicus gothica ut. Demonstraverunt processus soluta sequitur autem demonstraverunt."
			</Blockquote>
			<Button
				color={"rose"}
				tooltip={"hello :)"}
				size={"sm"}
				pending={pending}
			>
				Size sm
			</Button>
			<Button
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