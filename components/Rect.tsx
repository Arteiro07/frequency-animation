import { useFrequency } from "@/context/frequency.context";
import { useTransition } from "@/context/transitions.context";
import { useEffect, useRef, useState } from "react";
import * as S from "./Rect.styles";

const WIDTH = 3;
const AMPLITUDE = 100;
const RECTPHASE = Math.PI / 2; // Phase shift for rectangular wave

export default function Rect() {
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
		let auxX = 0;

		for (let y = 2000; y < 3000; y += 1) {
			// const damping =
			//   Math.pow(y - divHeight / 2, 2) / Math.pow(divHeight / 2, 2);
			const x = +(
				AMPLITUDE * Math.sin(frequency * y - (count * Math.PI) / 30)
			).toFixed(5);

			if (y % 30 === 0) auxX = x;
			const auxXX = +(y % 30 === 0) ? 0 : auxX;
			rectPoints.push(`${auxXX},${y}`);
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
				viewBox={`${-divWidth / 2} 2000 ${divWidth} 3000`}
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
