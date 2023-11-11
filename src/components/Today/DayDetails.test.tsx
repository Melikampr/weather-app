import React from 'react';
import {render, screen} from '@testing-library/react';
import {useAPI} from '@/context/APIContext';
import DayDetails from './DayDetails';

jest.mock('@/context/APIContext');

describe('DayDetails', () => {
    const mockData = {
        forecast: {
            forecastday: [
                {
                    day: {
                        maxtemp_c: 30,
                        mintemp_c: 20,
                        avghumidity: 50,
                        avgvis_km: 10,
                        daily_chance_of_rain: 40,
                        daily_chance_of_snow: 0,
                    }
                }
            ]
        }
    };

    test('renders without crashing', () => {
        (useAPI as jest.Mock).mockReturnValue({data: null});
        render(<DayDetails/>);
        expect(screen.getByText('Today Highlights')).toBeInTheDocument();
    });


    it('displays the correct weather details', () => {
        (useAPI as jest.Mock).mockReturnValue({data: mockData});
        render(<DayDetails/>);

        expect(screen.getByText('Max Temp')).toBeInTheDocument();
        expect(screen.getByText('30°')).toBeInTheDocument();

        expect(screen.getByText('Min Temp')).toBeInTheDocument();
        expect(screen.getByText('20°')).toBeInTheDocument();

        expect(screen.getByText('Humidity')).toBeInTheDocument();
        expect(screen.getByText('50%')).toBeInTheDocument();

        expect(screen.getByText('Wind')).toBeInTheDocument();
        expect(screen.getByText('10 km/h')).toBeInTheDocument();

        expect(screen.getByText('Rain')).toBeInTheDocument();
        expect(screen.getByText('40%')).toBeInTheDocument();

        expect(screen.getByText('Snow')).toBeInTheDocument();
        expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('displays error message when no data is available', () => {
        (useAPI as jest.Mock).mockReturnValue({data: null});
        render(<DayDetails/>);

        expect(screen.getByText('Error! There is no data...')).toBeInTheDocument();
    });
});