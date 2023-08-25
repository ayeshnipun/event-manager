import React, { useState, useEffect } from "react";
import type { Event } from "../interfaces";
import { updateEvent } from "../hooks";

const EventForm: React.FC<{ event: Event; closeModal: any; refresh: any }> = ({
  event,
  closeModal,
  refresh,
}) => {
  const [eventState, setEventState] = useState(event);
  const [buttonDisable, setButtonDisable] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventState({ ...eventState, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventState({ ...eventState, [name]: value });
  };

  // function that posts the new event to the server
  const handleFormSubmit = () => {
    //make a patch json request to the server
    updateEvent(eventState).then((response) => {
      console.log(response);
      closeModal();
      refresh();
    });
  };

  console.log(eventState);

  return (
    <>
      <div className="text-gray-600">
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="organizer1"
                className="mb-3 block text-base font-semibold"
              >
                Name of organizer
              </label>
              <input
                type="text"
                name="organizer1"
                id="organizer1"
                placeholder="Name of organizer 1"
                value={eventState.organizer1}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>

          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="organizer1phone"
                className="mb-3 block text-base font-semibold"
              >
                Contact number
              </label>
              <input
                type="text"
                name="organizer1phone"
                id="organizer1phone"
                placeholder="Contact number 1"
                value={eventState.organizer1phone}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="organizer2"
                className="mb-3 block text-base font-semibold"
              >
                Name of organizer 2
              </label>
              <input
                type="text"
                name="organizer2"
                id="organizer2"
                placeholder="Name of organizer"
                value={eventState.organizer2}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>

          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="organizer2phone"
                className="mb-3 block text-base font-semibold"
              >
                Contact number 2
              </label>
              <input
                type="text"
                name="organizer2phone"
                id="organizer2phone"
                placeholder="Contact number 2"
                value={eventState.organizer2phone}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>

        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="date"
                className="mb-3 block text-base font-semibold"
              >
                Event Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={eventState.date}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>

          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="time"
                className="mb-3 block text-base font-semibold"
              >
                Time of event
              </label>
              <input
                type="time"
                name="time"
                id="time"
                value={eventState.time}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="type"
                className="mb-3 block text-base font-semibold"
              >
                Type of event
              </label>
              <div className="relative w-full">
                <select
                  name="type"
                  id="type"
                  value={eventState.type}
                  onChange={handleSelectChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Sweet 16">Sweet 16</option>
                  <option value="Senior Prom">Senior Prom</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="w-full bg-[#6A64F1] text-white py-3 px-6 text-base font-semibold rounded-md hover:bg-[#5B55E0] focus:outline-none focus:ring-2 focus:ring-[#6A64F1] focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50"
        disabled={buttonDisable}
        onClick={() => {
          // render button disabled
          setButtonDisable(true);
          handleFormSubmit();
        }}
      >
        Save
      </button>
    </>
  );
};

export default EventForm;
