import React, { MouseEventHandler, ReactEventHandler, useEffect } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

const defAppContextVal = {};
const AppContext = React.createContext(defAppContextVal);

const panels = [
	[25,25,385,405], [385,20,530,405], [545,15,875,400], [15,415,385,805]	// img A
	//[20,15,100,90], [230,100,330,190], [340,20,580,290]	// img B
];

enum ViewType { Panel, Page };

function App(props: any) {
	const appContext = React.useContext(AppContext);
	const canvasElemRef = React.useRef(document.getElementById("") as HTMLDivElement);
	const imgElemRef = React.useRef(document.getElementById("") as HTMLImageElement);
	const [appState, setAppState] = React.useState(null);
	const [canvasDims, setCanvasDims] = React.useState({ h: 0, w: 0 });
	const [imgDims, setImgDims] = React.useState({ h: 0, w: 0 });
	const [imgNatDims, setImgNatDims] = React.useState({ h: 0, w: 0 });
	const [imgResizeObsv, setImgResizeObsv] = React.useState(new ResizeObserver(() => { }));
	const [currView, setViewType] = React.useState(ViewType.Page);

	const imgLoadHandler = () => {
		const canvasElem: HTMLDivElement = canvasElemRef.current;
		const imgElem: HTMLImageElement = imgElemRef.current;
		let newCanvasDims = {
			h: canvasElem.clientHeight,
			w: canvasElem.clientWidth
		};
		let natDims = {
			h: imgElem.naturalHeight,
			w: imgElem.naturalWidth
		};
		setImgNatDims(natDims);
		setCanvasDims(newCanvasDims);
		imgResizeObsv.observe(imgElem);
	};
	useEffect(() => {
		const _imgResizeObsv = new ResizeObserver((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
			const imgElem: HTMLImageElement = imgElemRef.current;
			let currDims = {
				h: imgElem.clientHeight,
				w: imgElem.clientWidth
			};
			setImgDims(currDims);
		});
		setImgResizeObsv(_imgResizeObsv);
	}, []);

	const getScale = (): number => {
		return imgDims.h / imgNatDims.h;
	};

	const toggleView = (e: React.MouseEvent) => {
		if (currView === ViewType.Page) {
			const areaElem = e.target as HTMLAreaElement;
			// only do this for <area> components not <img>
			if (areaElem.coords == null) { return; }
			const pd = areaElem.coords.split(",");
			setViewType(ViewType.Panel);
			const midPointX = (Number(pd[0]) + Number(pd[2])) / 2;
			const midPointY = (Number(pd[1]) + Number(pd[3])) / 2;
			imgElemRef.current.style.scale = "2";
			imgElemRef.current.style.transformOrigin = `${midPointX}px ${midPointY}px`;
		} else {
			setViewType(ViewType.Page);
			const newScale = imgNatDims.h / canvasDims.h
			imgElemRef.current.style.scale = `${newScale}`;
		}
	};

	return (<AppContext.Provider value={{}}><div className="comic-app-container">
		<h1> App title: {currView === ViewType.Page ? "Page" : "Panel"} view</h1>
		<div>
			<span> Canvas: ({canvasDims.h}, {canvasDims.w}) </span>
			<span> Original: ({imgNatDims.h}, {imgNatDims.w}) </span>
			<span> Current: ({imgDims.h}, {imgDims.w}) </span>
			<span> Scale: {getScale()} </span>
		</div>
		<div className="img-container" ref={canvasElemRef}>
			<img onLoad={imgLoadHandler} ref={imgElemRef}
				onClick={toggleView}
				useMap="#panels-grid-map" src="/images/catman.jpg"></img>
			<map name="panels-grid-map">
				{panels.map((pd, idx) => {
					let normalisedCoords = pd.map((cd) => cd * getScale());
					return (<area key={idx}
						shape="rect" coords={normalisedCoords.toString()}
						onClick={toggleView}
						title={`Panel-${idx}`} href="#idx" />);
				})}
			</map>
		</div>
	</div>
	</AppContext.Provider>);
}

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(<App />);