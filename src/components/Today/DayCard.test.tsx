import React from 'react';
import {render, screen} from '@testing-library/react';
import DayCard from './DayCard';

// Mock Icon component for testing
const MockIcon: React.FC<{ size: string }> =
    ({size}) => <div data-testid="icon" style={{width: size, height: size}}>Icon</div>;

describe('DayCard', () => {
    const props = {
        title: 'Test Title',
        Icon: MockIcon,
        value: 'Test Value',
        size: '24px',
    };

    beforeEach(() => {
        render(<DayCard {...props} />);
    });

    it('renders without crashing', () => {
        expect(screen.getByText(props.title)).toBeInTheDocument();
    });

    it('renders the title correctly', () => {
        expect(screen.getByText(props.title)).toBeInTheDocument();
    });

    it('renders the Icon correctly', () => {
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders the value correctly', () => {
        expect(screen.getByText(props.value)).toBeInTheDocument();
    });
});