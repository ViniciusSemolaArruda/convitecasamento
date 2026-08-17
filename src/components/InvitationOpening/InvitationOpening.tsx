"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./InvitationOpening.module.css";

gsap.registerPlugin(useGSAP);

/*
 * Quantidade aproximada de movimento necessária
 * para concluir toda a abertura.
 */
const OPENING_DISTANCE = 1750;

export default function InvitationOpening() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const sceneRef =
    useRef<HTMLDivElement>(null);

  const timelineRef =
    useRef<gsap.core.Timeline | null>(
      null,
    );

  const progressTweenRef =
    useRef<gsap.core.Tween | null>(null);

  const progressRef = useRef(0);
  const lastTouchYRef =
    useRef<number | null>(null);

  const releasedRef = useRef(false);

  const restoreScrollRef =
    useRef<(() => void) | null>(null);

  const [isComplete, setIsComplete] =
    useState(false);

  useGSAP(
    () => {
      const scene = sceneRef.current;

      if (!scene) {
        return;
      }

      gsap.set(`.${styles.leftDoor}`, {
        transformOrigin: "left center",
      });

      gsap.set(`.${styles.rightDoor}`, {
        transformOrigin: "right center",
      });

      gsap.set(`.${styles.namesContent}`, {
        opacity: 0,
        scale: 0.92,
        y: 35,
      });

      gsap.set(`.${styles.subtitle}`, {
        opacity: 0,
        y: 18,
      });

      gsap.set(`.${styles.firstName}`, {
        opacity: 0,
        y: 25,
      });

      gsap.set(`.${styles.secondName}`, {
        opacity: 0,
        y: 25,
      });

      gsap.set(`.${styles.ampersand}`, {
        opacity: 0,
        scale: 0.6,
        rotate: -15,
      });

      gsap.set(
        `.${styles.decorativeLine}`,
        {
          opacity: 0,
          scaleX: 0.35,
        },
      );

      gsap.set(`.${styles.bottomMessage}`, {
        opacity: 0,
        y: 20,
      });

      gsap.set(`.${styles.progressLine}`, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      const timeline = gsap.timeline({
        paused: true,

        defaults: {
          ease: "none",
        },
      });

      timeline
        .to(
          `.${styles.introduction}`,
          {
            opacity: 0,
            y: -25,
            duration: 0.65,
          },
          0,
        )

        .to(
          `.${styles.progressLine}`,
          {
            scaleY: 1,
            duration: 5.5,
          },
          0,
        )

        .to(
          scene,
          {
            scale: 1.015,
            duration: 0.9,
            ease: "power2.inOut",
          },
          0,
        )

        .to(
          `.${styles.leftDoor}`,
          {
            xPercent: -101,
            rotateY: -16,
            duration: 2.2,
            ease: "power2.inOut",
          },
          0.75,
        )

        .to(
          `.${styles.rightDoor}`,
          {
            xPercent: 101,
            rotateY: 16,
            duration: 2.2,
            ease: "power2.inOut",
          },
          0.75,
        )

        .to(
          `.${styles.leftShadow}`,
          {
            opacity: 0.42,
            duration: 0.8,
          },
          0.75,
        )

        .to(
          `.${styles.rightShadow}`,
          {
            opacity: 0.42,
            duration: 0.8,
          },
          0.75,
        )

        .to(
          [
            `.${styles.leftDoor}`,
            `.${styles.rightDoor}`,
          ],
          {
            autoAlpha: 0,
            duration: 0.3,
          },
          2.8,
        )

        .to(
          `.${styles.openInvitation}`,
          {
            scale: 1.025,
            duration: 1.5,
            ease: "power2.inOut",
          },
          1.85,
        )

        .to(
          `.${styles.namesContent}`,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          2.65,
        )

        .to(
          `.${styles.subtitle}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
          },
          2.85,
        )

        .to(
          `.${styles.firstName}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
          },
          3.1,
        )

        .to(
          `.${styles.ampersand}`,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.65,
            ease: "back.out(1.7)",
          },
          3.45,
        )

        .to(
          `.${styles.secondName}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
          },
          3.7,
        )

        .to(
          `.${styles.decorativeLine}`,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          },
          4.05,
        )

        .to(
          `.${styles.bottomMessage}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          4.3,
        );

      timelineRef.current = timeline;

      return () => {
        progressTweenRef.current?.kill();
        timeline.kill();

        progressTweenRef.current = null;
        timelineRef.current = null;
      };
    },
    {
      scope: sectionRef,
      dependencies: [],
      revertOnUpdate: true,
    },
  );

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

    const previousHtmlScrollBehavior =
      html.style.scrollBehavior;

    /*
     * Garante que a experiência sempre
     * comece no topo.
     */
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    /*
     * Bloqueio real da página.
     */
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    function restoreScroll() {
      html.style.overflow =
        previousHtmlOverflow;

      body.style.overflow =
        previousBodyOverflow;

      html.style.overscrollBehavior =
        previousHtmlOverscroll;

      body.style.overscrollBehavior =
        previousBodyOverscroll;

      html.style.scrollBehavior =
        previousHtmlScrollBehavior;
    }

    restoreScrollRef.current =
      restoreScroll;

    function finishOpening() {
      if (releasedRef.current) {
        return;
      }

      releasedRef.current = true;
      progressRef.current = 1;

      progressTweenRef.current?.kill();

      timelineRef.current?.progress(1);
      timelineRef.current?.pause();

      setIsComplete(true);
      restoreScroll();
    }

    function updateProgress(
      movement: number,
    ) {
      if (
        releasedRef.current ||
        !timelineRef.current
      ) {
        return;
      }

      /*
       * Movimento para cima avança.
       * Movimento para baixo volta a animação.
       */
      const nextProgress = gsap.utils.clamp(
        0,
        1,
        progressRef.current +
          movement / OPENING_DISTANCE,
      );

      progressRef.current =
        nextProgress;

      progressTweenRef.current?.kill();

      progressTweenRef.current = gsap.to(
        timelineRef.current,
        {
          progress: nextProgress,
          duration: 0.28,
          ease: "power2.out",
          overwrite: true,

          onComplete: () => {
            if (nextProgress >= 0.999) {
              finishOpening();
            }
          },
        },
      );
    }

    function handleWheel(
      event: WheelEvent,
    ) {
      if (releasedRef.current) {
        return;
      }

      event.preventDefault();

      /*
       * Limita rodas e trackpads muito rápidos.
       */
      const movement = gsap.utils.clamp(
        -120,
        120,
        event.deltaY,
      );

      updateProgress(movement);
    }

    function handleTouchStart(
      event: TouchEvent,
    ) {
      if (releasedRef.current) {
        return;
      }

      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      lastTouchYRef.current =
        touch.clientY;
    }

    function handleTouchMove(
      event: TouchEvent,
    ) {
      if (releasedRef.current) {
        return;
      }

      event.preventDefault();

      const touch = event.touches[0];

      if (
        !touch ||
        lastTouchYRef.current === null
      ) {
        return;
      }

      /*
       * Arrastar o dedo para cima gera
       * movimento positivo.
       */
      const movement =
        lastTouchYRef.current -
        touch.clientY;

      lastTouchYRef.current =
        touch.clientY;

      updateProgress(movement);
    }

    function handleTouchEnd() {
      lastTouchYRef.current = null;
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (releasedRef.current) {
        return;
      }

      const forwardKeys = [
        "ArrowDown",
        "PageDown",
        " ",
        "Enter",
      ];

      const backwardKeys = [
        "ArrowUp",
        "PageUp",
      ];

      if (
        forwardKeys.includes(event.key)
      ) {
        event.preventDefault();
        updateProgress(120);
      }

      if (
        backwardKeys.includes(event.key)
      ) {
        event.preventDefault();
        updateProgress(-120);
      }
    }

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      {
        passive: false,
      },
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: false,
      },
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd,
    );

    window.addEventListener(
      "touchcancel",
      handleTouchEnd,
    );

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel,
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart,
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove,
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd,
      );

      window.removeEventListener(
        "touchcancel",
        handleTouchEnd,
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      progressTweenRef.current?.kill();

      restoreScroll();
      restoreScrollRef.current = null;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${
        isComplete
          ? styles.sectionComplete
          : ""
      }`}
    >
      <div
        className={`${styles.sticky} ${
          isComplete
            ? styles.stickyComplete
            : ""
        }`}
      >
        <div
          className={styles.backgroundGlow}
          aria-hidden="true"
        />

        <div className={styles.introduction}>
          <span>
            Um convite especial para você
          </span>

          <div className={styles.scrollMessage}>
            <p>
              Arraste para abrir
            </p>

            <ChevronDown
              size={18}
              strokeWidth={1.5}
            />
          </div>
        </div>

        <div
          ref={sceneRef}
          className={styles.scene}
        >
          <div
            className={
              styles.openInvitation
            }
          >
            <div
              className={
                styles.namesContent
              }
            >
              <p className={styles.subtitle}>
                O casamento de
              </p>

              <div className={styles.names}>
                <h1
                  className={
                    styles.firstName
                  }
                >
                  Mylena
                </h1>

                <span
                  className={
                    styles.ampersand
                  }
                >
                  &amp;
                </span>

                <h1
                  className={
                    styles.secondName
                  }
                >
                  Nerivaldo
                </h1>
              </div>

              <div
                className={
                  styles.decorativeLine
                }
              >
                <span />

                <i aria-hidden="true">
                  ❦
                </i>

                <span />
              </div>

              <p
                className={
                  styles.bottomMessage
                }
              >
                Em breve, celebraremos
                juntos
              </p>
            </div>
          </div>

          <div
            className={`${styles.door} ${styles.leftDoor}`}
          >
            <div
              className={styles.leftImage}
            />

            <div
              className={
                styles.leftShadow
              }
            />
          </div>

          <div
            className={`${styles.door} ${styles.rightDoor}`}
          >
            <div
              className={
                styles.rightImage
              }
            />

            <div
              className={
                styles.rightShadow
              }
            />
          </div>
        </div>

        <div
          className={styles.progress}
          aria-hidden="true"
        >
          <span
            className={
              styles.progressLine
            }
          />
        </div>
      </div>
    </section>
  );
}