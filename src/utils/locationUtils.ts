
export const getLocation = async (locationQuery: string | null) => {
    if (locationQuery) {
        return locationQuery.split(', ');

        // if geolocation is supported by the users browser
    } else {
        if (navigator.geolocation) {
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                // save the geolocation coordinates in two variables
                const {latitude, longitude} = position.coords;
                const lat = latitude.toString();
                const lon = longitude.toString();
                // update the value of userLocation variable
                return [lat, lon];
            } catch (error) {
                return ["35.71559205851062", "51.33600913469921", "Error getting user location:"];
            }
        }
        // if geolocation is not supported by the users browser
        else {
            return ["35.71559205851062", "51.33600913469921", "Geolocation is not supported by this browser."];
        }
    }
};