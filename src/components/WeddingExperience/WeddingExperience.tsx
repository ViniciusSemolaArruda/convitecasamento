"use client";

import { useState } from "react";

import EnvelopeOpening from "../EnvelopeOpening/EnvelopeOpening";
import MainInvitation from "../MainInvitation/MainInvitation";
import styles from "./WeddingExperience.module.css";

export default function WeddingExperience() {
  const [showMainInvitation, setShowMainInvitation] =
    useState(false);

  const [openingFinished, setOpeningFinished] =
    useState(false);

  function handleRevealMainInvitation() {
    /*
     * A tela principal é montada antes do
     * vídeo desaparecer completamente.
     * Isso cria uma transição suave entre os dois.
     */
    setShowMainInvitation(true);
  }

  function handleOpeningFinished() {
    setOpeningFinished(true);
  }

  return (
    <main className={styles.experience}>
      {showMainInvitation && (
        <div
          className={`${styles.mainContent} ${
            openingFinished
              ? styles.mainContentVisible
              : ""
          }`}
        >
          <MainInvitation />
        </div>
      )}

      {!openingFinished && (
        <EnvelopeOpening
          onRevealMain={
            handleRevealMainInvitation
          }
          onComplete={
            handleOpeningFinished
          }
        />
      )}
    </main>
  );
}