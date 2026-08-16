"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    number: "01",
    title: "Digital Products",
    copy: "Web-Apps, Portale und Plattformen, die sich schnell anfühlen und sauber skalieren.",
    tags: ["UX / UI", "Web Apps", "Design Systems"],
    tone: "blue",
  },
  {
    number: "02",
    title: "Cloud & DevOps",
    copy: "Robuste Cloud-Architektur, automatisierte Deployments und Infrastruktur, die mitwächst.",
    tags: ["Architecture", "Automation", "Operations"],
    tone: "paper",
  },
  {
    number: "03",
    title: "AI Automation",
    copy: "Praktische KI für Prozesse, Wissen und Support — integriert statt nur präsentiert.",
    tags: ["Agents", "RAG", "Workflows"],
    tone: "lime",
  },
  {
    number: "04",
    title: "Cyber Security",
    copy: "Security by design, klare Zugriffsmodelle und belastbare Systeme für sensible Daten.",
    tags: ["Audit", "Hardening", "Monitoring"],
    tone: "ink",
  },
];

const principles = [
  ["Direkt", "Sie sprechen mit den Menschen, die Ihre Lösung konzipieren und bauen."],
  ["Messbar", "Jede Entscheidung folgt einem geschäftlichen Ziel und einer klaren Kennzahl."],
  ["Sicher", "Datenschutz, Zugriffe und Betrieb werden nicht erst am Ende bedacht."],
  ["Übertragbar", "Dokumentation und saubere Übergaben machen Sie unabhängig."],
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function OpsVisual() {
  return (
    <div className="ops-ui" aria-hidden="true">
      <div className="ui-sidebar">
        <span className="ui-mark">K</span>
        <span />
        <span />
        <span />
      </div>
      <div className="ui-main">
        <div className="ui-topline"><b>Werk 04</b><span>Live systems</span><i /></div>
        <div className="metric-row">
          <div><small>Output</small><strong>94.8%</strong><em>+4.2</em></div>
          <div><small>Downtime</small><strong>1.6h</strong><em>−18%</em></div>
          <div><small>Quality</small><strong>99.2</strong><em>stable</em></div>
        </div>
        <div className="chart-panel">
          <div className="chart-head"><span>Production pulse</span><span>7 days</span></div>
          <div className="chart-bars">
            {[42, 57, 49, 72, 68, 83, 75, 92, 88, 96, 90, 100].map((height, index) => (
              <i key={height + index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AiVisual() {
  return (
    <div className="ai-ui" aria-hidden="true">
      <div className="ai-orbit orbit-one" />
      <div className="ai-orbit orbit-two" />
      <span className="ai-node node-one">ERP</span>
      <span className="ai-node node-two">DOCS</span>
      <span className="ai-node node-three">CRM</span>
      <div className="ai-core"><small>KERN</small><strong>AI</strong><i /></div>
      <div className="ai-prompt"><span>Antwort aus 42 geprüften Quellen</span><b>↗</b></div>
    </div>
  );
}

function CommerceVisual() {
  return (
    <div className="commerce-ui" aria-hidden="true">
      <div className="commerce-word">HALLO</div>
      <div className="commerce-phone">
        <div className="phone-bar"><b>N/01</b><span>•••</span></div>
        <div className="phone-product"><span>NEW</span><i /></div>
        <strong>Form / 01</strong>
        <small>Modulares System<br />für jeden Raum.</small>
        <div className="phone-cta">Konfigurieren <b>→</b></div>
      </div>
      <div className="commerce-tag">COMMERCE<br />REBUILT</div>
    </div>
  );
}

export function SiteExperience() {
  const headerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );
    revealElements.forEach((element) => observer.observe(element));

    let lastScrollY = window.scrollY;
    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        const current = window.scrollY;
        const header = headerRef.current;
        if (header) {
          header.classList.toggle("is-scrolled", current > 20);
          header.classList.toggle("is-hidden", current > lastScrollY && current > 160);
        }
        lastScrollY = current;
        scrollFrame = 0;
      });
    };

    let cursorFrame = 0;
    let pointerX = -100;
    let pointerY = -100;
    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (cursorFrame) return;
      cursorFrame = window.requestAnimationFrame(() => {
        cursorRef.current?.style.setProperty("transform", `translate3d(${pointerX}px, ${pointerY}px, 0)`);
        cursorFrame = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (cursorFrame) window.cancelAnimationFrame(cursorFrame);
    };
  }, []);

  return (
    <main id="top">
      <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />

      <header className="site-header" ref={headerRef}>
        <a className="brand" href="#top" aria-label="Kernstack Startseite">
          KERN<span>STACK</span><sup>✦</sup>
        </a>
        <nav aria-label="Hauptnavigation">
          <a href="#arbeit">Arbeit</a>
          <a href="#leistungen">Leistungen</a>
          <a href="#prozess">Prozess</a>
        </nav>
        <a className="header-contact" href="#kontakt">
          Projekt starten <span><Arrow /></span>
        </a>
      </header>

      <aside className="side-rail" aria-hidden="true">
        <span>KS/26</span>
        <b>Systeme, die bleiben.</b>
      </aside>

      <section className="hero section-pad">
        <div className="hero-meta hero-enter">
          <span>IT & Digitalagentur</span>
          <span>Deutschland / EU</span>
          <span>Est. 2026</span>
        </div>
        <h1>
          <span className="hero-line line-one">Technologie, die</span>
          <span className="hero-line line-two">den Mittelstand</span>
          <span className="hero-line line-three"><i>vorwärts</i> bringt.</span>
        </h1>
        <div className="hero-bottom hero-enter hero-enter-late">
          <p>
            Wir planen, gestalten und entwickeln digitale Systeme für Unternehmen,
            die mehr wollen als nur <span>„funktioniert irgendwie“.</span>
          </p>
          <a className="circle-link" href="#arbeit" aria-label="Zu den Projektszenarien">
            <span>↓</span>
          </a>
        </div>
        <div className="hero-stamp hero-enter hero-enter-late" aria-hidden="true">
          <span>Strategy</span><span>Design</span><span>Engineering</span>
        </div>
      </section>

      <section className="ticker" aria-label="Kernkompetenzen">
        <div className="ticker-track">
          <span>Digital Products <i>✦</i></span>
          <span>Cloud Platforms <i>✦</i></span>
          <span>AI Automation <i>✦</i></span>
          <span>Cyber Security <i>✦</i></span>
          <span>Digital Products <i>✦</i></span>
          <span>Cloud Platforms <i>✦</i></span>
          <span>AI Automation <i>✦</i></span>
          <span>Cyber Security <i>✦</i></span>
        </div>
      </section>

      <section className="manifesto section-pad">
        <div className="section-kicker" data-reveal>
          <span>( WOFÜR WIR STEHEN )</span><span>01 — 04</span>
        </div>
        <h2 data-reveal>
          Kein IT-Projekt<br />um des <em>IT-Projekts</em> willen.
        </h2>
        <div className="manifesto-grid" data-reveal>
          <p>
            Erst verstehen wir das Geschäft. Dann bauen wir die kleinste Lösung,
            die einen echten Unterschied macht — sicher, wartbar und messbar.
          </p>
          <div className="capability-count">
            <strong>04</strong>
            <span>Kernbereiche.<br />Ein eingespieltes Team.</span>
          </div>
        </div>
      </section>

      <section className="work section-pad" id="arbeit">
        <div className="section-kicker" data-reveal>
          <span>( AUSGEWÄHLTE SZENARIEN )</span><span>SO KANN ES AUSSEHEN</span>
        </div>
        <div className="work-heading" data-reveal>
          <h2>Systeme, die<br />im Alltag liefern.</h2>
          <p>
            Drei Launch-Szenarien zeigen, wie Strategie, Interface und Technologie
            bei KERNSTACK zusammenspielen können.
          </p>
        </div>

        <article className="project project-wide" data-reveal>
          <a href="#kontakt" aria-label="Fertigungs-Dashboard als Projektszenario besprechen">
            <div className="project-visual visual-ops"><OpsVisual /></div>
            <div className="project-info">
              <span className="project-index">01 / Industrial Tech</span>
              <h3>Ein Leitstand für<br />Produktion in Echtzeit.</h3>
              <div className="project-meta"><span>UX / UI</span><span>Data Platform</span><span>Cloud</span></div>
              <span className="project-arrow"><Arrow diagonal /></span>
            </div>
          </a>
        </article>

        <div className="project-grid">
          <article className="project" data-reveal>
            <a href="#kontakt" aria-label="KI-Wissenssystem als Projektszenario besprechen">
              <div className="project-visual visual-ai"><AiVisual /></div>
              <div className="project-info">
                <span className="project-index">02 / Applied AI</span>
                <h3>Unternehmenswissen.<br />Sofort antwortbereit.</h3>
                <div className="project-meta"><span>RAG</span><span>Agents</span><span>Governance</span></div>
                <span className="project-arrow"><Arrow diagonal /></span>
              </div>
            </a>
          </article>
          <article className="project project-offset" data-reveal>
            <a href="#kontakt" aria-label="Commerce-Plattform als Projektszenario besprechen">
              <div className="project-visual visual-commerce"><CommerceVisual /></div>
              <div className="project-info">
                <span className="project-index">03 / Digital Commerce</span>
                <h3>Ein Shop, der sich wie<br />eine Marke anfühlt.</h3>
                <div className="project-meta"><span>Commerce</span><span>3D Config</span><span>CMS</span></div>
                <span className="project-arrow"><Arrow diagonal /></span>
              </div>
            </a>
          </article>
        </div>
      </section>

      <section className="services section-pad" id="leistungen">
        <div className="section-kicker light" data-reveal>
          <span>( WAS WIR BAUEN )</span><span>END-TO-END</span>
        </div>
        <div className="services-head" data-reveal>
          <h2>Von der ersten<br />Frage bis zum <em>Betrieb.</em></h2>
          <p>
            Ein Team für Produkt, Technologie und Sicherheit. Weniger Übergaben,
            mehr Verantwortung.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className={`service-card ${service.tone}`} key={service.number} data-reveal>
              <div className="service-top"><span>{service.number}</span><span><Arrow diagonal /></span></div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <div>{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-pad" id="prozess">
        <div className="section-kicker" data-reveal>
          <span>( WIE WIR ARBEITEN )</span><span>KLAR. SCHNELL. GEMEINSAM.</span>
        </div>
        <div className="process-layout">
          <div className="process-title" data-reveal>
            <h2>Keine Blackbox.<br />Kein Theater.</h2>
            <p>Ein transparenter Prozess mit klaren Entscheidungen und sichtbarem Fortschritt.</p>
          </div>
          <ol className="process-list">
            <li data-reveal><span>01</span><div><h3>Verstehen</h3><p>Ziele, Nutzer, Systeme und Risiken in einem kompakten Discovery Sprint.</p></div><b>5–10 Tage</b></li>
            <li data-reveal><span>02</span><div><h3>Beweisen</h3><p>Prototyp und technische Architektur machen die Kernidee testbar.</p></div><b>2–4 Wochen</b></li>
            <li data-reveal><span>03</span><div><h3>Bauen</h3><p>Iterative Entwicklung mit Demos, QA und Security in jedem Zyklus.</p></div><b>In Sprints</b></li>
            <li data-reveal><span>04</span><div><h3>Betreiben</h3><p>Sauberer Launch, Monitoring, Dokumentation und planbare Weiterentwicklung.</p></div><b>Langfristig</b></li>
          </ol>
        </div>
      </section>

      <section className="trust section-pad">
        <div className="trust-word" aria-hidden="true">KLAR</div>
        <div className="section-kicker" data-reveal>
          <span>( UNSER VERSPRECHEN )</span><span>OHNE KLEINGEDRUCKTES</span>
        </div>
        <h2 data-reveal>Senior-led.<br />Business-first.<br /><em>Built to last.</em></h2>
        <div className="principle-grid">
          {principles.map(([title, copy], index) => (
            <article key={title} data-reveal>
              <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section-pad" id="kontakt">
        <div className="contact-top" data-reveal>
          <span>Ein Projekt im Kopf?</span><span>Antwort in 1–2 Werktagen</span>
        </div>
        <a className="contact-link" href="mailto:projekt@kernstack.de" data-reveal>
          <span>Lassen Sie uns</span>
          <span><em>anfangen.</em><b><Arrow diagonal /></b></span>
        </a>
        <div className="contact-bottom">
          <div><span>Kontakt</span><a href="mailto:projekt@kernstack.de">projekt@kernstack.de</a></div>
          <div><span>Standorte</span><p>Berlin / München<br />Remote in der EU</p></div>
          <div><span>Sprachen</span><p>Deutsch / English</p></div>
        </div>
      </section>

      <footer>
        <a className="brand brand-footer" href="#top">KERN<span>STACK</span><sup>✦</sup></a>
        <p>IT & Digitalagentur für Deutschland.</p>
        <div><a href="#top">Nach oben ↑</a><span>© 2026</span></div>
      </footer>
    </main>
  );
}
