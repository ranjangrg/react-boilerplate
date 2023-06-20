import React from "react";
import { createRoot } from "react-dom/client";
import { PanelData } from "./PanelAppData";
import PanelAppContext from "./PanelAppContext";

import PanelViewer from "./PanelViewer";

import "./index.css";

function App(props: any) {
	const panelAppContext = React.useContext(PanelAppContext);
	const [panelAppState, setCurrentIdx] = React.useState(panelAppContext.state);
	const changePanel = (newIdx: number) => {
		let newState = {...panelAppState};
		newState.currentIdx = newIdx;
		setCurrentIdx(newState);
	};
	return (<PanelAppContext.Provider value={{state: panelAppState, changePanel}}><div className="comic-app-container">
		<h1> App title </h1>
		<PanelViewer />
	</div>
	</PanelAppContext.Provider>);
}

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(<App />);