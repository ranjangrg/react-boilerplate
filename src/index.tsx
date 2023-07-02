import React, { MouseEventHandler, ReactEventHandler, useEffect } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

const defAppContextVal = {};
const AppContext = React.createContext(defAppContextVal);

const panels = [
	[25,25,385,405], [385,20,530,405], [545,15,875,400], [15,415,385,805], [540,815,880,1210]	// img A
	//[20,15,100,90], [230,100,330,190], [340,20,580,290]	// img B
];

enum ViewType { Panel, Page };

function App(props: any) {
	const appContext = React.useContext(AppContext);
	const canvasElemRef = React.useRef(document.getElementById("") as HTMLDivElement);
	const imgElemRef = React.useRef(document.getElementById("") as HTMLImageElement);

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

	const updateImgDims = () => {
		const imgElem: HTMLImageElement = imgElemRef.current;
		let currDims = {
			h: imgElem.clientHeight,
			w: imgElem.clientWidth
		};
		setImgDims(currDims);
	};
	useEffect(() => {
		const _imgResizeObsv = new ResizeObserver((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
			updateImgDims();
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
			// const midPointX = (Number(pd[0]) + Number(pd[2])) / 2;
			// const midPointY = (Number(pd[1]) + Number(pd[3])) / 2;
			const panelHeight = Number(pd[3]) - Number(pd[1]);
			const panelWidth = Number(pd[2]) - Number(pd[0]);
			
			// find the proper scaling factor to use so that
			// the panel fills the canvas fully by height
			console.log(`Panel: {h: ${Math.round(panelHeight)}, w: ${Math.round(panelWidth)}}`);
			console.log(`const scaleFactor = ${canvasDims.h} / ${panelHeight};`);
			
			//scaleFactor = canvasDims.h / (Number(pd[3]) - Number(pd[1]));
			const scaleFactor = canvasDims.h / panelHeight;
			console.log(`Scalefactor: ${scaleFactor}`);

			imgElemRef.current.style.scale = scaleFactor.toString();
			//imgElemRef.current.style.transformOrigin = `${midPointX}px ${midPointY}px`;
			imgElemRef.current.style.transformOrigin = `top left`;
			imgElemRef.current.style.transform = `translate(-${Number(pd[0])}px, -${Number(pd[1])}px)`;
			setImgDims({h: imgNatDims.h * scaleFactor, w: imgNatDims.w * scaleFactor});
		} else {
			setViewType(ViewType.Page);
			const newScale = canvasDims.h / imgNatDims.h;	// scaling only based on height
			imgElemRef.current.style.scale = "1";	// 1 is the default scaling used
			imgElemRef.current.style.transform = "translate(0px, 0px)";
			setImgDims({h: imgNatDims.h * newScale, w: imgNatDims.w * newScale});
		}
	};

	return (<AppContext.Provider value={{}}><div className="comic-app-container">
		<h1> App title: {currView === ViewType.Page ? "Page" : "Panel"} view</h1>
		<div>
			<span> Canvas: ({canvasDims.h}, {canvasDims.w}) </span>
			<span> Original: ({imgNatDims.h}, {imgNatDims.w}) </span>
			<span> Current: ({Math.round(imgDims.h)}, {Math.round(imgDims.w)}) </span>
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