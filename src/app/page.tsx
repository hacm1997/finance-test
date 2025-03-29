'use client'
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const [progress, setProgress] = React.useState(0);

  const router = useRouter();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          router.push("/api/auth/signin");
          return 100;
        }
        return prev + 10
      });
    }, 500);

    return () => clearInterval(interval);
  }, [router]);
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[100vh] w-full">
      <Image src='/logo-app.webp' width={300} height={50} alt="Logo finance app" />
      <div className="w-[30%]">
        <Progress value={progress} />
      </div>
    </div>
  );
}
