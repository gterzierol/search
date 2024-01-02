"use client";
import { Flights } from "@/types/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlightCard from "../ui/FlightCard/FlightCard";
import styles from "./Reservation.module.scss";
import { Switch } from "@mui/material";
import storage from "@/lib/storage";

interface ReservationProps {
  flightData: Flights;
}
const Reservation = ({ flightData }: ReservationProps) => {
  const params = useSearchParams();
  const searchData = {
    passenger: params.get("passenger"),
    cabin: params.get("cabin"),
  };
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(0);
  const [flights, setFlights] = useState<Flights>(flightData);
  const [promoCode, setPromoCode] = useState<boolean>(false);

  useEffect(() => {
    const hasPromoCode = storage.session.get("thy-promo-code", false);
    if (hasPromoCode) {
      setPromoCode(hasPromoCode);
    }
  }, []);

  const handlePromoSwitchChange = (value: boolean) => {
    setPromoCode(value);
    storage.session.set("thy-promo-code", value);
  };
  const handleSorting = (cabin?: string) => {
    if (cabin) {
      const sortedFlights = flightData.flights.sort((a, b) =>
        a.fareCategories.ECONOMY.subcategories[0].price.amount >
        b.fareCategories.ECONOMY.subcategories[0].price.amount
          ? 1
          : -1
      );
      setFlights({ ...flightData, flights: sortedFlights });
    } else {
      const sortedFlights = flightData.flights.sort((a, b) =>
        a.departureDateTimeDisplay > b.departureDateTimeDisplay ? 1 : -1
      );
      setFlights({ ...flightData, flights: sortedFlights });
    }
  };
  return (
    <div className={styles.reservationWrapper}>
      <div className={styles.title}>Uçuş</div>
      <div>
        {flights.flights[0].originAirport.city.name}-{" "}
        {flights.flights[0].destinationAirport.city.name},{searchData.passenger}{" "}
        Yolcu
      </div>
      <div className={styles.promoCode}>
        <span>Promosyon Kodu</span>
        <Switch
          onChange={(e) => {
            const { checked } = e.target;
            handlePromoSwitchChange(checked);
          }}
          title="Promosyon Kodu"
          checked={promoCode}
        />
      </div>
      <div className={styles.reservation}>
        <div className={styles.filters}>
          <span>Sıralama Kriteri</span>
          <span
            className={styles.filter}
            onClick={() => {
              handleSorting("cabin");
            }}
          >
            Ekonomi Kabin Ücreti
          </span>
          <span
            className={styles.filter}
            onClick={() => {
              handleSorting();
            }}
          >
            Kalkış Saati
          </span>
        </div>
        <div className={styles.flightCards}>
          {flights?.flights?.map((flight, i) => (
            <FlightCard
              flight={flight}
              cabinType={searchData.cabin as "ECONOMY" | "BUSINESS"}
              key={i}
              index={i}
              selectedFlight={selectedFlightIndex}
              setSelectedFlightIndex={setSelectedFlightIndex}
              passenger={searchData.passenger || ""}
              promoCode={promoCode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
