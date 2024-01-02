"use client";
import Reservation from "@/components/modules/Reservation";

export default async function Main() {
  const data = await fetch("http://localhost:3000/api/main", {
    method: "GET",
  });
  const flightData = await data.json();

  return (
    <main className="mx-auto">
      <Reservation flightData={JSON.parse(flightData)} />
    </main>
  );
}
