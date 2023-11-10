import React from 'react';
import {CiLocationOn} from "react-icons/ci";
import {getCurrentDate, setDate} from "@/utils/dateUtils";
import {useAPI} from "@/context/APIContext";


const CurrentWeather = () => {
    // Fetch weather data using the useAPI hook and context
    const {data} = useAPI();

    const url = data?.current.condition.icon

    return (
        <div>
            {/* Header */}
            <h2 className="mb-4 bg-light rounded-lg p-2 text-l w-full">Current Weather</h2>

            {data ? (
                //Card for displaying current data
                <div className="card bg-light shadow-xl text-base p-2">
                    <div className="flex justify-center card-title mt-7">
                        <div className="flex gap-1">
                            <CiLocationOn/>
                            <div className="text-base">{data.location.name + ", " + data.location.country}</div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-5">
                        <div>{data.current.temp_c}{'\u00b0'}</div>
                        <figure className="px-10 pt-2">
                            <img src={url} alt="WeatherIcon" className="rounded-xl"/>
                        </figure>
                        <div>{data.current.condition.text}</div>
                    </div>

                    <div className="card-body items-center text-center">
                        <p> {getCurrentDate(setDate(data.location.localtime))}</p>
                    </div>
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

export default CurrentWeather;