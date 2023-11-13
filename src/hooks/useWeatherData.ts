"use client"

import {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {setAstroData} from '@/utils/astroUtils';
import {useAPI} from '@/context/APIContext';
import {getLocation} from "@/utils/locationUtils";
import {useLocation} from "@/context/LocationContext";
import axios from 'axios';

// Constants for the API key and base URL
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + 'forecast.json';

// Define a custom hook for fetching weather data
function useWeatherData() {
    //To show errors to clients
    const [error, setError] = useState('');

    // Fetch weather data using the useAPI hook and context
    const {setData, isLoading, setLoading} = useAPI();
    const {setLocationCoords} = useLocation();

    // Extract the location query from the URL
    const searchParams = useSearchParams();
    const locationQuery = searchParams.get('q');
    // Fetch and update data when locationCoords change
    useEffect(() => {
        const fetchData = async () => {
            let locationCoords: string[] | null = null;

            try {
                locationCoords = await getLocation(locationQuery);
                setLocationCoords(locationCoords);

                //Show error to user if geolocation has problem
                if (locationCoords[2]) {
                    setError(locationCoords[2]);
                }

                try {
                    if (locationCoords) {
                        // Fetch weather data from the API
                        const response = await axios(`${API_BASE_URL}?key=${API_KEY}&q=${locationCoords[0]},${locationCoords[1]}&days=3&aqi=no&alerts=no`);
                        const data = response.data;
                        // Set astrological data using the utility function
                        setData(data);
                        setAstroData(data);
                        setLoading(false);
                    }
                } catch (error) {
                    setError(`Error fetching data. Please use proxy`);
                }
            } catch (error) {
                setError(`Error getting location data: ${error}`);
            }
        }

        // Call the fetchData function when locationQuery changes
        fetchData();
    }, [locationQuery]);

    return {isLoading, error};
}

export default useWeatherData;