import {render, screen} from '@testing-library/react';
import {APIContextProvider, useAPI} from './APIContext';
import {ForecastData} from '@/types/ForecastData';
import {act} from "react-dom/test-utils";

// Mock child component to access the context
const TestComponent = () => {
    const {data, setData, isLoading, setLoading} = useAPI();
    return (
        <div>
            <div data-testid="data">{JSON.stringify(data)}</div>
            <button onClick={() => setData({current: {temp_c: 10}} as ForecastData)}>Set Data</button>
            <div data-testid="loading">{isLoading.toString()}</div>
            <button onClick={() => setLoading(false)}>Set Loading</button>
        </div>
    );
};

describe('APIContext', () => {
    test('provides data and loading state', () => {
        render(
            <APIContextProvider>
                <TestComponent/>
            </APIContextProvider>
        );
        expect(screen.getByTestId('data').textContent).toBe('');
        expect(screen.getByTestId('loading').textContent).toBe('true');
    });

    test('allows setting data and loading state', () => {
        render(
            <APIContextProvider>
                <TestComponent/>
            </APIContextProvider>
        );
        act(() => {
            /* fire events that update state */
            screen.getByText('Set Data').click();
            screen.getByText('Set Loading').click();
        });


        expect(screen.getByTestId('data').textContent).toBe(JSON.stringify({current: {temp_c: 10}}));
        expect(screen.getByTestId('loading').textContent).toBe('false');
    });

    test('throws error when useAPI is not wrapped in APIContextProvider', () => {
        console.error = jest.fn(); // to avoid unnecessary console error in test output
        expect(() => render(<TestComponent/>)).toThrow(
            'useAPI must be used within an APIContextProvider'
        );
    });
});