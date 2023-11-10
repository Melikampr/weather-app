import React from 'react';

// Define the prop types for the DayCard component
interface WeatherInfoCardProps {
    title: string;
    Icon: React.ComponentType<{ size: string }>;
    value: string;
    size: string;
}

// Define the DayCard functional component for today highlight cards
const DayCard: React.FC<WeatherInfoCardProps> = ({title, Icon, value, size}) => (
    <div className="bg-light rounded-xl shadow-xl flex flex-col items-center justify-center gap-3 px-4 py-2">
        <div>{title}</div>
        <figure>
            <Icon size={size}/>
        </figure>
        <div>{value}</div>
    </div>
);


export default DayCard;