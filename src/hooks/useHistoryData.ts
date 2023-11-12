"use client"

import {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {HistoryData} from '@/types/ForecastData';
import {setDateArr} from '@/utils/historyUtils';
import {useLocation} from "@/context/LocationContext";
import axios from "axios";

// Constants for the API key and base URL
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + 'history.json';

export function useHistoryData() {
    //To show errors to clients
    const [error, setError] = useState('');

    const {locationCoords} = useLocation();

    // Extract the location query from the URL
    const searchParams = useSearchParams();
    const locationQuery = searchParams.get('q');

    // State to store the historical weather data for the week
    const [weekData, setWeekData] = useState<HistoryData[]>([]);

    // Fetch and update data when locationCoords change
    useEffect(() => {
        const fetchData = async () => {

            try {
                const tempWeekData: HistoryData[] = [];

                // Fetch historical weather data for each date in the date range
                for (const date of setDateArr()) {
                    try {
                        if (locationCoords) {
                            const response = await axios(`${API_BASE_URL}?key=${API_KEY}&q=${locationCoords[0]},${locationCoords[1]}&dt=${date}`);
                            const data =  response.data;
                            tempWeekData.push(data);
                        }
                    } catch (error) {
                        setError(`Error fetching data for date ${date}: ${error}`);
                    }
                }

                // Update the weekData state with the fetched data
                setWeekData(tempWeekData);
            } catch (error) {
                setError(`Error getting location data: ${error}`);
            }
        }

        // Call the fetchData function when locationQuery changes
        fetchData();
    }, [locationQuery]);


    // Return the historical weather data for the week
    return {weekData, error};
}