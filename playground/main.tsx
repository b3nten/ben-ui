import "../src/styles.scss"

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./app.tsx";
import { UIProvider } from "../src/mod.ts";

createRoot(document.querySelector("app-root")!)
	.render(
		<StrictMode>
			<UIProvider>
				<App />
			</UIProvider>
		</StrictMode>
	)