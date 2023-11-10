import React from 'react';
import { useAPI } from "@/context/APIContext";
import DayCard from "@/components/Today/DayCard";
import {
    FaTemperatureArrowUp,
    FaTemperatureArrowDown,
} from "react-icons/fa6";
import { WiHumidity, WiSandstorm, WiRain, WiSnow } from "react-icons/wi";

//Show Day highlights
const DayDetails = () => {
    // Fetch weather data using the useAPI hook and context
    const {data} = useAPI();
    const todayForecast = data?.forecast.forecastday[0]?.day;

    // Array containing weather details to display
    const weatherDetails = [
        {
            title: "Max Temp",
            Icon: FaTemperatureArrowUp,
            value: `${todayForecast?.maxtemp_c}°`,
            size: "1.2rem",
        },
        {
            title: "Min Temp",
            Icon: FaTemperatureArrowDown,
            value: `${todayForecast?.mintemp_c}°`,
            size: "1.2rem",
        },
        {
            title: "Humidity",
            Icon: WiHumidity,
            value: `${todayForecast?.avghumidity}%`,
            size: "1.5rem",
        },
        {
            title: "Wind",
            Icon: WiSandstorm,
            value: `${todayForecast?.avgvis_km} km/h`,
            size: "1.5rem",
        },
        {
            title: "Rain",
            Icon: WiRain,
            value: `${todayForecast?.daily_chance_of_rain}%`,
            size: "1.5rem",
        },
        {
            title: "Snow",
            Icon: WiSnow,
            value: `${todayForecast?.daily_chance_of_snow}%`,
            size: "1.5rem",
        },
    ];

    return (
        <div>
            {/* Header */}
            <h2 className="mb-4 bg-light rounded-lg p-2 text-l">Today Highlights</h2>

            {data ? (
                // Display weather details if data is available
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-3 text-sm">
                    {weatherDetails.map((detail, index) => (
                        // Display each weather detail using the DayCard component
                        <DayCard
                            key={index}
                            title={detail.title}
                            Icon={detail.Icon}
                            value={detail.value}
                            size={detail.size}
                        />
                    ))}
                </div>
            ) : (
                // Show a message if no data is available
                <div className="alert alert-error">
                    <span>Error! There is no data...</span>
                </div>
            )}
        </div>
    );
};

export default DayDetails;