import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button className="bg-blue-600 text-light hover:bg-blue-500"> <Link href="/gsap">GSAP</Link></Button>
    </div>
  );
}
