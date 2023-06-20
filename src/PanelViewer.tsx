import React from "react";
import PanelAppContext from "./PanelAppContext";

import "./panel-viewer.css";

import PanelViewerControls from "./PanelViewerControls";

function PanelViewer() {
	const panelAppState = React.useContext(PanelAppContext);
	const currentImage = panelAppState.state.panelsData[panelAppState.state.currentIdx];
	return (<div className="panel-viewer-container">
		<div className="panel-viewer-title">
			<h2>Panel Viewer: Panel {panelAppState.state.currentIdx + 1} of {panelAppState.state.panelCount} </h2>
		</div>
		<div className="panel-viewer-img"><img src={currentImage.url}></img></div>
		<PanelViewerControls />
	</div>);
}

export default PanelViewer;