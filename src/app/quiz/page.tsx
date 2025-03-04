import Quiz from "@/components/Quiz";
import { SessionProvider } from "next-auth/react";

import React from "react";

export default function page() {
  return (
    <div>
      <SessionProvider>
        <Quiz />
      </SessionProvider>
    </div>
  );
}
