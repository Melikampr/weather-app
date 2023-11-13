import {act, renderHook} from "@testing-library/react";
import useWeatherData from "./useWeatherData";
import {APIContextProvider} from "@/context/APIContext";
import {LocationContextProvider} from "@/context/LocationContext";
import {setupServer} from "msw/node";
import {HttpResponse, http} from "msw";

jest.mock(
    'next/navigation',
    () => {
        const query = {
            get: (query: string) => {
                return '1,1'
            }
        };
        return {
            useSearchParams: jest.fn(() => query),
        };
    },
    {virtual: true},
);

describe("useFetch", () => {
    const server = setupServer(

    )
    beforeAll(() => {
        server.listen()
    })
    beforeEach(() => {
        server.restoreHandlers()
    })

    afterEach(() => {
        server.resetHandlers()
    })

    afterAll(() => {
        server.close()
    })

    test("should make a call to the API and return the message", async () => {

        let hook: any;
        server.use(
            http.get('https://api.weatherapi.com/v1/forecast.json', () => {
                return HttpResponse.json({
                    location: {
                        name: 'Test City',
                        country: 'Test Country',
                        localtime: '2022-01-01 12:00',
                    },
                    current: {
                        temp_c: 20,
                        condition: {
                            text: 'Sunny',
                            icon: 'test-icon-url',
                        },
                    },
                    forecast: {
                        forecastday: [{
                            astro: {
                                sunrise: "sunrise",
                                sunset: "sunset",
                                moonrise: "moonrise",
                                moonset: "moonset",
                            },
                        }]
                    },
                })
            })
        )
        await act(async () => {
            hook = renderHook(() => useWeatherData(), {
                wrapper: ({children}) => (
                    <APIContextProvider>
                        <LocationContextProvider>
                            {children}
                        </LocationContextProvider>
                    </APIContextProvider>
                ),
            });
        });
        expect(hook.result.current.isLoading).toBeFalsy();
        expect(hook.result.current.error).toEqual('');

    });

    test("should make a call to the API and return error", async () => {
        let hook:any;
        server.restoreHandlers()

        server.use(
            http.get('https://api.weatherapi.com/v1/forecast.json', () => {
                return HttpResponse.error();
            })
        )

        await act(async () => {


            hook = renderHook(() => useWeatherData(), {
                wrapper: ({children}) => (
                    <APIContextProvider>
                        <LocationContextProvider>
                            {children}
                        </LocationContextProvider>
                    </APIContextProvider>
                ),

            });
        });
        expect(hook.result.current.isLoading).toBeTruthy();
        expect(hook.result.current.error).toEqual('Error fetching data. Please use proxy');
    });



});
