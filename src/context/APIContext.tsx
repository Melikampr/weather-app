'use client'
import React, {useContext, useState, createContext} from "react";
import {ForecastData} from "@/types/ForecastData";

interface DataContextProps {
    data: ForecastData | undefined;
    setData: React.Dispatch<React.SetStateAction<ForecastData | undefined>>,
    isLoading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,

}

const APIContext = createContext<DataContextProps | undefined>(undefined);

export function APIContextProvider({children}: { children: React.ReactNode }) {
    const [data, setData] = useState<ForecastData | undefined>();
    const [isLoading, setLoading] = useState(true);


    return (
        <APIContext.Provider
            value={{data, setData, isLoading, setLoading}}
        >
            {children}
        </APIContext.Provider>
    );
}

export function useAPI() {
    const context = useContext(APIContext);
    if (!context) {
        throw new Error("useAPI must be used within an APIContextProvider");
    }
    return context;
}