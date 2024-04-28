import { useFrequency } from "@/context/frequency.context";
import { useTransition } from "@/context/transitions.context";
import { useEffect, useRef, useState } from "react";
import * as S from "./Sampling.styles";

const WIDTH = 3;
const AMPLITUDE = 100;
const RECTPHASE = Math.PI / 2; // Phase shift for rectangular wave

export default function Sampling() {
	const divRef = useRef<HTMLDivElement>(null);
	const [divWidth, setDivWidth] = useState(300);
	const [windowWidth, setWindowWidth] = useState(1000);
	const [divHeight, setDivHeight] = useState(1000);

	const { frequency, setFrequency } = useFrequency();

	const { transitions, setTransitions } = useTransition();

	const [path, setPath] = useState("");
	const [pathTo, setPathTo] = useState("");
	const [rectPath, setRectPath] = useState("");
	const [rectPathTo, setRectPathTo] = useState("");

	const [count, setCount] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prevCount) => prevCount + 1);
		}, 250);

		// Cleanup the interval on component unmount
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const points = [];
		const rectPoints = [];

		for (let y = 1000; y < 2000; y += 3) {
			// const damping =
			//   Math.pow(y - divHeight / 2, 2) / Math.pow(divHeight / 2, 2);
			const x = +(
				AMPLITUDE * Math.sin(frequency * y - (count * Math.PI) / 30)
			).toFixed(5);

			const auxX = +(y % 10 === 0) ? x : 0;
			rectPoints.push(`${auxX},${y}`);
			points.push(`${x},${y}`);
		}
		const rectauxpath = `M ${rectPoints}`;
		const auxpath = `M ${points}`;

		if (count === 0) setRectPath(rectauxpath);
		setRectPathTo(rectauxpath);
		setPathTo(auxpath);
	}, [frequency, divHeight, count, divWidth, windowWidth]);

	return (
		<S.WaveContainer ref={divRef}>
			<svg
				viewBox={`${-divWidth / 2} 1000 ${divWidth} 2000`}
				preserveAspectRatio="none "
			>
				{pathTo !== "" ? (
					<path
						d={pathTo}
						stroke="#000"
						strokeWidth={WIDTH}
						fill="none"
						preserveAspectRatio={"none"}
					/>
				) : (
					<></>
				)}
				{rectPathTo !== "" ? (
					<path
						d={rectPathTo}
						stroke="#000"
						strokeWidth={WIDTH}
						fill="none"
						preserveAspectRatio={"none"}
					/>
				) : (
					<></>
				)}
			</svg>
		</S.WaveContainer>
	);
}
