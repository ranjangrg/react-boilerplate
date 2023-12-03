import React, { MouseEventHandler, ReactEventHandler, useEffect } from "react";
import { createRoot } from "react-dom/client";

// import CSS
import "./index.css";

// import context
import { AppContext } from "./context";

// import components
import SimpleButton from "./components/simpleButton";
import ContextChangeButton from "./components/contextChangeButton";

function App(props: any) {
	const appContext = React.useContext(AppContext);
	const elemRef = React.useRef(document.getElementById("") as HTMLElement);

	const [state, setState] = React.useState<number>(0);

	useEffect(() => {
		// code for re-rendering component; use proper variables as dependencies
	}, []);

	return (<AppContext.Provider value={{
		state: state,
		setState: setState
	}}>
		<h1> Basic react app </h1>
		<article>
			<h2> App state: {state} </h2>
		</article>
		<div>
			<SimpleButton />
			<ContextChangeButton />
		</div>
	</AppContext.Provider>);
}

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(<App />);
