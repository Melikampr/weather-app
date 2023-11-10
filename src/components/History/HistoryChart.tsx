import React from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Bar,
    BarChart
} from 'recharts';
import {ChartData} from "@/types/ChartData";

//Show responsive chart
const HistoryChart: React.FC<{ data: ChartData[] }> = ({ data }) => (
    <div className="bg-light pt-5 rounded w-full">
        <div className="w-full h-56 lg:h-32">
            {/* Create a responsive container for the chart */}
            <ResponsiveContainer width="100%" height="100%">
                {/* Define a bar chart with data */}
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="minTemp" fill="#71c1e2"/>
                    <Bar dataKey="maxTemp" fill="#32a6d8"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default HistoryChart;