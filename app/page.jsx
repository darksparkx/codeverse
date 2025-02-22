"use client";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

export default function Home() {
	const [inputFeatures, setInputFeatures] = useState({
		date: "",
		road: "",
		weather: "",
	});

	const [prediction, setPrediction] = useState(null);
	const [chartData, setChartData] = useState([]);

	const handleChange = (e) => {
		setInputFeatures({ ...inputFeatures, [e.target.name]: e.target.value });
	};

	const handlePredict = async () => {
		// Mock API call
		console.log(inputFeatures);
		// const response = await fetch("/api/predict", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify(inputFeatures),
		// });
		// const data = await response.json();
		// setPrediction(data.prediction);
		// setChartData([
		// 	...chartData,
		// 	{
		// 		date: inputFeatures.date,
		// 		time: inputFeatures.time,
		// 		density: data.prediction,
		// 	},
		// ]);
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-blue-50 to-purple-50">
			<div className="flex-col text-center">
				<p className=" text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 self-center font-head">
					Bangalore UTD Predictor
				</p>
				<p className=" mt-2 text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-black to-black self-center font-head">
					By Team BlackHawks
				</p>
			</div>
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start font-body">
				<div className="flex flex-col items-center justify-center p-4">
					<Card className="w-full max-w-[1200px] p-12 bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 ">
						<CardContent>
							<h2 className="text-2xl font-bold mb-6 text-gray-800">
								Traffic Density Prediction
							</h2>
							<div className="space-y-4">
								<div className="flex items-center gap-2">
									<Image
										src="/icons/calendar.svg"
										alt="Calendar icon"
										width={40}
										height={40}
										className="opacity-70"
									/>
									<Input
										type="date"
										name="date"
										placeholder="Date"
										onChange={handleChange}
										className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div className="flex items-center gap-2">
									<Image
										src="/icons/road.svg"
										alt="Road icon"
										width={40}
										height={40}
										className="opacity-70"
									/>
									<select
										name="road"
										onChange={handleChange}
										className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
										required
									>
										<option
											value=""
											hidden
										>
											Select Road
										</option>
										<option value="dry">
											100 Feet Road
										</option>
										<option value="wet">CMH Road</option>
										<option value="icy">
											Marathahalli Bridge
										</option>
										<option value="snowy">
											Sony World Junction
										</option>
										<option value="Sarjapur Road">
											Sarjapur Road
										</option>
										<option value="Trinity Circle">
											Trinity Circle
										</option>
										<option value="Anil Kumble Circle">
											Anil Kumble Circle
										</option>
										<option value="Jayanagar 4th Block">
											Jayanagar 4th Block
										</option>
										<option value="South End Circle">
											South End Circle
										</option>
										<option value="Hebbal Flyover">
											Hebbal Flyover
										</option>
										<option value="Ballari Road">
											Ballari Road
										</option>
										<option value="Yeshwanthpur Circle">
											Yeshwanthpur Circle
										</option>
									</select>
								</div>
								<div className="flex items-center gap-2">
									<Image
										src="/icons/cloud.svg"
										alt="Weather icon"
										width={40}
										height={40}
										className="opacity-70"
									/>
									<select
										name="weather" // Ensure this matches the key in your state
										onChange={handleChange}
										className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
										required // Optional: Makes the field required
									>
										<option
											value=""
											hidden
										>
											Select Weather Condition
										</option>
										<option value="Clear">Clear</option>
										<option value="Overcast">
											Overcast
										</option>
										<option value="Fog">Fog</option>
										<option value="Rain">Rain</option>
										<option value="Windy">Windy</option>
									</select>
								</div>

								<Button
									onClick={handlePredict}
									className="w-full p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
								>
									Predict
								</Button>
								{prediction && (
									<p className="mt-4 text-lg font-semibold text-gray-800">
										Predicted Traffic Density:
										<span className="text-blue-600">
											{prediction}
										</span>
									</p>
								)}
							</div>
						</CardContent>
					</Card>
					{chartData.length > 0 && (
						<div className="mt-8 w-full max-w-lg bg-white p-6 rounded-xl shadow-lg border border-gray-100">
							<h3 className="text-xl font-bold mb-4 text-gray-800">
								Traffic Density Over Time
							</h3>
							<LineChart
								width={400}
								height={300}
								data={chartData}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="time" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line
									type="monotone"
									dataKey="density"
									stroke="#8884d8"
									strokeWidth={2}
								/>
							</LineChart>
						</div>
					)}
				</div>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-700"
					href="/data"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/icons/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Data
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-700"
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/icons/window.svg"
						alt="Window icon"
						width={16}
						height={16}
					/>
					Source Code
				</a>
			</footer>
		</div>
	);
}
