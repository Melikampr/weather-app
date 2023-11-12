import { dayOfWeek, getMonth, getCurrentDate, getForecastDate, formatDate, setDate } from './dateUtils';

describe('dateUtils', () => {
    const testDate = new Date(2022, 0, 1); // January 1, 2022 is a Saturday

    it('dayOfWeek should return the correct day of the week', () => {
        expect(dayOfWeek(testDate)).toBe('Saturday');
    });

    it('getMonth should return the correct month', () => {
        expect(getMonth(testDate)).toBe('January');
    });

    it('getCurrentDate should return the correct formatted date', () => {
        expect(getCurrentDate(testDate)).toBe('Saturday, 1 January');
    });

    it('getForecastDate should return the correct formatted date', () => {
        expect(getForecastDate(testDate)).toBe('January, 1');
    });

    it('formatDate should add leading zero if number is less than 10', () => {
        expect(formatDate('1')).toBe('01');
        expect(formatDate('10')).toBe('10');
    });

    it('setDate should correctly convert hyphenated date to Date object', () => {
        expect(setDate('2022-01-01')).toEqual(testDate);
    });
});