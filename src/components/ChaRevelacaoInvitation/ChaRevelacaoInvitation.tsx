"use client";

import { Baby, ChevronDown, Heart, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./ChaRevelacaoInvitation.module.css";

type Choice = "joao" | "maria";

const INITIAL_VOTES = { joao: 47, maria: 53 };

export default function ChaRevelacaoInvitation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [votes, setVotes] = useState(INITIAL_VOTES);

  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!nodes) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  async function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) await video.play().catch(() => setMuted(true));
  }

  function vote(nextChoice: Choice) {
    if (choice) return;
    const total = votes.joao + votes.maria + 1;
    const joaoVotes = votes.joao + (nextChoice === "joao" ? 1 : 0);
    const joao = Math.round((joaoVotes / total) * 100);
    setVotes({ joao, maria: 100 - joao });
    setChoice(nextChoice);
  }

  return (
    <div ref={rootRef} className={styles.invitation}>
      <section className={styles.hero} aria-label="Chá revelação de João ou Maria">
        <video
          ref={videoRef}
          className={styles.heroVideo}
          src="/images/charevelaçao.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
        />
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroContent}>
          <span className={styles.emojiLine}>🧸 🍼 ✨ ☁️</span>
          <p>Nosso maior presente está a caminho</p>
          <h1><span>João</span><i>ou</i><strong>Maria?</strong></h1>
          <div className={styles.heartLine}><span /><Heart size={17} fill="currentColor" /><span /></div>
          <small>Venha descobrir com a gente!</small>
        </div>

        <button className={styles.soundButton} type="button" onClick={toggleSound} aria-label={muted ? "Ativar som" : "Desativar som"}>
          {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
        </button>

        <button className={styles.downButton} type="button" onClick={() => document.getElementById("surpresa")?.scrollIntoView({ behavior: "smooth" })} aria-label="Continuar convite">
          <ChevronDown size={25} />
        </button>
      </section>

      <section id="surpresa" className={`${styles.intro} ${styles.reveal}`} data-reveal>
        <span className={styles.sectionEmoji}>👶🏻💗💙</span>
        <p className={styles.script}>Uma doce espera</p>
        <h2>O amor ganhou um novo significado</h2>
        <div className={styles.divider}><span /><Baby size={20} /><span /></div>
        <p>Tem um coraçãozinho crescendo e enchendo nossos dias de sonhos. Ainda não sabemos se nosso mundo ficará mais azul ou mais rosa, mas já sabemos que esse bebê é profundamente amado.</p>
      </section>

      <section className={styles.namesSection}>
        <div className={`${styles.heading} ${styles.reveal}`} data-reveal>
          <p className={styles.script}>Quem será?</p>
          <h2>Duas possibilidades, um amor infinito</h2>
        </div>

        <div className={styles.nameCards}>
          <article className={`${styles.nameCard} ${styles.boyCard} ${styles.reveal}`} data-reveal>
            <span>💙</span><small>Se for menino</small><h3>João</h3><p>Nosso pequeno príncipe</p>
          </article>
          <div className={styles.orBubble}>ou</div>
          <article className={`${styles.nameCard} ${styles.girlCard} ${styles.reveal}`} data-reveal>
            <span>💗</span><small>Se for menina</small><h3>Maria</h3><p>Nossa pequena princesa</p>
          </article>
        </div>
      </section>

      <section className={styles.voteSection}>
        <div className={`${styles.voteCard} ${styles.reveal}`} data-reveal>
          <Sparkles size={28} />
          <p className={styles.script}>Faça sua aposta</p>
          <h2>Você acha que vai ser João ou Maria?</h2>
          <p className={styles.voteHint}>{choice ? "Voto registrado! Veja como estão as apostas:" : "Escolha seu palpite para revelar o resultado da votação."}</p>

          <div className={styles.voteButtons}>
            <button type="button" className={styles.boyButton} onClick={() => vote("joao")} disabled={Boolean(choice)}>💙 Acho que é João</button>
            <button type="button" className={styles.girlButton} onClick={() => vote("maria")} disabled={Boolean(choice)}>💗 Acho que é Maria</button>
          </div>

          <div className={`${styles.results} ${choice ? styles.resultsVisible : ""}`} aria-live="polite">
            <div className={styles.resultLabels}><strong>João {votes.joao}%</strong><strong>Maria {votes.maria}%</strong></div>
            <div className={styles.progress} aria-label={`João ${votes.joao}%, Maria ${votes.maria}%`}>
              <span className={styles.boyProgress} style={{ width: `${votes.joao}%` }} />
              <span className={styles.girlProgress} style={{ width: `${votes.maria}%` }} />
            </div>
            <small>Resultado ilustrativo atualizado com o seu palpite</small>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>🍼 ✨ 🧸 ✨ 🍼</span>
        <p>Azul ou rosa, nossa felicidade já é completa.</p>
        <h2>João <i>ou</i> Maria</h2>
        <small>Esperamos você para viver essa descoberta conosco!</small>
      </footer>
    </div>
  );
}