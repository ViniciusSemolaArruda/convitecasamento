"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

import styles from "./InvitationOpening.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function InvitationOpening() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const scrollReleasedRef = useRef(false);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousScrollBehavior = html.style.scrollBehavior;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    ScrollTrigger.clearScrollMemory("manual");

    html.style.scrollBehavior = "auto";
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const resetScroll = () => {
      window.scrollTo(0, 0);
    };

    resetScroll();

    const frame = window.requestAnimationFrame(() => {
      resetScroll();

      window.requestAnimationFrame(resetScroll);
    });

    const delayedReset = window.setTimeout(resetScroll, 120);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(delayedReset);

      if (!scrollReleasedRef.current) {
        html.style.overflow = previousHtmlOverflow;
        body.style.overflow = previousBodyOverflow;
      }

      html.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const scene = sceneRef.current;

      if (!section || !sticky || !scene) {
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

      gsap.set(`.${styles.decorativeLine}`, {
        opacity: 0,
        scaleX: 0.35,
      });

      gsap.set(`.${styles.bottomMessage}`, {
        opacity: 0,
        y: 20,
      });

      gsap.set(`.${styles.progressLine}`, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          id: "invitation-opening",
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 5}`,
          scrub: 1.15,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: false,
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

      const releaseScroll = () => {
        window.scrollTo(0, 0);
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        scrollReleasedRef.current = true;
        ScrollTrigger.refresh();
      };

      const releaseFrame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(releaseScroll);
      });

      const orientationRefresh = () => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      };

      window.addEventListener("orientationchange", orientationRefresh);

      return () => {
        window.cancelAnimationFrame(releaseFrame);
        window.removeEventListener(
          "orientationchange",
          orientationRefresh,
        );
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [],
      revertOnUpdate: true,
    },
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.backgroundGlow} />

        <div className={styles.introduction}>
          <span>Um convite especial para você</span>

          <div className={styles.scrollMessage}>
            <p>Role para abrir</p>
            <ChevronDown size={18} strokeWidth={1.5} />
          </div>
        </div>

        <div ref={sceneRef} className={styles.scene}>
          <div className={styles.openInvitation}>
            <div className={styles.namesContent}>
              <p className={styles.subtitle}>O casamento de</p>

              <div className={styles.names}>
                <h1 className={styles.firstName}>Mylena</h1>
                <span className={styles.ampersand}>&amp;</span>
                <h1 className={styles.secondName}>Nerivaldo</h1>
              </div>

              <div className={styles.decorativeLine}>
                <span />
                <i aria-hidden="true">❦</i>
                <span />
              </div>

              <p className={styles.bottomMessage}>
                Em breve, celebraremos juntos
              </p>
            </div>
          </div>

          <div className={`${styles.door} ${styles.leftDoor}`}>
            <div className={styles.leftImage} />
            <div className={styles.leftShadow} />
          </div>

          <div className={`${styles.door} ${styles.rightDoor}`}>
            <div className={styles.rightImage} />
            <div className={styles.rightShadow} />
          </div>
        </div>

        <div className={styles.progress}>
          <span className={styles.progressLine} />
        </div>
      </div>
    </section>
  );
}