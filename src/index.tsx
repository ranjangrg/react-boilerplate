import React, { MouseEventHandler, ReactEventHandler, useEffect } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

const defAppContextVal = {};
const AppContext = React.createContext(defAppContextVal);

function App(props: any) {
	const appContext = React.useContext(AppContext);
	const elemRef = React.useRef(document.getElementById("") as HTMLElement);

	const [state, setState] = React.useState(null);

	useEffect(() => {
		// code for re-rendering component; use proper variables as dependencies
	}, []);

	return (<AppContext.Provider value={{}}>
		<h1> App title </h1>
	</AppContext.Provider>);
}

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(<App />);
