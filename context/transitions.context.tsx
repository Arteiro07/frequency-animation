"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type Transition = {
	x: number;
	y: number;
};

type TransitionsContextType = {
	transitions: Transition[];
	setTransitions: React.Dispatch<React.SetStateAction<Transition[]>>;
};
const defaulttransition: TransitionsContextType = {
	transitions: [{ x: 0, y: 0 }],
	setTransitions: () => {},
};

const TransitionsContext =
	createContext<TransitionsContextType>(defaulttransition);

export const TransitionsProvider = ({ children }: PropsWithChildren<{}>) => {
	const [transitions, setTransitions] = useState<Transition[]>([
		{ x: 0, y: 0 },
	]);

	return (
		<>
			<TransitionsContext.Provider
				value={{
					transitions,
					setTransitions,
				}}
			>
				{children}
			</TransitionsContext.Provider>
		</>
	);
};

export const useTransition = () => {
	const context = useContext(TransitionsContext);
	return context;
};
