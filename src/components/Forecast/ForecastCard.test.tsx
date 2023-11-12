import React from 'react';
import { render, screen } from '@testing-library/react';
import ForecastCard from './ForecastCard';
import { setDate, dayOfWeek, getForecastDate } from "@/utils/dateUtils";
import  '@testing-library/jest-dom';
import { ForecastDay } from '@/types/ForecastData';

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
test('renders without crashing', () => {
    render(<ForecastCard day={mockForecastDay} index={0} />);
});

test('renders correct day of week', () => {
    render(<ForecastCard day={mockForecastDay} index={0} />);
    const dayElement = screen.getByText(dayOfWeek(setDate(mockForecastDay.date)));
    expect(dayElement).toBeInTheDocument();
});

test('renders correct forecast date', () => {
    render(<ForecastCard day={mockForecastDay} index={0} />);
    const dateElement = screen.getByText(getForecastDate(setDate(mockForecastDay.date)));
    expect(dateElement).toBeInTheDocument();
});

test('renders correct high and low temperatures', () => {
    render(<ForecastCard day={mockForecastDay} index={0} />);
    const highTempElement = screen.getByText(`High: ${mockForecastDay.day.maxtemp_c}`);
    const lowTempElement = screen.getByText(`Low: ${mockForecastDay.day.mintemp_c}`);
    expect(highTempElement).toBeInTheDocument();
    expect(lowTempElement).toBeInTheDocument();
});

test('renders correct weather icon', () => {
    render(<ForecastCard day={mockForecastDay} index={0} />);
    const iconElement = screen.getByAltText('weatherIcon');
    expect(iconElement).toHaveAttribute('src', mockForecastDay.day.condition.icon);
});