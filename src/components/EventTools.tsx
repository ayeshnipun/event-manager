import React, { useState } from "react";

const EventTools = ({
  setEventsToDisplayByDateRange,
  handleDateRange,
  dateRange,
}: any) => {
  const [validRange, setValidRange] = useState(true);

  const validateDateRange = () => {
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    if (startDate > endDate) {
      setValidRange(false);
    } else {
      setEventsToDisplayByDateRange();
      setValidRange(true);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg py-4 px-6 mt-4">
      <h3 className="font-bold text-lg mb-3 text-gray-900">
        Filter by date range
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="items-center text-sm">
          <label htmlFor="startDate">Start Date: </label>
          <input
            value={dateRange.startDate}
            onChange={handleDateRange}
            className="rounded-md border border-gray-300 bg-white py-2 px-3 font-thin text-gray-600 outline-none"
            type="date"
            name="startDate"
            id="startDate"
          />
        </div>
        <div className="items-center text-sm">
          <label htmlFor="endDate">End Date: </label>
          <input
            value={dateRange.endDate}
            onChange={handleDateRange}
            className="rounded-md border border-gray-300 bg-white py-2 px-3 font-thin text-gray-600 outline-none"
            type="date"
            name="endDate"
            id="endDate"
          />
        </div>

        <button
          onClick={validateDateRange}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
        >
          Filter
        </button>
        {validRange ? null : (
          <div className="text-red-500 text-sm flex items-center">
            <p>End date must be after start date</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventTools;
