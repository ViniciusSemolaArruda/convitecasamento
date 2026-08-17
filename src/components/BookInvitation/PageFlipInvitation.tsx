"use client";

import {
  ChevronLeft,
  ChevronRight,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlipBook =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLFlipBook as unknown as ComponentType<any>;

type BookPageProps = {
  children: ReactNode;
  className?: string;
  number?: number;
};

const BookPage = forwardRef<
  HTMLDivElement,
  BookPageProps
>(function BookPage(
  {
    children,
    className = "",
    number,
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`${styles.page} ${className}`}
    >
      <div
        className={styles.paperTexture}
        aria-hidden="true"
      />

      <div
        className={styles.pageBorder}
        aria-hidden="true"
      />

      <div className={styles.pageBody}>
        {children}
      </div>

      {number !== undefined && (
        <span className={styles.pageNumber}>
          {String(number).padStart(2, "0")}
        </span>
      )}
    </div>
  );
});

export default function PageFlipInvitation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);

  const openingTimerRef =
  useRef<number | null>(null);

const turningTimerRef =
  useRef<number | null>(null);

  const [currentPage, setCurrentPage] =
    useState(0);

  const [isPortrait, setIsPortrait] =
    useState(true);

  const [viewport, setViewport] =
    useState({
      width: 420,
      height: 680,
    });

  const [hasStarted, setHasStarted] =
    useState(false);

  const [isOpening, setIsOpening] =
    useState(false);

  const [
    showOpeningCover,
    setShowOpeningCover,
  ] = useState(true);

  const [isTurning, setIsTurning] =
    useState(false);

  /*
   * 0 = capa fechada
   * 1 até invitationPages.length = páginas internas
   * última página = contracapa
   */
  const totalPages =
    invitationPages.length + 2;

  const firstInternalPage = 1;
  const lastPage = totalPages - 1;

  const canGoPrevious =
    hasStarted &&
    !isTurning &&
    currentPage > firstInternalPage;

  const canGoNext =
    hasStarted &&
    !isTurning &&
    currentPage < lastPage;

  useEffect(() => {
    const media = window.matchMedia(
      "(max-width: 760px)",
    );

    function updateBookSize() {
      const availableHeight =
        window.visualViewport?.height ??
        window.innerHeight;

      setIsPortrait(media.matches);

      setViewport({
        width: Math.max(
          280,
          window.innerWidth,
        ),

        height: Math.max(
          470,
          availableHeight,
        ),
      });
    }

    updateBookSize();

    media.addEventListener(
      "change",
      updateBookSize,
    );

    window.addEventListener(
      "resize",
      updateBookSize,
    );

    window.visualViewport?.addEventListener(
      "resize",
      updateBookSize,
    );

    return () => {
      media.removeEventListener(
        "change",
        updateBookSize,
      );

      window.removeEventListener(
        "resize",
        updateBookSize,
      );

      window.visualViewport?.removeEventListener(
        "resize",
        updateBookSize,
      );

      if (openingTimerRef.current) {
        window.clearTimeout(
          openingTimerRef.current,
        );
      }

      if (turningTimerRef.current) {
        window.clearTimeout(
          turningTimerRef.current,
        );
      }
    };
  }, []);

  function getPageFlip() {
    return bookRef.current?.pageFlip?.();
  }

  function openInvitation() {
    if (isOpening || hasStarted) {
      return;
    }

    const pageFlip = getPageFlip();

    /*
     * Posiciona o livro na primeira página
     * interna enquanto a capa ainda esconde
     * o conteúdo.
     */
    pageFlip?.turnToPage(
      firstInternalPage,
    );

    setCurrentPage(firstInternalPage);
    setIsOpening(true);

    /*
     * Segurança para navegadores que não
     * disparam transitionend corretamente.
     */
    openingTimerRef.current =
      window.setTimeout(() => {
        setShowOpeningCover(false);
        setHasStarted(true);
        setIsOpening(false);
      }, 1450);
  }

  function finishOpening() {
    if (
      !isOpening ||
      !showOpeningCover
    ) {
      return;
    }

    if (openingTimerRef.current) {
      window.clearTimeout(
        openingTimerRef.current,
      );

      openingTimerRef.current = null;
    }

    setShowOpeningCover(false);
    setHasStarted(true);
    setIsOpening(false);
  }

  function releaseTurning() {
    if (turningTimerRef.current) {
      window.clearTimeout(
        turningTimerRef.current,
      );
    }

    turningTimerRef.current =
      window.setTimeout(() => {
        setIsTurning(false);
      }, 120);
  }

  function goToNextPage() {
    if (!canGoNext) {
      return;
    }

    const pageFlip = getPageFlip();

    if (!pageFlip) {
      return;
    }

    setIsTurning(true);
    pageFlip.flipNext("bottom");
  }

  function goToPreviousPage() {
    /*
     * Essa verificação impede que o usuário
     * volte da primeira página interna
     * para a capa.
     */
    if (!canGoPrevious) {
      return;
    }

    const pageFlip = getPageFlip();

    if (!pageFlip) {
      return;
    }

    setIsTurning(true);
    pageFlip.flipPrev("bottom");
  }

  /*
   * Se o FlipBook for remontado ao girar
   * o celular, ele inicia na página atual
   * e nunca novamente na capa.
   */
  const safeStartPage = hasStarted
    ? Math.max(
        firstInternalPage,
        Math.min(currentPage, lastPage),
      )
    : 0;

  const visiblePage =
    currentPage < firstInternalPage
      ? firstInternalPage
      : currentPage;

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
        <p>
          Um convite especial para você
        </p>

        <span>
          Toque no selo para abrir
        </span>
      </header>

      <section
        className={`${styles.bookArea} ${
          hasStarted
            ? styles.bookStarted
            : ""
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
          key={`${
            isPortrait
              ? "portrait"
              : "landscape"
          }-${viewport.width}-${viewport.height}`}
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
          startPage={safeStartPage}
          drawShadow
          flippingTime={1050}
          useMouseEvents={false}
          mobileScrollSupport
          swipeDistance={9999}
          clickEventForward={false}
          disableFlipByClick
          maxShadowOpacity={0.48}
          showPageCorners={false}
          autoSize
          onFlip={(
            event: { data: number },
          ) => {
            const nextPage = event.data;

            /*
             * Segurança adicional:
             * se a biblioteca tentar retornar
             * para a capa, ela é imediatamente
             * reposicionada na página 1.
             */
            if (
              hasStarted &&
              nextPage <
                firstInternalPage
            ) {
              getPageFlip()?.turnToPage(
                firstInternalPage,
              );

              setCurrentPage(
                firstInternalPage,
              );

              releaseTurning();
              return;
            }

            setCurrentPage(nextPage);
            releaseTurning();
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
                size={24}
                fill="currentColor"
              />

              <p>Com amor,</p>

              <h2>
                Mylena

                <span>&amp;</span>

                Nerivaldo
              </h2>

              <small>
                20 • 08 • 2027
              </small>
            </div>
          </BookPage>
        </FlipBook>

        {hasStarted && (
          <nav
            className={styles.pageNavigation}
            aria-label="Navegação entre as páginas"
          >
            <button
                className={`${styles.foldButton} ${styles.foldButtonPrevious} ${
                  canGoPrevious
                    ? ""
                    : styles.foldButtonPreviousSmall
                }`}
                type="button"
                disabled={!canGoPrevious}
                onClick={(event) => {
                  event.stopPropagation();
                  goToPreviousPage();
                }}
                aria-label="Voltar para a página anterior"
              >
                {canGoPrevious && (
                  <span
                    className={styles.foldLabel}
                  >
                    <ChevronLeft
                      size={20}
                      strokeWidth={1.8}
                    />

                    Voltar
                  </span>
                )}
              </button>

            {canGoNext && (
              <button
                className={`${styles.foldButton} ${styles.foldButtonNext}`}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNextPage();
                }}
                aria-label="Avançar para a próxima página"
              >
                <span
                  className={styles.foldLabel}
                >
                  Próxima

                  <ChevronRight
                    size={20}
                    strokeWidth={1.8}
                  />
                </span>
              </button>
            )}
          </nav>
        )}
      </section>

      <nav
        className={`${styles.controls} ${
          hasStarted
            ? styles.controlsVisible
            : ""
        }`}
        aria-label="Progresso do convite"
      >
        <div className={styles.progressTrack}>
          <span
            style={{
              width: `${
                ((visiblePage -
                  firstInternalPage) /
                  Math.max(
                    1,
                    lastPage -
                      firstInternalPage,
                  )) *
                100
              }%`,
            }}
          />
        </div>

        <p>
          {visiblePage}

          <span>/</span>

          {lastPage}
        </p>
      </nav>

      {hasStarted &&
        canGoNext && (
          <p className={styles.gestureTip}>
            Use as dobrinhas para navegar
          </p>
        )}
    </main>
  );
}