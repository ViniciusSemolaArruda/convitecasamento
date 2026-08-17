"use client";

import {
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./EnvelopeOpening.module.css";

type EnvelopeOpeningProps = {
  onRevealMain: () => void;
  onComplete: () => void;
};

type OpeningPhase =
  | "waiting"
  | "playing"
  | "leaving";

export default function EnvelopeOpening({
  onRevealMain,
  onComplete,
}: EnvelopeOpeningProps) {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  /*
   * window.setTimeout retorna number
   * no navegador.
   */
  const finishTimerRef =
    useRef<number | null>(null);

  /*
   * Impede que finishOpening seja
   * executado mais de uma vez.
   */
  const isFinishingRef =
    useRef(false);

  const [phase, setPhase] =
    useState<OpeningPhase>("waiting");

  const [videoReady, setVideoReady] =
    useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow =
      html.style.overflow;

    const previousBodyOverflow =
      body.style.overflow;

    const previousHtmlOverscroll =
      html.style.overscrollBehavior;

    const previousBodyOverscroll =
      body.style.overscrollBehavior;

    /*
     * Impede qualquer rolagem enquanto
     * o envelope estiver na tela.
     */
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    html.style.overscrollBehavior =
      "none";

    body.style.overscrollBehavior =
      "none";

    const video = videoRef.current;

    if (video) {
      /*
       * Garante que o vídeo da abertura
       * permaneça completamente sem som.
       */
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.currentTime = 0;
    }

    return () => {
      if (
        finishTimerRef.current !== null
      ) {
        window.clearTimeout(
          finishTimerRef.current,
        );

        finishTimerRef.current = null;
      }

      html.style.overflow =
        previousHtmlOverflow;

      body.style.overflow =
        previousBodyOverflow;

      html.style.overscrollBehavior =
        previousHtmlOverscroll;

      body.style.overscrollBehavior =
        previousBodyOverscroll;
    };
  }, []);

  async function startOpening(
    event:
      | MouseEvent<HTMLButtonElement>
      | KeyboardEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (
      phase !== "waiting" ||
      isFinishingRef.current
    ) {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      finishOpening();
      return;
    }

    setPhase("playing");

    /*
     * Reinicia o vídeo sempre do começo.
     */
    video.pause();
    video.currentTime = 0;

    /*
     * Reforça que o vídeo deve ficar mudo.
     */
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    try {
      await video.play();
    } catch (error) {
      console.error(
        "Não foi possível reproduzir o vídeo:",
        error,
      );

      /*
       * Caso o navegador bloqueie o vídeo,
       * continua para a tela principal.
       */
      finishOpening();
    }
  }

  function finishOpening() {
    if (isFinishingRef.current) {
      return;
    }

    isFinishingRef.current = true;

    const video = videoRef.current;

    if (video) {
      video.pause();
    }

    /*
     * Monta a página principal por baixo
     * antes de começar o fade.
     */
    onRevealMain();

    setPhase("leaving");

    finishTimerRef.current =
      window.setTimeout(() => {
        /*
         * Libera a rolagem depois que a
         * transição do envelope terminar.
         */
        document.documentElement.style.overflow =
          "";

        document.body.style.overflow = "";

        document.documentElement.style.overscrollBehavior =
          "";

        document.body.style.overscrollBehavior =
          "";

        finishTimerRef.current = null;

        onComplete();
      }, 950);
  }

  function handleVideoTimeUpdate() {
    const video = videoRef.current;

    if (
      !video ||
      !Number.isFinite(video.duration) ||
      video.duration <= 0 ||
      isFinishingRef.current
    ) {
      return;
    }

    const remainingTime =
      video.duration -
      video.currentTime;

    /*
     * Inicia a transição um pouco antes
     * do vídeo chegar ao último frame.
     */
    if (
      remainingTime <= 0.55 &&
      phase === "playing"
    ) {
      finishOpening();
    }
  }

  function handleVideoReady() {
    const video = videoRef.current;

    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;

      /*
       * Mantém o primeiro frame antes
       * de o usuário clicar.
       */
      if (phase === "waiting") {
        video.currentTime = 0;
      }
    }

    setVideoReady(true);
  }

  return (
    <section
      className={`${styles.opening} ${
        phase === "playing"
          ? styles.openingPlaying
          : ""
      } ${
        phase === "leaving"
          ? styles.openingLeaving
          : ""
      }`}
      aria-label="Abertura do convite"
    >
      <video
        ref={videoRef}
        className={styles.video}
        src="/images/envelpeabrindo.mp4"
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen"
        onCanPlay={handleVideoReady}
        onLoadedData={handleVideoReady}
        onTimeUpdate={
          handleVideoTimeUpdate
        }
        onEnded={finishOpening}
        onError={() => {
          console.error(
            "Erro ao carregar o vídeo da abertura.",
          );

          finishOpening();
        }}
      />

      <div
        className={styles.videoOverlay}
        aria-hidden="true"
      />

      <div
        className={styles.edgeShadow}
        aria-hidden="true"
      />

      {phase === "waiting" && (
        <button
          className={styles.openButton}
          type="button"
          onClick={startOpening}
          disabled={!videoReady}
          aria-label="Abrir o envelope"
        >
          <span
            className={styles.touchArea}
            aria-hidden="true"
          />

          <span
            className={styles.firstPulse}
            aria-hidden="true"
          />

          <span
            className={styles.secondPulse}
            aria-hidden="true"
          />

          <strong>
            {videoReady
              ? "Toque para abrir"
              : "Preparando convite"}
          </strong>

          <small>
            Um convite especial para você
          </small>
        </button>
      )}

      {phase === "playing" && (
        <p className={styles.openingText}>
          Abrindo seu convite
        </p>
      )}

      <div
        className={styles.loadingLine}
        aria-hidden="true"
      >
        <span />
      </div>
    </section>
  );
}