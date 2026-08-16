"use client";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Church,
  Clock3,
  Gift,
  Heart,
  MapPin,
  QrCode,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { PointerEvent, useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import styles from "./BookInvitation.module.css";

export const invitationPages = [
  {
    id: "names",
    content: (
      <div className={styles.namesPage}>
        <p className={styles.eyebrow}>O casamento de</p>
        <h1>Mylena</h1>
        <span className={styles.ampersand}>&amp;</span>
        <h1>Nerivaldo</h1>
        <div className={styles.ornament}><span /><Heart size={15} fill="currentColor" /><span /></div>
        <p className={styles.italic}>Duas histórias, um só caminho.</p>
      </div>
    ),
  },
  {
    id: "story",
    content: (
      <div className={styles.storyPage}>
        <p className={styles.eyebrow}>Como tudo começou</p>
        <h2>Nossa História</h2>
        <figure className={styles.photo}>
          <Image
            src="/images/noivos-casamento.png"
            alt="Mylena e Nerivaldo"
            fill
            sizes="(max-width: 700px) 78vw, 360px"
            priority
          />
        </figure>
        <p>
          Entre encontros, sonhos e escolhas, descobrimos que o amor
          transforma os dias simples em lembranças inesquecíveis.
        </p>
      </div>
    ),
  },
  {
    id: "date",
    content: (
      <div className={styles.datePage}>
        <div className={styles.pageSeal}><CalendarDays size={28} /></div>
        <p className={styles.eyebrow}>Reserve esta data</p>
        <h2>20</h2>
        <strong>Agosto</strong>
        <h3>2027</h3>
        <div className={styles.dateDetails}>
          <span><Clock3 size={16} /> 16 horas</span>
          <span><Heart size={16} /> Quinta-feira</span>
        </div>
      </div>
    ),
  },
  {
    id: "place",
    content: (
      <div className={styles.placePage}>
        <Church className={styles.churchIcon} size={54} strokeWidth={1} />
        <p className={styles.eyebrow}>O grande dia</p>
        <h2>Cerimônia<br />&amp; Celebração</h2>
        <div className={styles.addressCard}>
          <MapPin size={20} />
          <div>
            <strong>Local da cerimônia</strong>
            <p>Endereço completo do casamento</p>
            <span>Rio de Janeiro — RJ</span>
          </div>
        </div>
        <a
          className={styles.actionButton}
          href="https://maps.google.com"
          target="_blank"
          rel="noreferrer"
        >
          Ver localização
        </a>
      </div>
    ),
  },
  {
    id: "guest",
    content: (
      <div className={styles.guestPage}>
        <Sparkles size={25} />
        <p className={styles.eyebrow}>Este convite pertence a</p>
        <h2>Vinicius<br />Semola Arruda</h2>
        <div className={styles.ornament}><span /><Heart size={14} fill="currentColor" /><span /></div>
        <p>
          Sua presença fará parte daquilo que tornará este dia único.
          Preparamos cada detalhe com carinho e esperamos celebrar essa
          história ao seu lado.
        </p>
      </div>
    ),
  },
  {
    id: "gift",
    content: (
      <div className={styles.giftPage}>
        <Gift size={34} strokeWidth={1.2} />
        <p className={styles.eyebrow}>Com carinho</p>
        <h2>Lista de Presentes</h2>
        <p>
          O maior presente é ter você conosco. Caso queira nos presentear,
          preparamos uma seleção especial.
        </p>
        <button className={styles.actionButton} type="button">
          Conhecer a lista
        </button>
      </div>
    ),
  },
  {
    id: "access",
    content: (
      <div className={styles.accessPage}>
        <QrCode size={27} strokeWidth={1.3} />
        <p className={styles.eyebrow}>Seu acesso ao evento</p>
        <h2>Apresente na entrada</h2>
        <div className={styles.qrBox}>
          <span className={styles.scanLine} />
          <QRCodeSVG
            value="CONVITE-NERIVALDO-MYLENA-VINICIUS-2027"
            size={156}
            bgColor="#fffaf2"
            fgColor="#611526"
            level="H"
          />
        </div>
        <strong>VINICIUS SEMOLA ARRUDA</strong>
        <small>Convite individual • Nº 001</small>
      </div>
    ),
  },
  {
    id: "end",
    content: (
      <div className={styles.endPage}>
        <Heart size={24} fill="currentColor" />
        <p className={styles.eyebrow}>Esperamos por você</p>
        <h2>Até o<br />grande dia!</h2>
        <div className={styles.monogram}>M <span>&amp;</span> N</div>
        <p className={styles.italic}>20 • 08 • 2027</p>
      </div>
    ),
  },
];

export default function BookInvitation() {
  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const pointerStart = useRef<number | null>(null);

  const goNext = () => {
    if (!opened || isTurning || currentPage >= invitationPages.length) return;
    setIsTurning(true);
    setCurrentPage((value) => Math.min(value + 1, invitationPages.length));
    window.setTimeout(() => setIsTurning(false), 900);
  };

  const goPrevious = () => {
    if (!opened || isTurning || currentPage <= 0) return;
    setIsTurning(true);
    setCurrentPage((value) => Math.max(value - 1, 0));
    window.setTimeout(() => setIsTurning(false), 900);
  };

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;

    if (distance < -45) goNext();
    if (distance > 45) goPrevious();
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrevious();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const progress = invitationPages.length ? (currentPage / invitationPages.length) * 100 : 0;

  return (
    <section className={styles.experience}>
      <div className={styles.ambientLight} />
      <div className={styles.floatingDust} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
      </div>

      <header className={`${styles.intro} ${opened ? styles.introHidden : ""}`}>
        <p>Um convite escrito para você</p>
        <span>Toque no selo para começar</span>
      </header>

      <div
        className={`${styles.closedInvitation} ${opened ? styles.closedInvitationOpened : ""}`}
        aria-hidden={opened}
      >
        <div className={`${styles.closedHalf} ${styles.closedLeft}`} />
        <div className={`${styles.closedHalf} ${styles.closedRight}`} />

        <button
          className={styles.centralSealButton}
          type="button"
          onClick={() => setOpened(true)}
          aria-label="Abrir o convite"
        >
          <span />
          <strong>Abrir convite</strong>
        </button>
      </div>

      <div
        className={`${styles.bookStage} ${opened ? styles.stageOpened : ""}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div className={styles.bookShadow} />

        <div className={styles.book}>
          <div className={styles.backCover} />
          <div className={styles.pageBlock} />

          <div className={styles.basePage}>
            <div className={styles.paperDecoration} />
            <div className={styles.finalInside}>
              <span>Com amor,</span>
              <strong>Mylena &amp; Nerivaldo</strong>
            </div>
          </div>

          {invitationPages.map((page, index) => (
            <article
              key={page.id}
              className={`${styles.sheet} ${index < currentPage ? styles.flipped : ""}`}
              style={{ zIndex: invitationPages.length - index + 3 }}
              aria-hidden={index !== currentPage && index !== currentPage - 1}
            >
              <div className={`${styles.face} ${styles.front}`}>
                <div className={styles.paperDecoration} />
                <div className={styles.pageContent}>{page.content}</div>
                <span className={styles.pageNumber}>{String(index + 1).padStart(2, "0")}</span>
                {index === currentPage && (
                  <button
                    className={styles.pageCorner}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      goNext();
                    }}
                    aria-label="Virar para a próxima página"
                  >
                    <span />
                  </button>
                )}
              </div>

              <div className={`${styles.face} ${styles.back}`}>
                <div className={styles.paperDecoration} />
                <div className={styles.backOrnament}>M <span>&amp;</span> N</div>
              </div>
            </article>
          ))}

          <div className={`${styles.cover} ${opened ? styles.coverOpened : ""}`}>
            <div className={styles.coverFront}>
              <div className={styles.coverFrame} />
              <div className={styles.coverBotanical} />
              <p>O casamento de</p>
              <h1>Mylena <span>&amp;</span> Nerivaldo</h1>
              <small>20 • 08 • 2027</small>

            </div>
            <div className={styles.coverInside}>
              <div className={styles.insideMonogram}>M <span>&amp;</span> N</div>
            </div>
          </div>
        </div>
      </div>

      <nav className={`${styles.controls} ${opened ? styles.controlsVisible : ""}`} aria-label="Navegação do convite">
        <button type="button" onClick={goPrevious} disabled={currentPage === 0} aria-label="Página anterior">
          <ChevronLeft size={20} />
        </button>
        <div className={styles.progress}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <p>{Math.min(currentPage + 1, invitationPages.length)} / {invitationPages.length}</p>
        <button type="button" onClick={goNext} disabled={currentPage === invitationPages.length} aria-label="Próxima página">
          <ChevronRight size={20} />
        </button>
      </nav>

      {opened && currentPage < invitationPages.length && (
        <p className={styles.tip}>Arraste a página ou toque na dobrinha</p>
      )}
    </section>
  );
}
