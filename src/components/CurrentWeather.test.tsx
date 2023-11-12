import React from 'react';
import {render, screen} from '@testing-library/react';
import {useAPI} from '@/context/APIContext';
import CurrentWeather from './CurrentWeather';

jest.mock('@/context/APIContext');

describe('CurrentWeather', () => {
    test('renders Current Weather header', () => {
        (useAPI as jest.Mock).mockReturnValue({data: null});
        render(<CurrentWeather/>);
        expect(screen.getByText('Current Weather')).toBeInTheDocument();
    });

    test('renders error message when no data is available', () => {
        (useAPI as jest.Mock).mockReturnValue({data: null});
        render(<CurrentWeather/>);
        expect(screen.getByText('Error! There is no data...')).toBeInTheDocument();
    });

    test('renders weather data when available', () => {
        const mockData = {
            location: {
                name: 'Test City',
                country: 'Test Country',
                localtime: '2022-01-01 12:00',
            },
            current: {
                temp_c: 20,
                condition: {
                    text: 'Sunny',
                    icon: 'test-icon-url',
                },
            },
        };
        (useAPI as jest.Mock).mockReturnValue({data: mockData});
        render(<CurrentWeather/>);
        expect(screen.getByText('Test City, Test Country')).toBeInTheDocument();
        expect(screen.getByText('20\u00b0')).toBeInTheDocument();
        expect(screen.getByText('Sunny')).toBeInTheDocument();
        expect(screen.getByAltText('WeatherIcon')).toHaveAttribute('src', 'test-icon-url');
    });
});