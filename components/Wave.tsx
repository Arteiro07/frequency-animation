"use client";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { useFrequency } from "@/context/frequency.context";
import { useTransition } from "@/context/transitions.context";
import * as S from "./Wave.styles";

const WIDTH = 3;

const Wave: React.FC = () => {
	const divRef = useRef<HTMLDivElement>(null);
	const [divWidth, setDivWidth] = useState(0);
	const [windowWidth, setWindowWidth] = useState(0);
	const [divHeight, setDivHeight] = useState(0);
	const [path, setPath] = useState("");
	const [pathTo, setPathTo] = useState("");
	const [count, setCount] = useState(0);
	const [vertical, setVertical] = useState(true);
	const [amplitude, setAmplitude] = useState(100);
	const [final, setFinal] = useState({ x: 0, y: 0 });
	const { frequency, setFrequency } = useFrequency();
	const { setTransitions } = useTransition();

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prevCount) => prevCount + 1);
		}, 250);

		// Cleanup the interval on component unmount
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const updateSize = () => {
			if (divRef.current) {
				const { width, height } = divRef.current.getBoundingClientRect();

				setWindowWidth(
					window.innerWidth ||
						document.documentElement.clientWidth ||
						document.body.clientWidth
				);
				setDivWidth(width);
				setDivHeight(height);
			}
		};

		// Call it once to get the initial width
		updateSize();

		// Add a resize event listener to update the width on window resize
		window.addEventListener("resize", updateSize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", updateSize);
		};
	}, []);

	useEffect(() => {
		const points = [];

		if (windowWidth < 1280) {
			setAmplitude(50);
			setVertical(false);

			if (divHeight !== 0) {
				for (let x = 0; x < divWidth; x += 1) {
					// const damping =
					//   Math.pow(x - divWidth / 2, 16) / Math.pow(divWidth / 2, 16);
					const y = +(
						amplitude * Math.sin(frequency * x - (count * Math.PI) / 30)
					).toFixed(5);

					points.push(`${x},${y}`);
				}

				const auxpath = `M ${points}`;

				if (count === 0) setPath(auxpath);
				setPathTo(auxpath);
			}
		} else {
			setVertical(true);
			setAmplitude(100);

			if (divHeight !== 0) {
				for (let y = 0; y < divHeight; y += 3) {
					// const damping =
					//   Math.pow(y - divHeight / 2, 2) / Math.pow(divHeight / 2, 2);
					const x = +(
						amplitude * Math.sin(frequency * y - (count * Math.PI) / 30)
					).toFixed(5);

					points.push(`${x},${y}`);
				}
				setTransitions((_transitions) => {
					_transitions[0] = { x: final.x, y: final.y };
					return [..._transitions]; // Return the modified array
				});
				const auxpath = `M ${points}`;

				if (count === 0) setPath(auxpath);
				setPathTo(auxpath);
			}
		}
	}, [frequency, divHeight, amplitude, count, divWidth, windowWidth]);

	const animationControls = useAnimation();

	const variants = useMemo(
		() => ({
			initial: { d: path },
			animate: { d: pathTo },
		}),
		[path, pathTo]
	);

	useEffect(() => {
		animationControls.start({
			d: path,
			transition: {
				type: "spring",
				duration: 0.5,
			},
		});
	}, [animationControls, path]);

	return (
		<>
			<S.FrequencyBoard>
				<button
					onClick={() => {
						setFrequency(frequency - 0.01);
					}}
				>
					-
				</button>
				<button
					onClick={() => {
						setFrequency(frequency + 0.01);
					}}
				>
					+
				</button>
			</S.FrequencyBoard>
			<S.WaveContainer ref={divRef}>
				<motion.svg
					viewBox={
						vertical
							? `${-divWidth / 2} 0 ${divWidth} ${divHeight}`
							: `0 ${-divHeight / 2} ${divWidth} ${divHeight}`
					}
					preserveAspectRatio="none "
				>
					{path !== "" ? (
						<motion.path
							d={path}
							stroke="#000"
							strokeWidth={WIDTH}
							fill="none"
							initial="initial"
							animate="animate"
							variants={variants}
							preserveAspectRatio={"none"}
						/>
					) : (
						<></>
					)}
				</motion.svg>
			</S.WaveContainer>
		</>
	);
};

export default Wave;
