import { readFile } from "fs/promises";

export async function GET(request: Request) {
  const data = await readFile(
    process.cwd() + "/src/data/trDatum.json",
    "utf-8"
  );
  return Response.json(data);
}
