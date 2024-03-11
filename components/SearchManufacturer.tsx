"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { SearchManufacturerProps } from "@/types";
import { manufacturers } from "@/constants";
import { IoIosCheckmark } from "react-icons/io";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  //   const handleSearch = () => {
  //   };

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              alt="Car Logo"
              className="ml-4"
            />
          </Combobox.Button>

          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {filteredManufacturers.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className="search-manufacturer__option text-center py-4 text-red-700 font-extrabold text-2xl"
                >
                  Sorry, Not in the List...
                </Combobox.Option>
              ) : (
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    value={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option
                      ${active ? "bg-primary-blue text-white" : "text-gray-900"}
                      `
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate hover:text-white cursor-pointer ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}

                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center ${
                                active ? "text-white" : "text-teal-800"
                              }`}
                            >
                              <IoIosCheckmark className="h-8 w-8" />
                            </span>
                          ) : (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center ${
                                active ? "text-white" : "text-teal-800"
                              }`}
                            >
                              <IoIosCheckmark className="h-8 w-8" />
                            </span>
                          )}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
