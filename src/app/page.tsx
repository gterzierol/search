import Search from "@/components/modules/Search";
import Welcome from "@/components/ui/Welcome";
import Link from "next/link";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 bg-background p-24">
      <Welcome />
      <Search />
    </main>
  );
}
