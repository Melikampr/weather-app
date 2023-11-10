'use client'
import React, {useContext, useState, createContext} from "react";

interface DataContextProps {
    locationCoords: string[] | null,
    setLocationCoords: React.Dispatch<React.SetStateAction<string[] | null>>,
}

const LocationContext = createContext<DataContextProps | undefined>(undefined);

export function LocationContextProvider({children}: { children: React.ReactNode }) {
    const [locationCoords, setLocationCoords] =
        useState<string[] | null>(["35.71559205851062", "51.33600913469921", "Error getting user location:"]);


    return (
        <LocationContext.Provider
            value={{locationCoords, setLocationCoords}}
        >
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error("useLocation must be used within an LocationProvider");
    }
    return context;
}