"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";

export default function CsvViewer() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/data/data.csv")
			.then((response) => response.text())
			.then((csvText) => {
				Papa.parse(csvText, {
					header: true,
					dynamicTyping: true,
					complete: (results) => {
						setData(results.data);
						setLoading(false);
					},
				});
			});
	}, []);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Bangalore Traffic Data</h1>
			{loading ? (
				<div className="flex justify-center items-center h-screen">
					{/* Loading Spinner */}
					<div className="w-10 h-10 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
				</div>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border border-gray-300">
						<thead className="bg-gray-100">
							<tr>
								{Object.keys(data[0]).map((header) => (
									<th
										key={header}
										className="px-4 py-2 border border-gray-300 text-left text-sm font-semibold text-gray-700"
									>
										{header}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((row, index) => (
								<tr
									key={index}
									className={
										index % 2 === 0
											? "bg-gray-50"
											: "bg-white"
									}
								>
									{Object.values(row).map((value, i) => (
										<td
											key={i}
											className="px-4 py-2 border border-gray-300 text-sm text-gray-700"
										>
											{value}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
