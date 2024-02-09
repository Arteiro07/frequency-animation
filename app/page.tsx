"use client";
import { useState } from "react";
import { SinWaveSVGs } from "@/components/Waves";

export default function Home() {
	const [freq, setFreq] = useState("0.01");
	const [color, setColor] = useState("#111111");
	const [width, setWidth] = useState("3");
	const [tension, setTension] = useState("500");
	const [amplitude, setAmplitude] = useState("100");
	const [mass, setMass] = useState("100");
	const [friction, setFriction] = useState("500");

	return (
		<>
			<div>Hello world</div>
			<input
				type="range"
				id="freq"
				name="freq"
				className="freq-slider"
				min={0}
				step={0.01}
				max={0.1}
				defaultValue={freq}
				onChange={(e) => setFreq(e.target.value)}
			/>
			<>Frequency:{freq}</>
			<br></br>
			<input
				type="color"
				defaultValue={color}
				onChange={(e) => setColor(e.target.value)}
			/>
			<>Color: {color}</>
			<br></br>
			<input
				type="range"
				id="width"
				name="width"
				min={0}
				max={10}
				defaultValue={width}
				onChange={(e) => setWidth(e.target.value)}
			/>
			<>Width: {width}</>
			<br></br>
			<input
				type="range"
				id="amplitude"
				name="amplitude"
				min={0}
				max={100}
				defaultValue={amplitude}
				onChange={(e) => setAmplitude(e.target.value)}
			/>
			<>Amplitude: {amplitude}</>
			<br></br>
			<input
				type="range"
				id="tension"
				name="tension"
				min={0}
				max={1000}
				defaultValue={tension}
				onChange={(e) => setTension(e.target.value)}
			/>
			<>tension: {tension}</>
			<br></br>
			<input
				type="range"
				id="friction"
				name="friction"
				min={0}
				max={1000}
				defaultValue={friction}
				onChange={(e) => setFriction(e.target.value)}
			/>
			<>Friction: {friction}</>
			<br></br>
			<input
				type="range"
				id="mass"
				name="mass"
				min={0}
				max={1000}
				defaultValue={mass}
				onChange={(e) => setMass(e.target.value)}
			/>
			<>Mass: {mass}</>
			<br></br>

			<SinWaveSVGs
				width={Number(width)}
				frequency={Number(freq)}
				amplitude={Number(amplitude)}
				tension={Number(tension)}
				mass={Number(mass)}
				friction={Number(friction)}
			/>
		</>
	);
}
