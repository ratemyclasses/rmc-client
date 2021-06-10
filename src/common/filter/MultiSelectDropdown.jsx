import { React, Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export function MultiSelectDropdown({ label, options }) {
  const [searchParam, setSearchParam] = useState('');
  const [selected, setSelected] = useState(label);

  if (!options) {
    return <div>Loading...</div>;
  }

  console.log(options);

  const handleChange = (e) => {
    setSearchParam(e.target.value);
  };

  return (
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{label}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-1 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <div className="relative flex items-center w-full px-4 py-2">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="block w-full sm:w-full py-2 pl-4 pr-4 leading-normal rounded-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
                    placeholder="Filter Department"
                  />
                </div>
                {options.map((person, personIdx) => {
                  console.log(person.name.includes(searchParam));
                  if (person.name.toLowerCase().includes(searchParam.toLowerCase())) {
                    return (
                      <Listbox.Option
                        static
                        key={person.name}
                        className={({ active }) =>
                          `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                            cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                        value={person}
                      >
                        {({ selectedPerson, active }) => (
                          <>
                            <span
                              className={`${
                                selectedPerson ? 'font-medium' : 'font-normal'
                              } block truncate`}
                            >
                              {person.name}
                            </span>
                            {selectedPerson ? (
                              <span
                                className={`${active ? 'text-amber-600' : 'text-amber-600'}
                                  absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    );
                  }

                  return <div> </div>;
                })}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
