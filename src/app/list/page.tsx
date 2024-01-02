"use client";
import Reservation from "@/components/modules/Reservation";
import { Flights } from "@/types/types";
import { useEffect, useState } from "react";

export default function Main() {
  const [flightData, setFlightData] = useState<Flights>();

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/main", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data): void => {
        setFlightData(JSON.parse(data));
      });
  }, []);
  return (
    <main className="mx-auto">
      {flightData ? <Reservation flightData={flightData} /> : null}
    </main>
  );
}
