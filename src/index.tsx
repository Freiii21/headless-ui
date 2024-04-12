import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";

import { App } from "App";
import globalStyles from "ui/style/globalStyles";
import { ErrorBoundary, StoreProvider } from "providers";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<>
		<ErrorBoundary>
			<BrowserRouter>
				<StoreProvider>
					<App />
				</StoreProvider>
			</BrowserRouter>
		</ErrorBoundary>
		<Global styles={globalStyles} />
	</>,
);
