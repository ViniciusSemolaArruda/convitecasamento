"use client";

import { useState } from "react";

import styles from "./page.module.css";
import ChaRevelacaoInvitation from "@/components/ChaRevelacaoInvitation/ChaRevelacaoInvitation";
import EnvelopeOpening2 from "@/components/EnvelopeOpening2/EnvelopeOpening2";

export default function Page4() {
  const [showMain, setShowMain] = useState(false);
  const [showOpening, setShowOpening] = useState(true);

  return (
    <main className={styles.page}>
      {showMain && <ChaRevelacaoInvitation />}
      {showOpening && (
        <EnvelopeOpening2
          onRevealMain={() => setShowMain(true)}
          onComplete={() => setShowOpening(false)}
        />
      )}
    </main>
  );
}