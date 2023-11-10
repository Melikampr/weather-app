import React from 'react';
import {useHistoryData} from '@/hooks/useHistoryData';
import HistoryChart from '@/components/History/HistoryChart';
import {getChartData, sortHistoryData} from '@/utils/historyUtils';

//Show last week data
const HistoryDetails = () => {
    const {weekData, error} = useHistoryData();

    // Display a loading indicator when data is not available
    if (!weekData || weekData.length <= 5) {
        return (
            <div>
                <span className="loading loading-lg loading-spinner text-white absolute left-1/2 -top-1/4"></span>
                {error && (
                    <div className="alert alert-error fixed bottom-5 left-5 max-w-lg">
                        <span>{error}</span>
                    </div>
                )}
            </div>
        );
    }

    // Prepare chart data
    const chartData = getChartData(weekData);
    const sortedWeekData = sortHistoryData(chartData);

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <h2 className="bg-light rounded-lg p-2 text-l w-full">Last Week</h2>

            {/* Display the history chart component */}
            <HistoryChart data={sortedWeekData}/>
        </div>
    );
};

export default HistoryDetails;
