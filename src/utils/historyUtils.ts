import { formatDate } from "@/utils/dateUtils";
import { HistoryData } from "@/types/ForecastData";
import { ChartData } from "@/types/ChartData"

// Generate an array of date strings for the last week
export function setDateArr(): string[] {
    let dateArr: string[] = [];
    let dateObj = new Date();
    let day;
    let month;
    let year;

// Subtract one day from current time
    for (let i = 0; i < 6; i++) {
        dateObj.setDate(dateObj.getDate() - 1);
        day = formatDate(dateObj.getDate().toString());
        month = formatDate((dateObj.getMonth() + 1).toString());
        year = dateObj.getFullYear().toString();
        dateArr.push(year + "-" + month + "-" + day)
    }
    return dateArr;
}


// Convert history data to chart data
export function getChartData(weekData: HistoryData[]): ChartData[] {
    return weekData.map((day) => {
        const date = day?.forecast.forecastday[0].date.split("-");
        const tempDate = date.slice(1).join("-");
        const data: ChartData = {
            date: tempDate,
            avgTemp: day.forecast.forecastday[0].day.avgtemp_c,
            maxTemp: day.forecast.forecastday[0].day.maxtemp_c,
            minTemp: day.forecast.forecastday[0].day.mintemp_c
        };
        return data
    });
}

// Sort chart data by date
export function sortHistoryData(weekData: ChartData[]): ChartData[] {
    return weekData.sort((a, b) => {
        const tempA = a.date.split("-");
        const tempB = b.date.split("-");
        if (tempA[0] > tempB[0]) {
            return 1;
        } else if (tempA[0] < tempB[0]) {
            return -1;
        } else {
            if (tempA[1] > tempB[1]) {
                return 1;
            } else if (tempA[1] < tempB[1]) {
                return -1;
            }
        }
        return 0;
    });
}