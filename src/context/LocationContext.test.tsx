import {render, screen} from '@testing-library/react';
import {LocationContextProvider, useLocation} from './LocationContext';
import {act} from 'react-dom/test-utils';

// Mock child component to access the context
const TestComponent = () => {
    const {locationCoords, setLocationCoords} = useLocation();
    return (
        <div>
            <div data-testid="location">{JSON.stringify(locationCoords)}</div>
            <button onClick={() => setLocationCoords(["40.712776", "-74.005974"])}>Set Location</button>
        </div>
    );
};

describe('LocationContext', () => {
    test('provides locationCoords', () => {
        render(
            <LocationContextProvider>
                <TestComponent/>
            </LocationContextProvider>
        );
        expect(screen.getByTestId('location').textContent).toBe(JSON.stringify(["35.71559205851062", "51.33600913469921", "Error getting user location:"]));
    });

    test('allows setting locationCoords', () => {
        render(
            <LocationContextProvider>
                <TestComponent/>
            </LocationContextProvider>
        );
        act(() => {
            /* fire events that update state */
            screen.getByText('Set Location').click();
        });
        expect(screen.getByTestId('location').textContent).toBe(JSON.stringify(["40.712776", "-74.005974"]));
    });

    test('throws error when useLocation is not wrapped in LocationContextProvider', () => {
        console.error = jest.fn(); // to avoid unnecessary console error in test output
        expect(() => render(<TestComponent/>)).toThrow(
            'useLocation must be used within an LocationProvider'
        );
    });
});