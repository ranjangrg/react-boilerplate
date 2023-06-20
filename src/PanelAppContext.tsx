import React from "react";
import { PanelData, PanelAppState } from "./PanelAppData";

const defaultPanels: Array<PanelData> = [
	{ url: "https://picsum.photos/id/237/700/300" },
	{ url: "https://picsum.photos/700/300?grayscale" },
	{ url: "https://picsum.photos/700/300/?blur=2" }
];

const defaultAppState: PanelAppState = {
	state: {
		currentIdx: 0,
		panelsData: defaultPanels,
		panelCount: defaultPanels.length
	},
	changePanel: (newIdx) => {}
};

const PanelAppContext = React.createContext(defaultAppState);

export default PanelAppContext;