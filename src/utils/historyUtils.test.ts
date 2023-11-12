import { setDateArr, getChartData, sortHistoryData } from './historyUtils';
import {HistoryData, ForecastDay} from "@/types/ForecastData";
import { ChartData } from "@/types/ChartData"

describe('historyUtils', () => {
    it('setDateArr should return an array of date strings for the last week', () => {
        const dateArr = setDateArr();
        expect(dateArr).toHaveLength(6);
    });

    it('getChartData should convert history data to chart data', () => {
        const mockForecastDay = {
            date: '2022-01-01',
            day: {
                maxtemp_c: 25,
                mintemp_c: 15,
                avghumidity: 50,
                avgtemp_c: 20,
                avgvis_km: 10,
                condition: {
                    text: 'Sunny',
                    code: 1000,
                    icon: 'https://via.placeholder.com/150',
                },
            }
        } as ForecastDay;

        const historyData = {
            forecast: {
                forecastday: [mockForecastDay]
            },
        } as HistoryData;

        
        const mockHistoryData: HistoryData[] = [
            historyData
        ];
        const expectedChartData: ChartData[] = [
            {
                date: '01-01',
                avgTemp: 20,
                maxTemp: 25,
                minTemp: 15
            }
        ];
        expect(getChartData(mockHistoryData)).toEqual(expectedChartData);
    });

    it('sortHistoryData should sort chart data by date', () => {
        const mockChartData: ChartData[] = [
            { date: '02-01', avgTemp: 20, maxTemp: 25, minTemp: 15 },
            { date: '01-01', avgTemp: 20, maxTemp: 25, minTemp: 15 }
        ];
        const sortedChartData: ChartData[] = [
            { date: '01-01', avgTemp: 20, maxTemp: 25, minTemp: 15 },
            { date: '02-01', avgTemp: 20, maxTemp: 25, minTemp: 15 }
        ];
        expect(sortHistoryData(mockChartData)).toEqual(sortedChartData);
    });
});