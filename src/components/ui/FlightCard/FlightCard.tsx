"use client";

import { Flight } from "@/types/types";
import React, { useEffect, useState } from "react";
import styles from "./FlightCard.module.scss";
import FareCategoryCard from "./FareCategoryCard";
import storage from "@/lib/storage";
import Border from "../Border/Border";
import { useRouter } from "next/navigation";
interface FlightCardProps {
  flight: Flight;
  cabinType: "ECONOMY" | "BUSINESS";
  index: number;
  selectedFlight: number;
  setSelectedFlightIndex: (index: number) => void;
  passenger: string;
  promoCode: boolean;
}
const FlightCard = ({
  flight,
  cabinType,
  index,
  selectedFlight,
  setSelectedFlightIndex,
  passenger,
  promoCode,
}: FlightCardProps) => {
  const [selectedCabin, setSelectedCabin] = useState<string>(cabinType);

  const {
    flightCardWrapper,
    flightCard,
    info,
    point,
    border,
    time,
    airportCode,
    airportName,
    durationInfo,
    cabinInfo,
    type,
    cabinPrice,
  } = styles;

  const router = useRouter();
  const handlePayment = (price: number) => {
    const total = Number(passenger) * price;
    router.push("/payment?price=" + total);
  };

  const renderFightCabinCategories = () => {
    return flight.fareCategories[
      selectedCabin.toUpperCase() as keyof typeof flight.fareCategories
    ].subcategories.map((category, index) => {
      return (
        <FareCategoryCard
          fareCategory={category}
          key={index}
          promoCode={promoCode}
          handlePayment={handlePayment}
        />
      );
    });
  };
  return (
    <div className={flightCardWrapper}>
      <div className={flightCard}>
        <div className={info}>
          <div className={point}>
            <div className={time}>{flight.departureDateTimeDisplay}</div>
            <div className={airportCode}>{flight.originAirport.code}</div>
            <div className={airportName}>{flight.originAirport.city.name}</div>
          </div>
          <Border />
          <div className={point}>
            <div className={time}>{flight.arrivalDateTimeDisplay}</div>
            <div className={airportCode}>{flight.destinationAirport.code}</div>
            <div className={airportName}>
              {flight.destinationAirport.city.name}
            </div>
          </div>
          <div className={durationInfo}>
            <span>Uçuş Süresi</span>
            <span>{flight.flightDuration}</span>
          </div>
        </div>
        {Object.keys(flight.fareCategories)
          .reverse()
          .map((cabin, i) => {
            const price =
              flight.fareCategories[cabin as keyof typeof flight.fareCategories]
                ?.subcategories[0].price;

            return (
              <div
                key={i}
                className={cabinInfo}
                onClick={() => {
                  setSelectedCabin(cabin);
                  selectedFlight !== index && setSelectedFlightIndex(index);
                }}
              >
                <div className={type}>
                  <input
                    type="radio"
                    id={cabin}
                    name="cabin"
                    data-cabin={cabin}
                    defaultChecked={
                      selectedFlight === i &&
                      selectedCabin === cabin.toLowerCase()
                    }
                  />
                  <label htmlFor={cabin}>{cabin}</label>
                </div>
                <div className={cabinPrice}>
                  <span>Yolcu Başına</span>
                  <span>{`${price.currency} ${
                    promoCode ? price.amount / 2 : price.amount
                  }`}</span>
                </div>
              </div>
            );
          })}
      </div>
      {selectedFlight === index && (
        <div className={styles.fareCategories}>
          {renderFightCabinCategories()}
        </div>
      )}
    </div>
  );
};

export default FlightCard;
