import React from "react";

import Snow from "@/components/Snow";
import Present from "@/components/Present";

export default function Home() {
  return (
    <div className="w-full h-full overflow-hidden">
      <Snow />
      <main className="grid grid-cols-1 md:grid-cols-5">
        <Present />
      </main>
    </div>
  );
}
