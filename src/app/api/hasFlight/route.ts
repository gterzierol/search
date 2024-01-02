import { Flights } from "@/types/types";
import { readFile } from "fs/promises";

export async function POST(request: Request) {
  const readedData = await readFile(
    process.cwd() + "/src/data/db.json",
    "utf-8"
  );

  return Response.json(readedData);
}
