import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {useHistoryData} from '@/hooks/useHistoryData';
import HistoryDetails from './HistoryDetails';
import {getChartData, sortHistoryData} from '@/utils/historyUtils';
import {ForecastDay, HistoryData} from "@/types/ForecastData";


jest.mock('@/hooks/useHistoryData');

describe('HistoryDetails', () => {
    beforeEach(() => {
        Object.defineProperty(global, "ResizeObserver", {
            writable: true,
            value: jest.fn().mockImplementation(() => ({
                observe: jest.fn(() => "Mocking works"),
                unobserve: jest.fn(),
                disconnect: jest.fn(),
            })),
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('displays loading indicator when data is not available', () => {
        (useHistoryData as jest.Mock).mockReturnValue({
            weekData: null,
            error: null,
        });

        render(<HistoryDetails/>);

        expect(screen.getByTestId('history-loading')).toBeInTheDocument();
    });

    test('displays error message when there is an error', () => {
        const errorMessage = 'An error occurred';
        (useHistoryData as jest.Mock).mockReturnValue({
            weekData: null,
            error: errorMessage,
        });

        render(<HistoryDetails/>);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('displays chart when data is available', async () => {
        const mockForecastDay = {
            date: '2022-01-01',
            day: {
                maxtemp_c: 20,
                mintemp_c: 10,
                avghumidity: 50,
                avgtemp_c: 15,
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

        const weekData = [historyData, historyData, historyData, historyData, historyData, historyData];
        const chartData = getChartData(weekData);
        const sortedWeekData = sortHistoryData(chartData);

        (useHistoryData as jest.Mock).mockReturnValue({
            weekData,
            error: null,
        });

        render(<HistoryDetails/>);

        await waitFor(() => expect(screen.getByText('Last Week')).toBeInTheDocument());
    });
});