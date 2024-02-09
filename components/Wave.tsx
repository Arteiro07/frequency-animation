import { Console } from "console";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSpring, animated } from "react-spring";
import { path } from "@/public/path";

type SinWaveSVGProps = {
	frequency: number;
	amplitude: number;
	width: number;
	tension: number;
	mass: number;
	friction: number;
};
export const SinWaveSVG: React.FC<SinWaveSVGProps> = ({
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
	const [swing, setSwing] = useState(0);
	const [paths, setPaths] = useState([path, path]);
	const [newPathData, setNewPathData] = useState("");
	const resolution = window.innerHeight;
	const dampening = 1;

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

	const defaultPathData = useMemo(() => {
		const points = [];

		for (let y = 0; y < resolution; y += 1) {
			const x = amplitude * Math.sin(frequency * y);
			points.push(`${x},${y}`);
		}

		const path = `M${points.join(" ")}`;
		return path;
	}, [frequency, resolution, amplitude]);

	const animationProps = useSpring({
		path: paths[swing],
		config: { tension: tension, mass: mass, friction: friction },
	});

	useEffect(() => {
		setPaths([defaultPathData, newPathData]);
	}, [defaultPathData, newPathData]);

	const calculateNewPath: (mouseX: number, mouseY: number) => void = (
		mouseX,
		mouseY
	) => {
		setSwing(1);
		const points = [];

		for (let y = 0; y < resolution; y += 1) {
			const x =
				amplitude * Math.sin(frequency * y) -
				(divXorigin - mouseX) *
					(1 - Math.abs(y - mouseY) / resolution) *
					dampening;
			points.push(`${x},${y}`);
		}

		const path = `M${points.join(" ")}`;
		setNewPathData(path);
	};

	return (
		<div className="wave-container" ref={divRef}>
			<svg
				width={`${divWidth}`}
				height="100%"
				viewBox={`${-divWidth / 2} 0 ${divWidth} ${resolution}`}
			>
				<animated.path
					d={animationProps.path}
					stroke="#000"
					strokeWidth={width}
					fill="none"
				/>
			</svg>
			<div
				className="mouse-container"
				onMouseMove={(e) => {
					calculateNewPath(e.clientX, e.clientY);
				}}
				onMouseLeave={() => setSwing(0)}
			></div>
		</div>
	);
};
