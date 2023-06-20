interface PanelData {
	url: string;
}

interface PanelAppState {
	state: {
		currentIdx: number;
		panelCount: number;
		panelsData: Array<PanelData>;
	},
	changePanel(newIdx: number): any;
}

export { PanelData, PanelAppState };