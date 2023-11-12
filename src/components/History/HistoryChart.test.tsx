import React from 'react';
import {render} from '@testing-library/react';
import HistoryChart from './HistoryChart';
import {ChartData} from "@/types/ChartData";

describe('HistoryChart', () => {
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

    const chartCell = {
        date: '2022-01-01',
        minTemp: -5,
        maxTemp: 5,
        avgTemp: 0,
    };

    const mockData: ChartData[] = [chartCell, chartCell, chartCell, chartCell, chartCell, chartCell, chartCell];

    it('renders without crashing', () => {
        render(<HistoryChart data={mockData}/>);
    });

});