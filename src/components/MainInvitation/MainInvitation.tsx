"use client";

import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  QrCode,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { QRCodeSVG } from "qrcode.react";

import styles from "./MainInvitation.module.css";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const weddingDate = new Date(
  "2027-08-20T16:00:00-03:00",
);

const initialCountdown: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export default function MainInvitation() {
  const rootRef =
    useRef<HTMLDivElement>(null);

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] =
    useState(true);

  const [countdown, setCountdown] =
    useState<Countdown>(
      initialCountdown,
    );

  useEffect(() => {
    function updateCountdown() {
      const difference =
        weddingDate.getTime() -
        Date.now();

      if (difference <= 0) {
        setCountdown(initialCountdown);
        return;
      }

      setCountdown({
        days: Math.floor(
          difference /
            (1000 * 60 * 60 * 24),
        ),

        hours: Math.floor(
          (difference /
            (1000 * 60 * 60)) %
            24,
        ),

        minutes: Math.floor(
          (difference / (1000 * 60)) %
            60,
        ),

        seconds: Math.floor(
          (difference / 1000) % 60,
        ),
      });
    }

    updateCountdown();

    const interval =
      window.setInterval(
        updateCountdown,
        1000,
      );

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const elements =
      root.querySelectorAll<HTMLElement>(
        "[data-reveal]",
      );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            styles.revealVisible,
          );

          observer.unobserve(
            entry.target,
          );
        });
      },
      {
        threshold: 0.14,
        rootMargin:
          "0px 0px -7% 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  async function toggleVideoSound() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextMutedState = !isMuted;

    video.muted = nextMutedState;
    setIsMuted(nextMutedState);

    if (!nextMutedState) {
      try {
        await video.play();
      } catch (error) {
        console.error(
          "Não foi possível reproduzir o vídeo:",
          error,
        );

        video.muted = true;
        setIsMuted(true);
      }
    }
  }

  function scrollToCountdown() {
    document
      .getElementById("contagem")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  return (
    <div
      ref={rootRef}
      className={styles.main}
    >
      {/* Vídeo principal */}

      <section
        className={styles.hero}
        aria-label="Mylena e Nerivaldo"
      >
        <video
          ref={videoRef}
          className={styles.heroVideo}
          src="/images/casamento-principal.mp4"
          poster="/images/noivos-casamento.png"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
        />

        <div
          className={styles.heroOverlay}
          aria-hidden="true"
        />

        <div
          className={styles.heroVignette}
          aria-hidden="true"
        />

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>
            Nós vamos nos casar
          </p>

          <h1>
            Mylena

            <span>&amp;</span>

            Nerivaldo
          </h1>

          <div
            className={
              styles.heroOrnament
            }
          >
            <span />

            <Heart
              size={14}
              fill="currentColor"
            />

            <span />
          </div>

          <p className={styles.heroDate}>
            20 de agosto de 2027
          </p>
        </div>

        <button
          className={styles.scrollButton}
          type="button"
          onClick={scrollToCountdown}
          aria-label="Ir para a contagem regressiva"
        >
          <ChevronDown
            size={22}
            strokeWidth={1.3}
          />
        </button>

        <button
          className={styles.soundButton}
          type="button"
          onClick={toggleVideoSound}
          aria-label={
            isMuted
              ? "Ativar som do vídeo"
              : "Desativar som do vídeo"
          }
        >
          {isMuted ? (
            <VolumeX
              size={18}
              strokeWidth={1.5}
            />
          ) : (
            <Volume2
              size={18}
              strokeWidth={1.5}
            />
          )}
        </button>
      </section>

      {/* Contagem regressiva */}

      <section
        id="contagem"
        className={`${styles.countdownSection} ${styles.reveal}`}
        data-reveal
      >
        <div
          className={styles.sectionOrnament}
          aria-hidden="true"
        >
          <span>❦</span>
        </div>

        <p className={styles.scriptTitle}>
          Contagem regressiva
        </p>

        <h2>
          Para o dia mais especial
          das nossas vidas
        </h2>

        <div className={styles.countdown}>
          <div>
            <strong>
              {countdown.days}
            </strong>

            <span>Dias</span>
          </div>

          <div>
            <strong>
              {String(
                countdown.hours,
              ).padStart(2, "0")}
            </strong>

            <span>Horas</span>
          </div>

          <div>
            <strong>
              {String(
                countdown.minutes,
              ).padStart(2, "0")}
            </strong>

            <span>Minutos</span>
          </div>

          <div>
            <strong>
              {String(
                countdown.seconds,
              ).padStart(2, "0")}
            </strong>

            <span>Segundos</span>
          </div>
        </div>
      </section>

      {/* Boas-vindas */}

      <section className={styles.welcomeSection}>
        <div
          className={`${styles.welcomeContent} ${styles.reveal}`}
          data-reveal
        >
          <p className={styles.scriptTitle}>
            Bem-vindo!
          </p>

          <div
            className={styles.divider}
            aria-hidden="true"
          >
            <span />
            <i>❦</i>
            <span />
          </div>

          <p className={styles.welcomeText}>
            Desde o nosso primeiro
            encontro, descobrimos que o
            amor transforma os dias mais
            simples em memórias
            inesquecíveis.
          </p>

          <p className={styles.welcomeText}>
            Em breve iniciaremos um novo
            capítulo da nossa história,
            cercados pelas pessoas que
            amamos. Será uma alegria ter
            você conosco neste momento.
          </p>
        </div>
      </section>

      {/* Convidado */}

      <section className={styles.guestSection}>
        <div
          className={`${styles.guestCard} ${styles.reveal}`}
          data-reveal
        >
          <Heart
            size={23}
            fill="currentColor"
          />

          <p>Este convite pertence a</p>

          <h2>
            Vinicius
            <span>Semola Arruda</span>
          </h2>

          <div
            className={styles.guestDivider}
          >
            <span />
            <i>❦</i>
            <span />
          </div>

          <p className={styles.guestMessage}>
            Vinicius, preparamos cada
            detalhe deste dia com muito
            carinho. Sua presença fará parte
            das lembranças que levaremos
            para sempre e tornará nossa
            celebração ainda mais especial.
          </p>
        </div>
      </section>

      {/* Nossos momentos */}

      <section className={styles.momentsSection}>
        <div
          className={`${styles.sectionHeading} ${styles.reveal}`}
          data-reveal
        >
          <p className={styles.scriptTitle}>
            Nossos momentos
          </p>

          <span>
            Uma história feita de amor,
            sonhos e escolhas
          </span>
        </div>

        <div className={styles.momentsGrid}>
          <figure
            className={`${styles.momentCard} ${styles.momentCardFirst} ${styles.reveal}`}
            data-reveal
          >
            <Image
              src="/images/noivos-casamento.png"
              alt="Mylena e Nerivaldo juntos"
              fill
              sizes="(max-width: 700px) 48vw, 340px"
              className={styles.momentImage}
            />

            <div
              className={styles.imageShade}
            />
          </figure>

          <figure
            className={`${styles.momentCard} ${styles.momentCardSecond} ${styles.reveal}`}
            data-reveal
          >
            <Image
              src="/images/noivos-casamento.png"
              alt="Momento especial de Mylena e Nerivaldo"
              fill
              sizes="(max-width: 700px) 48vw, 340px"
              className={styles.momentImage}
            />

            <div
              className={styles.imageShade}
            />
          </figure>
        </div>

        <p
          className={`${styles.momentsText} ${styles.reveal}`}
          data-reveal
        >
          Algumas histórias são escritas
          aos poucos. A nossa foi construída
          em cada encontro, em cada sonho e
          em cada decisão de caminhar lado a
          lado.
        </p>
      </section>

      {/* Data e horário */}

      <section className={styles.detailsSection}>
        <div
          className={`${styles.sectionHeading} ${styles.reveal}`}
          data-reveal
        >
          <p className={styles.scriptTitle}>
            O grande dia
          </p>

          <span>
            Esperamos você para celebrar
            conosco
          </span>
        </div>

        <div className={styles.detailsGrid}>
          <article
            className={`${styles.detailCard} ${styles.reveal}`}
            data-reveal
          >
            <CalendarDays
              size={27}
              strokeWidth={1.2}
            />

            <span>Data</span>

            <strong>
              20 de agosto de 2027
            </strong>
          </article>

          <article
            className={`${styles.detailCard} ${styles.reveal}`}
            data-reveal
          >
            <Clock3
              size={27}
              strokeWidth={1.2}
            />

            <span>Horário</span>

            <strong>16 horas</strong>
          </article>
        </div>
      </section>

      {/* Localização */}

      <section className={styles.locationSection}>
        <div
          className={`${styles.locationContent} ${styles.reveal}`}
          data-reveal
        >
          <MapPin
            size={31}
            strokeWidth={1.2}
          />

          <p className={styles.scriptTitle}>
            Cerimônia e celebração
          </p>

          <h2>
            Local do casamento
          </h2>

          <p>
            Endereço completo da cerimônia
            <br />
            Rio de Janeiro — RJ
          </p>

          <a
            className={styles.mapsButton}
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin
              size={16}
              strokeWidth={1.7}
            />

            Abrir no Google Maps
          </a>
        </div>

        <div
          className={`${styles.mapPreview} ${styles.reveal}`}
          data-reveal
        >
          <div>
            <MapPin
              size={30}
              fill="currentColor"
            />
          </div>

          <span>
            Rio de Janeiro
          </span>

          <small>
            Toque no botão para visualizar
            a rota
          </small>
        </div>
      </section>

      {/* QR Code */}

      <section className={styles.accessSection}>
        <div
          className={`${styles.accessCard} ${styles.reveal}`}
          data-reveal
        >
          <QrCode
            size={27}
            strokeWidth={1.2}
          />

          <p className={styles.scriptTitle}>
            Seu acesso ao evento
          </p>

          <h2>
            Apresente este QR Code na
            entrada
          </h2>

          <div className={styles.qrBox}>
            <span
              className={styles.scanLine}
              aria-hidden="true"
            />

            <QRCodeSVG
              value="CONVITE-MYLENA-NERIVALDO-VINICIUS-SEMOLA-ARRUDA-2027"
              size={190}
              bgColor="#fffaf1"
              fgColor="#596044"
              level="H"
              marginSize={1}
            />
          </div>

          <strong>
            Vinicius Semola Arruda
          </strong>

          <small>
            Convite individual • Nº 001
          </small>

          <p className={styles.accessText}>
            Este QR Code é pessoal e deverá
            ser apresentado na recepção do
            evento para validar sua entrada.
          </p>
        </div>
      </section>

      {/* Final */}

      <footer className={styles.footer}>
        <div
          className={`${styles.footerContent} ${styles.reveal}`}
          data-reveal
        >
          <Heart
            size={22}
            fill="currentColor"
          />

          <p>
            Com carinho,
          </p>

          <h2>
            Mylena

            <span>&amp;</span>

            Nerivaldo
          </h2>

          <small>
            20 • 08 • 2027
          </small>
        </div>
      </footer>

      <button
        className={styles.floatingSoundButton}
        type="button"
        onClick={toggleVideoSound}
        aria-label={
          isMuted
            ? "Ativar som"
            : "Desativar som"
        }
      >
        {isMuted ? (
          <VolumeX
            size={17}
            strokeWidth={1.5}
          />
        ) : (
          <Volume2
            size={17}
            strokeWidth={1.5}
          />
        )}
      </button>
    </div>
  );
}