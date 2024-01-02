"use client";
import Reservation from "@/components/modules/Reservation";
import { Flights } from "@/types/types";
import { useEffect, useState } from "react";

export default function Main() {
  const [flightData, setFlightData] = useState<Flights>();

  useEffect(() => {
    fetch("https://search-tan-eta.vercel.app/api/main")
      .then((res) => res.json())
      .then((data) => {
        setFlightData(JSON.parse(data));
      });
  }, []);
  return (
    <main className="mx-auto">
      {flightData ? <Reservation flightData={flightData} /> : null}
    </main>
  );
}
