(() => {
  "use strict";

  const config = window.SUMMERWEEN_CONFIG || { formLinks: {} };
  const fallbackFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLSd7Ikj9XvUnEEdOmTUzthQi1Zy2i_8y4E-hH4tubyUcQ2DSuQ/viewform?pli=1';
  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const toast = document.querySelector(".toast");
  const cursorGlow = document.querySelector(".cursor-glow");

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => toast.classList.remove("visible"), 3600);
  };

  const toggleMenu = (force) => {
    const shouldOpen = typeof force === "boolean" ? force : !body.classList.contains("menu-open");
    body.classList.toggle("menu-open", shouldOpen);
    menuToggle?.setAttribute("aria-expanded", String(shouldOpen));
    menuToggle?.setAttribute("aria-label", shouldOpen ? "Fermer le menu" : "Ouvrir le menu");
  };

  menuToggle?.addEventListener("click", () => toggleMenu());
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 45);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Countdown: 27 August 2026 at 19:00 in France (summer time, UTC+2).
  const eventDate = new Date("2026-08-27T19:00:00+02:00");
  const countdownEls = {
    days: document.querySelector('[data-countdown="days"]'),
    hours: document.querySelector('[data-countdown="hours"]'),
    minutes: document.querySelector('[data-countdown="minutes"]'),
    seconds: document.querySelector('[data-countdown="seconds"]')
  };

  const updateCountdown = () => {
    const distance = eventDate.getTime() - Date.now();
    if (distance <= 0) {
      Object.values(countdownEls).forEach((el) => { if (el) el.textContent = "00"; });
      return;
    }
    const days = Math.floor(distance / 86_400_000);
    const hours = Math.floor((distance % 86_400_000) / 3_600_000);
    const minutes = Math.floor((distance % 3_600_000) / 60_000);
    const seconds = Math.floor((distance % 60_000) / 1_000);
    const values = { days, hours, minutes, seconds };
    Object.entries(values).forEach(([key, value]) => {
      if (countdownEls[key]) countdownEls[key].textContent = String(value).padStart(2, "0");
    });
  };
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  // Reveal on scroll.
  document.querySelectorAll(".reveal").forEach((el) => {
    const delay = Number(el.dataset.delay || 0);
    el.style.setProperty("--delay", `${delay}ms`);
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -35px" });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  // Active navigation link.
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const trackedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    }, { threshold: [0.25, 0.55], rootMargin: "-25% 0px -55%" });
    trackedSections.forEach((section) => sectionObserver.observe(section));
  }

  // Teaser player.
  const videoShell = document.querySelector(".video-shell");
  const video = document.querySelector("#teaser-video");
  const playButton = document.querySelector(".video-play");
  const pauseButton = document.querySelector(".video-pause");

  if (video && config.teaserVideo) {
    const source = video.querySelector("source");
    if (source) source.src = config.teaserVideo;
    video.load();
  }

  const setVideoState = (state) => {
    const isPlaying = state === "playing";
    videoShell?.classList.toggle("is-playing", isPlaying);
    playButton?.setAttribute("aria-hidden", String(isPlaying));
    playButton?.setAttribute("tabindex", isPlaying ? "-1" : "0");
    pauseButton?.setAttribute("aria-hidden", String(!isPlaying));
    pauseButton?.setAttribute("tabindex", isPlaying ? "0" : "-1");

  };

  playButton?.addEventListener("click", async () => {
    if (!video) return;
    try {
      video.controls = false;
      setVideoState("playing");
      await video.play();
    } catch (error) {
      setVideoState("ready");
      showToast("La vidéo n’est pas encore disponible. Remplacez le fichier vidéo par votre teaser final.");
    }
  });

  pauseButton?.addEventListener("click", () => {
    video?.pause();
  });

  video?.addEventListener("click", () => {
    if (!video.paused && !video.ended) video.pause();
  });

  video?.addEventListener("play", () => {
    video.controls = false;
    setVideoState("playing");
  });

  video?.addEventListener("pause", () => {
    if (!video.ended) setVideoState("paused");
  });

  video?.addEventListener("ended", () => {
    setVideoState("ready");
    video.controls = false;
    video.currentTime = 0;
    video.load();
  });

  video?.addEventListener("error", () => {
    setVideoState("ready");
    showToast("Le teaser pourra être ajouté plus tard dans le dossier assets/video.");
  }, { once: true });

  // Configurable form buttons.
  document.querySelectorAll("[data-form]").forEach((button) => {
    if (button.tagName === "A") return;
    button.addEventListener("click", () => {
      const key = button.dataset.form;
      const url = config.formLinks?.[key]?.trim() || fallbackFormLink;
      if (url && /^https?:\/\//i.test(url)) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        showToast("Le lien d’inscription est indisponible pour le moment.");
      }
    });
  });

  // Soft cursor glow on desktop.
  window.addEventListener("mousemove", (event) => {
    if (!cursorGlow) return;
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = "1";
  }, { passive: true });
})();
