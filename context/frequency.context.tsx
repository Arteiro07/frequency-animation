"use client";
import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

type FrequencyContextType = {
	frequency: number;
	setFrequency: Dispatch<SetStateAction<number>>;
};
const defaultfrequency: FrequencyContextType = {
	frequency: 0.01,
	setFrequency: () => {},
};

const FrequencyContext = createContext<FrequencyContextType>(defaultfrequency);

export const FrequencyProvider = ({ children }: PropsWithChildren<{}>) => {
	const [frequency, setFrequency] = useState(0.01);

	return (
		<>
			<FrequencyContext.Provider
				value={{
					frequency,
					setFrequency,
				}}
			>
				{children}
			</FrequencyContext.Provider>
		</>
	);
};

export const useFrequency = () => {
	const context = useContext(FrequencyContext);
	return context;
};
