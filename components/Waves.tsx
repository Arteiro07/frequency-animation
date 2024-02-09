import { defaultpath } from "@/public/path";
import { Console } from "console";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSpring, animated } from "react-spring";
//import { defaultpath } from "@/public/path";

type SinWaveSVGProps = {
	frequency: number;
	amplitude: number;
	width: number;
	tension: number;
	mass: number;
	friction: number;
};
export const SinWaveSVGs: React.FC<SinWaveSVGProps> = ({
	frequency,
	amplitude,
	width,
	tension,
	mass,
	friction,
}) => {
	const divRef = useRef<HTMLDivElement>(null);
	const [divWidth, setDivWidth] = useState(0);
	const [divXorigin, setXOrigin] = useState(0);
	const [path, setPath] = useState(defaultpath);
	const resolution = window.innerHeight;
	const [count, setCount] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prevCount) => prevCount + 1);
		}, 250);

		// Cleanup the interval on component unmount
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const updateWidth = () => {
			if (divRef.current) {
				const { width } = divRef.current.getBoundingClientRect();
				setDivWidth(width);
			}
		};
		const updateXOrigin = () => {
			setXOrigin(0.75 * window.innerWidth);
		};
		// Call it once to get the initial width
		updateWidth();
		updateXOrigin();

		// Add a resize event listener to update the width on window resize
		window.addEventListener("resize", updateWidth);
		window.addEventListener("resize", updateXOrigin);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", updateXOrigin);
			window.removeEventListener("resize", updateWidth);
		};
	}, []);

	useEffect(() => {
		const points = [];
		for (let y = 0; y < resolution; y += 1) {
			const x = +(
				amplitude * Math.sin(frequency * y - (count * Math.PI) / 24)
			).toFixed(5);
			points.push(`${x},${y}`);
		}
		const auxpath = `M${points.join(" ")}`;
		setPath(auxpath);
	}, [frequency, resolution, amplitude, count]);

	const animationProps = useSpring({
		path: path,
		config: { tension: tension, mass: mass, friction: friction },
	});

	return (
		<div className="wave-container" ref={divRef}>
			<svg
				width={`${divWidth}`}
				height={`${resolution}`}
				viewBox={`${-divWidth / 2} 0 ${divWidth} ${resolution}`}
			>
				<animated.path
					d={animationProps.path}
					stroke="#000"
					strokeWidth={width}
					fill="none"
				/>
			</svg>
		</div>
	);
};
