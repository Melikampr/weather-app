import {render, screen} from '@testing-library/react';
import {useAPI} from '@/context/APIContext';
import ForecastWeather from './ForecastWeather';
import {ForecastDay} from '@/types/ForecastData';

jest.mock('@/context/APIContext');

const mockForecastDay = {
    date: '2022-01-01',
    day: {
        maxtemp_c: 30,
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

const mockData = {
    forecast: {
        forecastday: [mockForecastDay, mockForecastDay, mockForecastDay]
    }
};

describe('ForecastWeather', () => {
    test('renders forecast cards when data is available', () => {
        (useAPI as jest.Mock).mockReturnValue({data: mockData});

        render(
            <ForecastWeather/>
        );
        const forecastCards = screen.getAllByTestId('forecast-card');
        expect(forecastCards).toHaveLength(2); // Skips the current day's forecast
    });

});