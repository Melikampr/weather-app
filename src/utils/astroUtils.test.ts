import { ForecastData } from '@/types/ForecastData';
import { setAstroData, astroArr } from './astroUtils';

describe('setAstroData', () => {
    it('should not update astroArr if astroData is missing keys', () => {
        const data = {
            forecast: {
                forecastday: [
                    {
                        astro: {
                            sunrise: '6:00 AM',
                            sunset: '6:00 PM',
                        },
                    },
                ],
            },
        } as ForecastData;


        setAstroData(data);

        expect(astroArr).toEqual([
            { name: 'Sunrise', value: '6:00 AM' },
            { name: 'Sunset', value: '6:00 PM' },
            { name: 'Moonrise', value: '' },
            { name: 'Moonset', value: '' },
        ]);
    });

    it('should update values in astroArr based on the keys', () => {
        const data = {
            forecast: {
                forecastday: [
                    {
                        astro: {
                            sunrise: '6:00 AM',
                            sunset: '6:00 PM',
                            moonrise: '12:00 PM',
                            moonset: '12:00 AM',
                            moon_phase: 'Full Moon',
                            moon_illumination: '100%',
                        },
                    },
                ],
            },
        } as ForecastData;

        setAstroData(data);

        expect(astroArr).toEqual([
            { name: 'Sunrise', value: '6:00 AM' },
            { name: 'Sunset', value: '6:00 PM' },
            { name: 'Moonrise', value: '12:00 PM' },
            { name: 'Moonset', value: '12:00 AM' },
        ]);
    });

});