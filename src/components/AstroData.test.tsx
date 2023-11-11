import React from 'react';
import {render, screen} from '@testing-library/react';
import AstroData from './AstroData';
import {astroArr} from "@/utils/astroUtils";

describe('AstroData', () => {
    beforeEach(() => {
        render(<AstroData/>);
    });

    test('renders the header', () => {
        const headerElement = screen.getByText(/Astro/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('renders the correct number of astro data elements', () => {
        const astroElements = screen.getAllByTestId('astro-data');
        expect(astroElements.length).toBe(astroArr.length);
    });
});