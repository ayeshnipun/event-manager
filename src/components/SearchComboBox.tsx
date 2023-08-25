import { Fragment, use, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { searchCustomers } from "../hooks";

export default function SearchComboBox({ setCustomer }: any) {
  const [filteredPeople, setPeople] = useState([] as any);
  const [selected, setSelected] = useState(null as any);
  const [query, setQuery] = useState("");

  const search = async (query: string) => {
    const data = await searchCustomers(query).then((res) => res.json());
    setPeople(data);
  };

  useEffect(() => {
    if (query !== "") {
      search(query);
    }
  }, [query]);

  const setSelectedCustomer = (person: any) => {
    setSelected(person);
    setCustomer(person.id);
  };

  console.log("people", filteredPeople);
  console.log("selected", selected);

  return (
    <div className="w-full flex justify-center mb-5">
      <Combobox value={selected} onChange={setSelectedCustomer}>
        <div className="relative mt-1">
          <div className="relative w-full flex items-center">
            <Combobox.Input
              className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border border-gray-300 rounded-md focus:outline-2"
              displayValue={(person: any) => {
                if (person) {
                  return person.firstName;
                }
              }}
              onChange={(event) => {
                if (!event.target.value) {
                  setSelected(null);
                } else {
                  setQuery(event.target.value);
                }
              }}
              placeholder="First name"
              value={selected === null ? query : selected.firstName}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => {
              query !== "" && setQuery("");
            }}
          >
            <Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : filteredPeople ? (
                filteredPeople.map((person: any) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.firstName} {person.lastName}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
