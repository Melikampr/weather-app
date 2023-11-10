import Image from 'next/image'
import useWeatherData from "@/hooks/useWeatherData";

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

            </div>
        )}
      </main>
  )
}
