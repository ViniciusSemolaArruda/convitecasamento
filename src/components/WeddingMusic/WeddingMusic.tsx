"use client";

import {
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./WeddingMusic.module.css";

export default function WeddingMusic() {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const startedRef = useRef(false);
  const mutedRef = useRef(false);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [isMuted, setIsMuted] =
    useState(false);

  const [hasError, setHasError] =
    useState(false);

  const startMusic = useCallback(
    async () => {
      const audio = audioRef.current;

      if (
        !audio ||
        startedRef.current ||
        hasError
      ) {
        return;
      }

      try {
        audio.muted = false;
        audio.volume = 0.35;

        await audio.play();

        startedRef.current = true;
        mutedRef.current = false;

        setIsPlaying(true);
        setIsMuted(false);
      } catch (error) {
        /*
         * Não exibimos NotAllowedError porque
         * ele é esperado antes da interação.
         */
        if (
          error instanceof DOMException &&
          error.name === "NotAllowedError"
        ) {
          return;
        }

        console.error(
          "Erro ao reproduzir a música:",
          error,
        );
      }
    },
    [hasError],
  );

  useEffect(() => {
    const audio = new Audio(
      "/images/music.mp3",
    );

    audioRef.current = audio;

    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.35;
    audio.muted = false;

    function handlePlay() {
      startedRef.current = true;

      setIsPlaying(true);
      setHasError(false);
    }

    function handlePause() {
      setIsPlaying(false);
    }

    function handleError() {
      setHasError(true);
      setIsPlaying(false);

      console.error(
        "Não foi possível carregar /images/music.mp3",
      );
    }

    audio.addEventListener(
      "play",
      handlePlay,
    );

    audio.addEventListener(
      "pause",
      handlePause,
    );

    audio.addEventListener(
      "error",
      handleError,
    );

    audio.load();

    return () => {
      audio.removeEventListener(
        "play",
        handlePlay,
      );

      audio.removeEventListener(
        "pause",
        handlePause,
      );

      audio.removeEventListener(
        "error",
        handleError,
      );

      audio.pause();
      audio.src = "";

      audioRef.current = null;
      startedRef.current = false;
    };
  }, []);

  useEffect(() => {
    async function unlockMusic() {
      await startMusic();

      if (startedRef.current) {
        removeListeners();
      }
    }

    function removeListeners() {
      document.removeEventListener(
        "pointerdown",
        unlockMusic,
        true,
      );

      document.removeEventListener(
        "touchend",
        unlockMusic,
        true,
      );

      document.removeEventListener(
        "keydown",
        unlockMusic,
        true,
      );

      window.removeEventListener(
        "wedding:play-music",
        unlockMusic,
      );
    }

    document.addEventListener(
      "pointerdown",
      unlockMusic,
      {
        capture: true,
        passive: true,
      },
    );

    document.addEventListener(
      "touchend",
      unlockMusic,
      {
        capture: true,
        passive: true,
      },
    );

    document.addEventListener(
      "keydown",
      unlockMusic,
      {
        capture: true,
      },
    );

    window.addEventListener(
      "wedding:play-music",
      unlockMusic,
    );

    return removeListeners;
  }, [startMusic]);

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!startedRef.current || audio.paused) {
      await startMusic();
      return;
    }

    const nextMuted = !mutedRef.current;

    audio.muted = nextMuted;
    mutedRef.current = nextMuted;

    setIsMuted(nextMuted);
  }
const soundActive =
  isPlaying && !isMuted && !hasError;

  return (
    <button
      type="button"
      className={`${styles.soundButton} ${
        soundActive
          ? styles.soundActive
          : styles.soundInactive
      }`}
      onClick={toggleMusic}
      aria-label={
        soundActive
          ? "Silenciar música"
          : "Ativar música"
      }
      title={
        soundActive
          ? "Silenciar música"
          : "Ativar música"
      }
    >
      <span className={styles.pulse} />

      <span className={styles.icon}>
        {soundActive ? (
          <Volume2
            size={19}
            strokeWidth={1.6}
          />
        ) : (
          <VolumeX
            size={19}
            strokeWidth={1.6}
          />
        )}
      </span>

      {soundActive && (
        <span
          className={styles.equalizer}
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
        </span>
      )}
    </button>
  );
}