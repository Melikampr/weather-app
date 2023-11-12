import React from 'react';
import {useAPI} from '@/context/APIContext';
import {ForecastDay} from "@/types/ForecastData";
import ForecastCard from "@/components/Forecast/ForecastCard";

// Display the forecast weather
const ForecastWeather = () => {
    // Fetch weather data using the useAPI hook and context
    const {data} = useAPI();

    return (
        <div>
            {/* Header */}
            <h2 className="mb-4 bg-light rounded-lg p-2 text-l">Forecast</h2>
            {data ? (
                <div className="flex flex-col lg:flex-row lg:justify-between w-full gap-7 mb-0">
                    {/*Skip current day info as index 0*/}
                    {data.forecast.forecastday.slice(1).map((day: ForecastDay, index: number) => (
                            <ForecastCard key={index} day={day} index={index}/>
                        )
                    )}
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

export default ForecastWeather;