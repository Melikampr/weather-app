import React from 'react';
import {ForecastDay} from "@/types/ForecastData";
import {dayOfWeek, getForecastDate, setDate} from "@/utils/dateUtils";


//Display a single forecast day
const ForecastCard = ({ day, index }: { day: ForecastDay; index: number }) => {
    //The names are retrieved from the API data.
    // Extract properties from the 'day' object
    const { date, day: { maxtemp_c, mintemp_c, condition: { icon } } } = day;

    return (
        <div className="lg:w-1/2 pb-0" key={index}>
            <div className="card bg-light rounded-box flex flex-row lg:flex-col gap-4 lg:content-between place-items-center justify-between p-3 mb-0">
                <div className="flex flex-col gap-3 lg:gap-1.5">
                    <div className="text-base bold">{dayOfWeek(setDate(date))}</div>
                    <div className="text-xs">{getForecastDate(setDate(date))}</div>
                </div>

                <div className="flex flex-col gap-3 text-sm">
                    <div>High: {maxtemp_c}</div>
                    <div>Low: {mintemp_c}</div>
                </div>

                <figure>
                    {/* Display the weather icon */}
                    <img src={icon} alt="weatherIcon" className="rounded-xl" />
                </figure>
            </div>
        </div>
    );
};

export default ForecastCard;