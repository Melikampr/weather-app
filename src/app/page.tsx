"use client"
import useWeatherData from "@/hooks/useWeatherData";
import DayDetails from "@/components/Today/DayDetails";
import CurrentWeather from "@/components/CurrentWeather";

export default function Home() {
    // Fetch weather data and manage loading state using the custom hook
    const {isLoading, error} = useWeatherData();

    return (
        <main>
            {isLoading ? (
                <>
                    <span className="loading loading-lg loading-spinner text-white absolute left-1/2 top-1/2"></span>
                    {error && (
                        <div className="alert alert-error fixed bottom-5 left-5 max-w-lg">
                            <span>{error}</span>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex p-5 justify-center items-center">
                    <div
                        className="m-5 flex flex-col gap-10 md:flex-col lg:w-10/12 lg:flex-row lg:gap-0 text-center justify-around">
                        <div className="flex flex-col lg:w-3/5">
                            <div className="flex flex-col gap-10 lg:gap-5 w-full lg:w-10/12">
                                <div
                                    className="flex flex-col-reverse sm:flex-row md:flex-row lg:flex-row gap-10 lg:gap-5 justify-between">
                                    <DayDetails/> {/* Component for displaying day weather forecast details */}
                                    <CurrentWeather/>{/* Component for displaying current weather details */}
                                </div>
                            </div>
                        </div>
                        {/*<div*/}
                        {/*    className="flex flex-col md:flex-row md:justify-around lg:justify-between lg:flex-col gap-10 lg:gap-5 lg:w-2/5">*/}
                        {/*</div>*/}
                    </div>
                </div>
            )}
        </main>
    )
}
