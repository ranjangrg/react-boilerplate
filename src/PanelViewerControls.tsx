import React from "react";
import PanelAppContext from "./PanelAppContext";

function PanelViewerControls() {
	const panelAppState = React.useContext(PanelAppContext);
	console.log(panelAppState);
	const nextPanel = () => {
		let currentPanelIdx = panelAppState.state.currentIdx;
		//let newPanelIdx = ((panelAppState.state.currentIdx + 1) > (panelAppState.state.panelCount - 1)) ? currentPanelIdx + 1 : currentPanelIdx;
		let newPanelIdx = (currentPanelIdx + 1) % panelAppState.state.panelCount;
		panelAppState.changePanel(newPanelIdx === 0 ? currentPanelIdx : newPanelIdx);
	};
	const prevPanel = () => {
		let currentPanelIdx = panelAppState.state.currentIdx;
		let newPanelIdx = (currentPanelIdx - 1);
		panelAppState.changePanel(newPanelIdx < 0 ? currentPanelIdx : newPanelIdx);
	};
	return (<div className="panel-viewer-controls">
		<ul>
			<li><button type="button" onClick={prevPanel}>Back</button></li>
			<li><button type="button" onClick={nextPanel}>Forward</button></li>
		</ul>
	</div>);
}

export default PanelViewerControls;