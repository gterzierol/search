import React, { ReactNode, useEffect, useState } from "react";
import Input from "../Input";
import { useDebounce } from "@/hooks/use-debounce";
import { Datum, Datums } from "@/types/datum";
import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  setSearchTerm: (value: string) => void;
  suggestionData: Datums | undefined;
  type?: string;
  handleSearchTermChange: (value: string) => void;
  Icon?: ReactNode;
  label?: string;
  id: string;
}
const SearchInput = ({
  setSearchTerm,
  Icon,
  label,
  id,
  type,
  suggestionData,
}: SearchInputProps) => {
  const [searchString, setSearchString] = useState<string>("");
  const debouncedInputValue: string = useDebounce(searchString, 500);
  const [locations, setLocations] = useState<Datum[]>([]);
  const getLocations = (keyword: string) => {
    const data: Datum[] | undefined =
      suggestionData &&
      suggestionData.datums.filter(
        (item: Datum) =>
          item.city?.data.predictions.some((item) =>
            item.toLowerCase().includes(keyword)
          ) || item.city?.name.toLowerCase().includes(keyword)
      );
    data && data.length && setLocations(data);
  };
  const handleInputChange = (value: string) => {
    setSearchString(value);
  };

  useEffect(() => {
    if (debouncedInputValue && debouncedInputValue.length >= 2) {
      setSearchTerm(debouncedInputValue);
      getLocations(debouncedInputValue);
    } else {
      setLocations([]);
    }
  }, [debouncedInputValue]);
  return (
    <div className={styles.searchInput}>
      <Input
        label={label}
        type={type}
        handleSearchTermChange={handleInputChange}
        Icon={Icon}
        id={id}
        searchTerm={searchString}
      />
      {locations.length ? (
        <div className={styles.locations}>
          {locations.map((location, index) => {
            return (
              <div
                key={index}
                className={styles.location}
                onClick={() => {
                  setSearchTerm(location.city?.name || "");
                  setSearchString(location.city?.name || "");
                  setLocations([]);
                }}
              >
                {location.city?.name}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
