import {act, renderHook} from "@testing-library/react";
import {LocationContextProvider} from "@/context/LocationContext";
import {setupServer} from "msw/node";
import {HttpResponse, http} from "msw";
import {useHistoryData} from "@/hooks/useHistoryData";

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

    test("should make a call to the API and return the array", async () => {
        let hook: any;
        server.use(
            http.get('https://api.weatherapi.com/v1/history.json', () => {
                return HttpResponse.json({
                    location: {
                        name: 'Test City',
                        country: 'Test Country',
                        localtime: '2022-01-01 12:00',
                    }
                })
            })
        )

        await act(async () => {
            hook = renderHook(() => useHistoryData(), {
                wrapper: ({children}) => (
                    <LocationContextProvider>
                        {children}
                    </LocationContextProvider>
                ),
            });
        });
        expect(hook.result.current.weekData.length).toEqual(6)
        expect(hook.result.current.error).toEqual('');

    });

    test("should make a call to the API and return the error", async () => {
        let hook: any;
        server.use(
            http.get('https://api.weatherapi.com/v1/history.json', () => {
                return HttpResponse.error();
            })
        )

        await act(async () => {
            hook = renderHook(() => useHistoryData(), {
                wrapper: ({children}) => (
                    <LocationContextProvider>
                        {children}
                    </LocationContextProvider>
                ),
            });
        });
        expect(hook.result.current.weekData.length).toEqual(0)
        expect(hook.result.current.error).not.toEqual('');

    });


});
