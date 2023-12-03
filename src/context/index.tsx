import React, { createContext } from "react";
import IAppContext from "../interfaces/app";

const defAppContextVal: IAppContext = {
	state: 0,
	setState: () => {}
};
const AppContext = React.createContext<IAppContext>(defAppContextVal);

export { AppContext };