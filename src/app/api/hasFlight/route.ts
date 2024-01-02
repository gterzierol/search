import { Flights } from "@/types/types";
import { readFile } from "fs/promises";

interface IFlightOptions {
  departure: string;
  destination: string;
}
let data: Flights;
export async function POST(request: Request) {
  if (!data) {
    const readedData = await readFile(
      process.cwd() + "/src/data/db.json",
      "utf-8"
    );
    data = await JSON.parse(readedData);
  }
  const { departure, destination }: IFlightOptions = JSON.parse(
    (await request.body
      ?.getReader()
      .read()
      .then((res) => new TextDecoder().decode(res.value))) || "{}"
  );
  const hasFlight = data.flights.some((flight) => {
    return (
      flight.originAirport.city.name.toLowerCase() ===
        departure.toLocaleLowerCase("tr-TR") &&
      flight.destinationAirport.city.name.toLowerCase() ===
        destination.toLocaleLowerCase("tr-TR")
    );
  });

  return Response.json({ hasFlight });
}
