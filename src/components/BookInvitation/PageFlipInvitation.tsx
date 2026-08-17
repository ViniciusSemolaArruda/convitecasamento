"use client";

import {
  Heart,
} from "lucide-react";
import Image from "next/image";
import {
  ComponentType,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import HTMLFlipBook from "react-pageflip";

import { invitationPages } from "./BookInvitation";
import styles from "./PageFlipInvitation.module.css";

/*
 * A tipagem publicada pelo react-pageflip exige várias propriedades
 * internas que o próprio componente preenche. Este alias mantém o uso
 * limpo no TypeScript sem retirar nenhuma funcionalidade da biblioteca.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlipBook = HTMLFlipBook as unknown as ComponentType<any>;

type BookPageProps = {
  children: ReactNode;
  className?: string;
  number?: number;
};

const BookPage = forwardRef<HTMLDivElement, BookPageProps>(
  function BookPage(
    { children, className = "", number },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={`${styles.page} ${className}`}
      >
        <div className={styles.paperTexture} />
        <div className={styles.pageBorder} />
        <div className={styles.pageBody}>
          {children}
        </div>

        {number !== undefined && (
          <span className={styles.pageNumber}>
            {String(number).padStart(2, "0")}
          </span>
        )}

        <span
          className={styles.cornerHint}
          aria-hidden="true"
        />
      </div>
    );
  },
);

export default function PageFlipInvitation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] =
    useState(0);
  const [isPortrait, setIsPortrait] =
    useState(true);
  const [viewport, setViewport] =
    useState({ width: 420, height: 680 });
  const [hasStarted, setHasStarted] =
    useState(false);
  const [isOpening, setIsOpening] =
    useState(false);
  const [showOpeningCover, setShowOpeningCover] =
    useState(true);

  const totalPages =
    invitationPages.length + 2;

  useEffect(() => {
    const media = window.matchMedia(
      "(max-width: 760px)",
    );

    const updateMode = () => {
      setIsPortrait(media.matches);
      setViewport({
        width: Math.max(
          280,
          window.innerWidth,
        ),
        height: Math.max(
          470,
          window.innerHeight,
        ),
      });
    };

    updateMode();
    media.addEventListener("change", updateMode);
    window.addEventListener("resize", updateMode);

    return () => {
      media.removeEventListener(
        "change",
        updateMode,
      );
      window.removeEventListener(
        "resize",
        updateMode,
      );
    };
  }, []);

  function openInvitation() {
    if (isOpening || hasStarted) {
      return;
    }

    /*
     * Coloca o livro na primeira página interna
     * enquanto a capa dividida ainda está inteira
     * e escondendo tudo. Assim não existe uma
     * segunda cópia da capa por baixo da abertura.
     */
    bookRef.current
      ?.pageFlip()
      ?.turnToPage(1);

    setIsOpening(true);
  }

  function finishOpening() {
    if (!isOpening || !showOpeningCover) {
      return;
    }

    setShowOpeningCover(false);
    setHasStarted(true);
  }

  return (
    <main className={styles.experience}>
      <div
        className={styles.ambientGlow}
        aria-hidden="true"
      />

      <header
        className={`${styles.heading} ${
          isOpening || hasStarted
            ? styles.headingHidden
            : ""
        }`}
      >
        <p>Um convite especial para você</p>
        <span>
          Toque no selo para abrir
        </span>
      </header>

      <section
        className={`${styles.bookArea} ${
          hasStarted ? styles.bookStarted : ""
        }`}
        aria-label="Convite de casamento interativo"
      >
        {showOpeningCover && (
        <div
          className={`${styles.splitCover} ${
            isOpening
              ? styles.splitCoverOpening
              : ""
          }`}
          aria-hidden={isOpening}
        >
          <div
            className={`${styles.coverHalf} ${styles.coverHalfLeft}`}
          />

          <div
            className={`${styles.coverHalf} ${styles.coverHalfRight}`}
            onTransitionEnd={(event) => {
              if (
                event.propertyName ===
                "transform"
              ) {
                finishOpening();
              }
            }}
          />

          <span
            className={styles.splitShadow}
            aria-hidden="true"
          />

          <button
            className={styles.sealButton}
            type="button"
            onPointerDown={(event) => {
              event.stopPropagation();

              window.dispatchEvent(
                new Event(
                  "wedding:play-music",
                ),
              );
            }}
            onClick={(event) => {
              event.stopPropagation();
              openInvitation();
            }}
            aria-label="Abrir convite"
          >
            <span />
            <Heart
              size={19}
              fill="currentColor"
            />
            <strong>Abrir</strong>
          </button>
        </div>
        )}

        <FlipBook
          key={`${isPortrait ? "portrait" : "landscape"}-${viewport.width}-${viewport.height}`}
          ref={bookRef}
          width={
            isPortrait
              ? viewport.width
              : 420
          }
          height={
            isPortrait
              ? viewport.height
              : 680
          }
          size={
            isPortrait
              ? "fixed"
              : "stretch"
          }
          minWidth={280}
          maxWidth={
            isPortrait
              ? viewport.width
              : 480
          }
          minHeight={470}
          maxHeight={
            isPortrait
              ? viewport.height
              : 760
          }
          showCover
          usePortrait={isPortrait}
          startPage={0}
          drawShadow
          flippingTime={
            isPortrait ? 780 : 1050
          }
          useMouseEvents
          swipeDistance={
            isPortrait ? 14 : 38
          }
          clickEventForward
          disableFlipByClick
          mobileScrollSupport={false}
          maxShadowOpacity={
            isPortrait ? 0.36 : 0.46
          }
          showPageCorners
          autoSize
          onFlip={(event: { data: number }) => {
            setCurrentPage(event.data);

            if (event.data > 0) {
              setHasStarted(true);
            }
          }}
          className={styles.flipBook}
          style={{}}
        >
          <BookPage
            className={styles.coverPage}
          >
            <Image
              src="/images/convite-fechado.png"
              alt="Convite fechado de Mylena e Nerivaldo"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 480px"
              className={styles.coverImage}
            />

          </BookPage>

          {invitationPages.map(
            (page, index) => (
              <BookPage
                key={page.id}
                number={index + 1}
              >
                {page.content}
              </BookPage>
            ),
          )}

          <BookPage
            className={styles.backCover}
          >
            <div className={styles.finalPage}>
              <Heart
                size={22}
                fill="currentColor"
              />
              <p>Com amor,</p>
              <h2>
                Mylena
                <span>&amp;</span>
                Nerivaldo
              </h2>
              <small>20 • 08 • 2027</small>
            </div>
          </BookPage>
        </FlipBook>
      </section>

      <nav
        className={`${styles.controls} ${
          hasStarted ? styles.controlsVisible : ""
        }`}
        aria-label="Navegação do convite"
      >
        <div className={styles.progressTrack}>
          <span
            style={{
              width: `${
                (currentPage /
                  (totalPages - 1)) *
                100
              }%`,
            }}
          />
        </div>

        <p>
          {Math.min(
            currentPage + 1,
            totalPages,
          )}
          <span>/</span>
          {totalPages}
        </p>

      </nav>

      {hasStarted &&
        currentPage < totalPages - 1 && (
          <p className={styles.gestureTip}>
            Arraste a dobrinha com o dedo
          </p>
        )}
    </main>
  );
}