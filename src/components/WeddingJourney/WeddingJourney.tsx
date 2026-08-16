/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Church,
  Clock3,
  Copy,
  Gift,
  GlassWater,
  Heart,
  Mail,
  MapPin,
  Navigation,
  QrCode,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  UserRound,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./WeddingJourney.module.css";

gsap.registerPlugin(
  ScrollTrigger,
  useGSAP,
);

const weddingInfo = {
  guestName: "Vinicius Semola Arruda",
  date: "20 de agosto de 2027",
  time: "Horário em breve",
  venue: "Local em breve",
  address: "Endereço em breve",
  mapUrl: "https://maps.google.com",
  pixKey: "",
  invitationCode: "NM-VSA-200827",
};

const weddingDate = new Date(
  "2027-08-20T00:00:00-03:00",
);

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(): Countdown {
  const distance = Math.max(
    weddingDate.getTime() - Date.now(),
    0,
  );

  return {
    days: Math.floor(
      distance / (1000 * 60 * 60 * 24),
    ),

    hours: Math.floor(
      (distance / (1000 * 60 * 60)) %
        24,
    ),

    minutes: Math.floor(
      (distance / (1000 * 60)) % 60,
    ),

    seconds: Math.floor(
      (distance / 1000) % 60,
    ),
  };
}

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

const storyItems = [
  {
    number: "01",
    title: "O primeiro encontro",
    description:
      "Foi aqui que a nossa história começou e os nossos caminhos se encontraram.",
  },
  {
    number: "02",
    title: "O nosso sim",
    description:
      "Escolhemos caminhar juntos e transformar os nossos sonhos em uma só história.",
  },
  {
    number: "03",
    title: "Para sempre",
    description:
      "Agora queremos celebrar esse novo capítulo ao lado de pessoas especiais.",
  },
];

const giftOptions = [
  {
    title: "Presente especial",
    description:
      "Um gesto de carinho para a nossa nova história.",
    icon: "gift",
  },
  {
    title: "Brinde aos noivos",
    description:
      "Celebre conosco esse momento inesquecível.",
    icon: "toast",
  },
  {
    title: "Presente via Pix",
    description:
      "Uma forma simples e carinhosa de nos presentear.",
    icon: "pix",
  },
];

export default function WeddingJourney() {
  const rootRef =
    useRef<HTMLDivElement>(null);

  const [countdown, setCountdown] =
    useState<Countdown>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  const [pixMessage, setPixMessage] =
    useState("");

  const [codeCopied, setCodeCopied] =
    useState(false);

  useEffect(() => {
    setCountdown(getCountdown());

    const interval = window.setInterval(
      () => {
        setCountdown(getCountdown());
      },
      1000,
    );

    return () =>
      window.clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      if (!rootRef.current) {
        return;
      }

      const sections =
        gsap.utils.toArray<HTMLElement>(
          "[data-section]",
        );

      sections.forEach((section) => {
        const animatedElements =
          section.querySelectorAll<HTMLElement>(
            "[data-animate]",
          );

        const stamps =
          section.querySelectorAll<HTMLElement>(
            "[data-stamp]",
          );

        gsap.fromTo(
          animatedElements,
          {
            opacity: 0,
            y: 35,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",

            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              toggleActions:
                "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          stamps,
          {
            opacity: 0,
            scale: 1.25,
            rotate: -30,
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.95,
            stagger: 0.1,
            ease: "back.out(1.7)",

            scrollTrigger: {
              trigger: section,
              start: "top 67%",
              toggleActions:
                "play none none reverse",
            },
          },
        );
      });

      gsap.fromTo(
        `.${styles.timelineLine}`,
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,
          duration: 1.7,
          ease: "power2.inOut",

          scrollTrigger: {
            trigger: `.${styles.storySection}`,
            start: "top 56%",
            toggleActions:
              "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        `.${styles.qrCard}`,
        {
          opacity: 0,
          scale: 0.9,
          rotateY: -10,
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.15,
          ease: "back.out(1.5)",

          scrollTrigger: {
            trigger: `.${styles.accessSection}`,
            start: "top 62%",
            toggleActions:
              "play none none reverse",
          },
        },
      );

      // Camada premium: movimentos editoriais suaves, sempre ligados ao scroll.
      gsap.fromTo(
        `.${styles.photoPaper}`,
        {
          clipPath: "inset(0 0 100% 0)",
          rotate: -3,
          scale: 0.96,
        },
        {
          clipPath: "inset(0 0 0% 0)",
          rotate: -1,
          scale: 1,
          duration: 1.35,
          ease: "power4.out",
          scrollTrigger: {
            trigger: `.${styles.photoPaper}`,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to(`.${styles.couplePhoto}`, {
        scale: 1.08,
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: `.${styles.photoPaper}`,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.fromTo(
        `.${styles.countdownGrid} > div`,
        { opacity: 0, y: 18, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.09,
          ease: "back.out(1.45)",
          scrollTrigger: {
            trigger: `.${styles.countdown}`,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        `.${styles.giftCard}`,
        { opacity: 0, x: 28, rotate: 1.5 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.giftsSection}`,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to(`.${styles.qrWrapper}`, {
        y: -4,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      ScrollTrigger.refresh();
    },
    {
      scope: rootRef,
    },
  );

  async function handlePix() {
    if (!weddingInfo.pixKey) {
      setPixMessage(
        "A chave Pix será adicionada em breve.",
      );

      window.setTimeout(() => {
        setPixMessage("");
      }, 2800);

      return;
    }

    await navigator.clipboard.writeText(
      weddingInfo.pixKey,
    );

    setPixMessage(
      "Chave Pix copiada!",
    );

    window.setTimeout(() => {
      setPixMessage("");
    }, 2800);
  }

  async function handleCopyCode() {
    await navigator.clipboard.writeText(
      weddingInfo.invitationCode,
    );

    setCodeCopied(true);

    window.setTimeout(() => {
      setCodeCopied(false);
    }, 2200);
  }

  return (
    <div
      ref={rootRef}
      className={styles.journey}
    >
      <div className={styles.sections}>
        {/* SAVE THE DATE */}

        <section
          className={`${styles.section} ${styles.saveDateSection}`}
          data-section
        >
          <div className={styles.content}>
            <div
              className={styles.calendarSeal}
              data-stamp
            >
              <CalendarDays
                size={34}
                strokeWidth={1.25}
              />

              <span
                className={styles.sealInner}
              />
            </div>

            <div className={styles.heading}>
              <p data-animate>
                Reserve esta data
              </p>

              <h2
                className={
                  styles.saveDateTitle
                }
                data-animate
              >
                <span>Save</span>
                <em>the</em>
                <span>Date</span>
              </h2>
            </div>

            <div
              className={
                styles.dateInformation
              }
              data-animate
            >
              <Heart
                size={16}
                fill="currentColor"
              />

              <strong>
                {weddingInfo.date}
              </strong>

              <span>
                Nerivaldo &amp; Mylena
              </span>
            </div>

            <div
              className={styles.countdown}
              data-animate
            >
              <p>Faltam</p>

              <div
                className={
                  styles.countdownGrid
                }
              >
                <div>
                  <strong>
                    {countdown.days}
                  </strong>

                  <span>Dias</span>
                </div>

                <div>
                  <strong>
                    {formatNumber(
                      countdown.hours,
                    )}
                  </strong>

                  <span>Horas</span>
                </div>

                <div>
                  <strong>
                    {formatNumber(
                      countdown.minutes,
                    )}
                  </strong>

                  <span>Minutos</span>
                </div>

                <div>
                  <strong>
                    {formatNumber(
                      countdown.seconds,
                    )}
                  </strong>

                  <span>Segundos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NOSSA HISTÓRIA */}

        <section
  className={`${styles.section} ${styles.storySection}`}
  data-section
>
  <div className={styles.content}>
    <header className={styles.header}>
      <p data-animate>
        Como tudo começou
      </p>

      <h2 data-animate>
        Nossa História
      </h2>
    </header>

    <figure
      className={styles.photoPaper}
      data-animate
    >
      <i
        className={styles.photoTape}
        aria-hidden="true"
      />

      <div className={styles.photoWrapper}>
        <img
          src="/images/noivos-casamento.png"
          alt="Nerivaldo e Mylena vestidos para o casamento"
          className={styles.couplePhoto}
        />

        <div
          className={styles.photoGradient}
          aria-hidden="true"
        />
      </div>

      <figcaption>
        Nerivaldo &amp; Mylena
      </figcaption>
    </figure>

    <div className={styles.timeline}>
      <span
        className={styles.timelineLine}
        aria-hidden="true"
      />

      {storyItems.map((item) => (
        <article
          key={item.number}
          className={styles.timelineItem}
          data-animate
        >
          <div
            className={styles.timelineSeal}
            data-stamp
          >
            <Heart
              size={11}
              fill="currentColor"
            />
          </div>

          <div>
            <small>{item.number}</small>

            <h3>{item.title}</h3>

            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

        {/* GRANDE DIA */}

        <section
          className={`${styles.section} ${styles.daySection}`}
          data-section
        >
          <div className={styles.content}>
            <header className={styles.header}>
              <p data-animate>
                Cerimônia e celebração
              </p>

              <h2 data-animate>
                O Grande Dia
              </h2>
            </header>

            <div
              className={styles.churchArch}
              data-animate
            >
              <Church
                size={110}
                strokeWidth={0.75}
              />

              <span
                className={
                  styles.archDecoration
                }
              />
            </div>

            <div className={styles.dayDetails}>
              <article data-animate>
                <div
                  className={
                    styles.detailIcon
                  }
                  data-stamp
                >
                  <Clock3 size={20} />
                </div>

                <div>
                  <span>
                    Data e horário
                  </span>

                  <strong>
                    {weddingInfo.date}
                  </strong>

                  <p>
                    {weddingInfo.time}
                  </p>
                </div>
              </article>

              <article data-animate>
                <div
                  className={
                    styles.detailIcon
                  }
                  data-stamp
                >
                  <MapPin size={20} />
                </div>

                <div>
                  <span>Local</span>

                  <strong>
                    {weddingInfo.venue}
                  </strong>

                  <p>
                    {weddingInfo.address}
                  </p>
                </div>
              </article>
            </div>

            <a
              className={
                styles.primaryButton
              }
              href={weddingInfo.mapUrl}
              target="_blank"
              rel="noreferrer"
              data-animate
            >
              <Navigation size={17} />

              Abrir localização

              <ChevronRight size={17} />
            </a>
          </div>
        </section>

        {/* CONVIDADO */}

        <section
          className={`${styles.section} ${styles.guestSection}`}
          data-section
        >
          <div className={styles.content}>
            <header className={styles.header}>
              <p data-animate>
                Este convite foi preparado
                especialmente para
              </p>

              <h2 data-animate>
                Nosso Convidado
              </h2>
            </header>

            <div
              className={styles.guestSeal}
              data-stamp
            >
              <UserRound
                size={32}
                strokeWidth={1.1}
              />

              <span />
            </div>

            <article
              className={styles.guestCard}
              data-animate
            >
              <Sparkles
                className={
                  styles.guestSparkle
                }
                size={18}
              />

              <p>Querido</p>

              <h3>
                {weddingInfo.guestName}
              </h3>

              <div
                className={
                  styles.guestDivider
                }
              >
                <span />
                <Heart
                  size={12}
                  fill="currentColor"
                />
                <span />
              </div>

              <p
                className={
                  styles.guestDescription
                }
              >
                Existem momentos que se
                tornam ainda mais especiais
                quando são compartilhados
                com pessoas importantes.
                Ficaremos muito felizes em
                ter você conosco para
                celebrar o início deste novo
                capítulo da nossa história.
              </p>

              <footer>
                Com carinho,
                <strong>
                  Nerivaldo &amp; Mylena
                </strong>
              </footer>
            </article>

            <div
              className={styles.confirmed}
              data-animate
            >
              <Check size={16} />

              Convite reservado para você
            </div>
          </div>
        </section>

        {/* PRESENTES */}

        <section
          className={`${styles.section} ${styles.giftsSection}`}
          data-section
        >
          <div className={styles.content}>
            <header className={styles.header}>
              <p data-animate>
                Seu carinho é o melhor
                presente
              </p>

              <h2 data-animate>
                Lista de Presentes
              </h2>
            </header>

            <div className={styles.giftList}>
              {giftOptions.map(
                (gift, index) => (
                  <button
                    key={gift.title}
                    type="button"
                    className={
                      styles.giftCard
                    }
                    data-animate
                    onClick={
                      index === 2
                        ? handlePix
                        : undefined
                    }
                  >
                    <div
                      className={
                        styles.giftIcon
                      }
                    >
                      {gift.icon ===
                      "gift" ? (
                        <Gift size={23} />
                      ) : gift.icon ===
                        "toast" ? (
                        <GlassWater
                          size={23}
                        />
                      ) : (
                        <Mail size={23} />
                      )}
                    </div>

                    <div>
                      <strong>
                        {gift.title}
                      </strong>

                      <span>
                        {
                          gift.description
                        }
                      </span>
                    </div>

                    <div
                      className={
                        styles.giftSeal
                      }
                      data-stamp
                    >
                      {index === 2 ? (
                        <Copy size={14} />
                      ) : (
                        <ChevronRight
                          size={16}
                        />
                      )}
                    </div>
                  </button>
                ),
              )}
            </div>

            {pixMessage && (
              <div
                className={
                  styles.messagePill
                }
              >
                <Copy size={14} />
                {pixMessage}
              </div>
            )}

            <div
              className={styles.giftClosing}
              data-animate
            >
              <Heart
                size={15}
                fill="currentColor"
              />

              <p>
                A sua presença é o nosso
                maior presente.
              </p>
            </div>
          </div>
        </section>

        {/* ACESSO COM QR CODE */}

        <section
          className={`${styles.section} ${styles.accessSection}`}
          data-section
        >
          <div className={styles.content}>
            <header className={styles.header}>
              <p data-animate>
                Apresente na entrada
              </p>

              <h2 data-animate>
                Seu Convite de Acesso
              </h2>
            </header>

            <div className={styles.qrCard}>
              <div
                className={
                  styles.qrCardHeader
                }
              >
                <div>
                  <TicketCheck
                    size={21}
                  />
                </div>

                <span>
                  Convite confirmado
                </span>
              </div>

              <div className={styles.qrWrapper}>
                <QRCodeSVG
                  value={JSON.stringify({
                    event:
                      "Casamento Nerivaldo e Mylena",
                    guest:
                      weddingInfo.guestName,
                    code:
                      weddingInfo.invitationCode,
                    date:
                      "2027-08-20",
                  })}
                  size={210}
                  level="H"
                  bgColor="#fffdf8"
                  fgColor="#52171f"
                  marginSize={2}
                  title={`Convite de ${weddingInfo.guestName}`}
                />

                <div
                  className={
                    styles.qrMonogram
                  }
                >
                  N
                  <span>&amp;</span>
                  M
                </div>
              </div>

              <div className={styles.qrGuest}>
                <UserRound size={17} />

                <div>
                  <span>
                    Convidado
                  </span>

                  <strong>
                    {
                      weddingInfo.guestName
                    }
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className={styles.codeButton}
                onClick={handleCopyCode}
              >
                <div>
                  <span>
                    Código do convite
                  </span>

                  <strong>
                    {
                      weddingInfo.invitationCode
                    }
                  </strong>
                </div>

                {codeCopied ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}
              </button>
            </div>

            <div
              className={styles.accessWarning}
              data-animate
            >
              <ShieldCheck size={21} />

              <p>
                Este convite é{" "}
                <strong>
                  pessoal e intransferível
                </strong>
                . Apresente o QR Code na
                entrada do evento para
                validação.
              </p>
            </div>

            <footer
              className={
                styles.finalMessage
              }
              data-animate
            >
              <Heart
                size={15}
                fill="currentColor"
              />

              <p>
                Esperamos você para
                celebrar conosco!
              </p>

              <strong>
                Nerivaldo
                <em>&amp;</em>
                Mylena
              </strong>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}