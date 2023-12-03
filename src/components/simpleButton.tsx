import React from "react";

function SimpleButton() {
	const doSomething = (e:React.MouseEvent) => {
		alert("Something done");
	};
	return (<button onClick={doSomething} type="button">Simple button</button>);
}

export default SimpleButton;