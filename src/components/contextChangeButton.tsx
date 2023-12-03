import React, { useContext } from "react";
import { AppContext } from "../context";

function ContextChangeButton() {
	// access the context first
	const appContext = useContext(AppContext);

	const doSomething = (e:React.MouseEvent) => {
		appContext.setState(appContext.state + 1);
	};
	return (<button onClick={doSomething} type="button">Change context</button>);
}

export default ContextChangeButton;