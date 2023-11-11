import React from 'react';
import {astroArr} from "@/utils/astroUtils";

// AstroData component displays data from astroArr in astroUtils file
const AstroData = () => (
    <div className="flex flex-col gap-5">
        {/* Header */}
        <h2 className="bg-light rounded-lg p-2 text-l w-full border-dark border-solid">Astro</h2>

        {/* Grid for displaying astroArr data */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 justify-around gap-5">
            {astroArr.map((astro, index) => (
                <div data-testid="astro-data" key={index} className="bg-light flex-col flex-wrap p-5 rounded-xl text-sm">
                    <div className="mb-3">{astro.name}</div>
                    <div>{astro.value}</div>
                </div>
            ))}
        </div>
    </div>
);

export default AstroData;