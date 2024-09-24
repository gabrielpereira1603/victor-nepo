import Image from "next/image";
import HomeScreen from "@/app/components/homeScreen/homeScreen";
import LatestProperties from "@/app/components/latestProperties/latestProperties";

export default function Home() {
  return (
    <main className="">
        <HomeScreen/>
        <LatestProperties/>
    </main>
  );
}
