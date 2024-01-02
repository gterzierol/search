"use client";
import storage from "@/lib/storage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import TakeOff from "@mui/icons-material/FlightTakeoff";
import Landing from "@mui/icons-material/FlightLand";
import Calendar from "../ui/Calendar";
import PassengerCount from "../ui/PassengerCount/PassengerCount";
import Button from "../ui/Button/Button";
import IconChevron from "@/assets/icon-chevron";

import styles from "./Search.module.scss";
import SearchInput from "../ui/SearchInput/SearchInput";
import { Datums } from "@/types/datum";
import Modal from "../ui/Modal/Modal";
const Search = () => {
  const [datums, setDatums] = useState<Datums>();
  const [passenger, setPassenger] = useState(1);
  const [cabin, setCabin] = useState("economy");
  const [departure, setDeperture] = useState("");
  const [destination, setDestination] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const checkFlight = async () => {
    if (departure && destination) {
      const data = await fetch("/api/hasFlight", {
        method: "POST",
        body: JSON.stringify({ departure, destination }),
      });
      const hasFlight = await data.json();
      if (JSON.parse(hasFlight)) {
        // router.push(
        //   "/list?departure=" +
        //     departure +
        //     "&destination=" +
        //     destination +
        //     "&passenger=" +
        //     passenger +
        //     "&cabin=" +
        //     cabin
        // );
      } else {
        setOpenModal(true);
      }
    }
  };
  useEffect(() => {
    const localDatum = storage.local.get("datums", "");
    if (!localDatum) {
      fetch("/api/getDatum", {
        method: "GET",
      })
        .then((data) => data.json())
        .then((rs) => {
          storage.local.set("datums", JSON.stringify(rs));
          setDatums(JSON.parse(rs));
        });
    } else {
      setDatums(JSON.parse(localDatum));
    }
  }, []);
  return (
    <div className={styles.Search}>
      <div className={styles.searchFlight}>
        <SearchInput
          label="nereden"
          type="text"
          handleSearchTermChange={(value) => {}}
          Icon={<TakeOff />}
          id="from"
          suggestionData={datums}
          setSearchTerm={(value) => {
            setDeperture(value);
          }}
        />
        <SearchInput
          label="nereye"
          type="text"
          handleSearchTermChange={(value) => {}}
          Icon={<Landing />}
          id="to"
          suggestionData={datums}
          setSearchTerm={(value) => {
            setDestination(value);
          }}
        />
      </div>
      <div className={styles.selectOptions}>
        <Calendar />
        <PassengerCount
          setCount={setPassenger}
          getCabinType={setCabin}
          count={passenger}
        />
        <Button
          icon={<IconChevron />}
          color="bg-main"
          onClick={() => {
            checkFlight();
          }}
        />
      </div>
      <Modal isOpen={openModal} setModalOpen={setOpenModal}>
        {<div>aradığınız seçeneklerde uçak bulunamadı.</div>}
      </Modal>
    </div>
  );
};

export default Search;
