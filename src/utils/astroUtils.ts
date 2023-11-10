import {ForecastData} from "@/types/ForecastData";

// Define the astroArr with initial values
export const astroArr = [
    {
        name: "Sunrise",
        value: ""
    },
    {
        name: "Sunset",
        value: ""
    },
    {
        name: "Moonrise",
        value: ""
    },
    {
        name: "Moonset",
        value: ""
    },
];

// Update values of astroArr
export function setAstroData(data : ForecastData) {
    const astroData = data.forecast.forecastday[0].astro;

    // Extract the keys from the astroData
    const keys = Object.keys(astroData);

    // Update values in astroArr based on the keys
    astroArr.slice(0, 4).forEach((astroItem, index) => {
        const key = keys[index];
        if (key) {
            astroItem.value = astroData[key];
        }
    });
}