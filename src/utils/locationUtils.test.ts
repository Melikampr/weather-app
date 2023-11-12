import {getLocation} from './locationUtils';

describe('locationUtils', () => {
    it('should return locationQuery split by comma if locationQuery is not null', async () => {
        const locationQuery = '35.71559205851062, 51.33600913469921';
        const result = await getLocation(locationQuery);
        expect(result).toEqual(['35.71559205851062', '51.33600913469921']);
    });

    it('should return geolocation coordinates if locationQuery is null and geolocation is supported', async () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementation((success) => Promise.resolve(success({
                    coords: {
                        latitude: 35.71559205851062,
                        longitude: 51.33600913469921
                    }
                })))
        };

        //It should be mocked for the testing purpose however it is read-only
        // @ts-ignore
        global.navigator.geolocation = mockGeolocation;
        const result = await getLocation(null);
        expect(result).toEqual(['35.71559205851062', '51.33600913469921']);
    });

    it('should return default coordinates and error message if locationQuery is null and geolocation is not supported', async () => {
        //It should be mocked for the testing purpose however it is read-only
        // @ts-ignore
        global.navigator.geolocation = undefined;
        const result = await getLocation(null);
        expect(result).toEqual(['35.71559205851062', '51.33600913469921', 'Geolocation is not supported by this browser.']);
    });

    it('should return default coordinates and error message if locationQuery is null and getting geolocation fails', async () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementation((success, failure) => Promise.resolve(failure(new Error('Error getting user location'))))
        };
        //It should be mocked for the testing purpose however it is read-only
        // @ts-ignore
        global.navigator.geolocation = mockGeolocation;
        const result = await getLocation(null);
        expect(result).toEqual(['35.71559205851062', '51.33600913469921', 'Error getting user location:']);
    });
});