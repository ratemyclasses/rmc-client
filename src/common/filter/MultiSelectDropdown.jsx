import { React, Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export function MultiSelectDropdown({ label, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [selected, setSelected] = useState([]);

  if (!options) {
    return <div>Loading...</div>;
  }

  console.log(isOpen);

  function isSelected(value) {
    return selected.find((el) => el === value);
  }

  function handleDeselect(value) {
    const selectedUpdated = selected.filter((el) => el !== value);
    setSelected(selectedUpdated);
    setIsOpen(true);
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedUpdated = [...selected, options.find((el) => el === value)];
      setSelected(selectedUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  const handleChange = (e) => {
    setSearchParam(e.target.value);
  };

  const handleButtonClick = () => {
    console.log('clicked');
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex items-center justify-center p-12">
      <div className="w-full max-w-xs mx-auto">
        <Listbox
          as="div"
          className="space-y-1"
          value={selected}
          onChange={(value) => handleSelect(value)}
          open={isOpen}
        >
          {() => (
            <>
              <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <button
                    type="button"
                    className="cursor-default relative w-48 rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={handleButtonClick}
                    open={isOpen}
                  >
                    <span className="block truncate">
                      {selected.length < 1 ? label : `${label}s (${selected.length})`}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </span>

                <Transition
                  unmount={false}
                  show={isOpen}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute mt-1 w-64 rounded-md bg-white shadow-lg z-10"
                >
                  <Listbox.Options
                    static
                    className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                  >
                    <div className="relative flex items-center w-full px-4 py-2">
                      <input
                        onChange={handleChange}
                        type="text"
                        className="block w-full sm:w-full py-2 pl-4 pr-4 leading-normal rounded-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
                        placeholder="Filter Department"
                      />
                    </div>
                    {options.map((option) => {
                      if (option.name.toLowerCase().includes(searchParam.toLowerCase())) {
                        const selectedOption = isSelected(option);
                        return (
                          <Listbox.Option key={option._id} value={option}>
                            {({ active }) => (
                              <div
                                className={`${
                                  active ? 'text-white bg-blue-600' : 'text-gray-900'
                                } cursor-default select-none relative py-2 pl-8 pr-4`}
                              >
                                <span
                                  className={`${
                                    selectedOption ? 'font-semibold' : 'font-regular'
                                  } block truncate`}
                                >
                                  {option.name}
                                </span>
                                {selectedOption && (
                                  <span
                                    className={`${
                                      active ? 'text-white' : 'text-blue-600'
                                    } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                  >
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </div>
                            )}
                          </Listbox.Option>
                        );
                      }

                      return <></>;
                    })}
                  </Listbox.Options>
                </Transition>
                {/* <div className="pt-1 text-sm">
                  {selected.length > 0 && (
                    <>
                      Selected {label.toLowerCase()}: {selected.join(', ')}
                    </>
                  )}
                </div> */}
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );

  // return (
  //   <div className="w-72">
  //     <Listbox value={selected} onChange={setSelected}>
  //       {({ open }) => (
  //         <div className="relative mt-1">
  //           <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
  //             <span className="block truncate">{label}</span>
  //             <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
  //               <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
  //             </span>
  //           </Listbox.Button>
  //           <Transition
  //             as={Fragment}
  //             leave="transition ease-in duration-100"
  //             leaveFrom="opacity-100"
  //             leaveTo="opacity-0"
  //           >
  //             <Listbox.Options className="absolute z-1 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
  //               <div className="relative flex items-center w-full px-4 py-2">
  //                 <input
  //                   onChange={handleChange}
  //                   type="text"
  //                   className="block w-full sm:w-full py-2 pl-4 pr-4 leading-normal rounded-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
  //                   placeholder="Filter Department"
  //                 />
  //               </div>
  //               {options.map((person, personIdx) => {
  //                 console.log(person.name.includes(searchParam));
  //                 if (person.name.toLowerCase().includes(searchParam.toLowerCase())) {
  //                   return (
  //                     <Listbox.Option
  //                       static
  //                       key={person.name}
  //                       className={({ active }) =>
  //                         `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
  //                           cursor-default select-none relative py-2 pl-10 pr-4`
  //                       }
  //                       value={person}
  //                     >
  //                       {({ selectedPerson, active }) => (
  //                         <>
  //                           <span
  //                             className={`${
  //                               selectedPerson ? 'font-medium' : 'font-normal'
  //                             } block truncate`}
  //                           >
  //                             {person.name}
  //                           </span>
  //                           {selectedPerson ? (
  //                             <span
  //                               className={`${active ? 'text-amber-600' : 'text-amber-600'}
  //                                 absolute inset-y-0 left-0 flex items-center pl-3`}
  //                             >
  //                               <CheckIcon className="w-5 h-5" aria-hidden="true" />
  //                             </span>
  //                           ) : null}
  //                         </>
  //                       )}
  //                     </Listbox.Option>
  //                   );
  //                 }

  //                 return <div> </div>;
  //               })}
  //             </Listbox.Options>
  //           </Transition>
  //         </div>
  //       )}
  //     </Listbox>
  //   </div>
  // );
}
