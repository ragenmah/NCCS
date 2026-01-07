// script.js

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    toggle.classList.toggle("active");

    // prevent body scroll when menu is open (mobile)
    document.body.classList.toggle("menu-open");
  });

  // mobile dropdown toggles
  // document.querySelectorAll(".dropdown > a").forEach((link) => {
  //   link.addEventListener("click", (e) => {
  //     if (window.innerWidth <= 768) {
  //       e.preventDefault();
  //       link.parentElement.classList.toggle("open");
  //     }
  //   });
  // });

  // search (works on both mobile + desktop)
  document.querySelectorAll(".search-trigger > a").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      trigger.parentElement.classList.toggle("open");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Newsletter form submission (placeholder)
  const form = document.querySelector(".newsletter form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Subscribed!");
    });
  }

  const langButtons = document.querySelectorAll(".lang-btn");

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      langButtons.forEach((b) => b.classList.remove("active"));
      // Add active to clicked
      btn.classList.add("active");

      const lang = btn.getAttribute("data-lang");

      // Future-proof: Change page language
      // Option 1: Redirect to language-specific URL (recommended for Laravel)
      // window.location.href = `/${lang}${window.location.pathname}`;

      // Option 2: For single-page with JS translations (e.g., using i18n library)
      // translatePage(lang);

      // Option 3: Set lang attribute and reload (simple)
      document.documentElement.lang = lang;
      // If you have separate pages: window.location.search = `?lang=${lang}`;

      //   console.log(`Switched to language: ${lang.toUpperCase()}`);
      //   alert(
      //     `Language switched to ${lang.toUpperCase()} (demo - implement actual translation)`
      //   );
    });
  });

  // document.querySelectorAll(".dropdown > a").forEach((trigger) => {
  //   trigger.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     const dropdown = trigger.parentElement;

  //     // Toggle "open" class
  //     dropdown.classList.toggle("open");
  //   });
  // });

  document.querySelectorAll(".toggle-sub").forEach((item) => {
    item.addEventListener("click", (e) => {
      //this code closes other sub dropdown when one is open
      // e.preventDefault();
      // e.stopPropagation();

      // const parent = item.closest(".menu-item");
      // document
      //   .querySelectorAll(".toggle-sub")
      //   .forEach((a) => a.classList.remove("selected"));

      // document.querySelectorAll(".menu-item.active").forEach((li) => {
      //   if (li !== parent) li.classList.remove("active");
      // });

      // // Toggle this one
      // parent.classList.toggle("active");

      // // Apply gray text to clicked link
      // item.classList.add("selected");

      e.preventDefault();
      e.stopPropagation();

      const parent = item.closest(".menu-item");

      // Toggle only this submenu
      parent.classList.toggle("active");

      // Toggle gray state on this link only
      item.classList.toggle("selected");
    });
  });

  document.querySelectorAll(".dropdown > a").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      const dropdown = trigger.parentElement;

      // Close others
      document
        .querySelectorAll(".dropdown.open")
        .forEach((d) => d !== dropdown && d.classList.remove("open"));

      // Toggle this dropdown
      dropdown.classList.toggle("open");

      //   If this is the search dropdown → focus the input
      if (
        dropdown.classList.contains("search-item") &&
        dropdown.classList.contains("open")
      ) {
        const input = dropdown.querySelector("input");
        if (input) setTimeout(() => input.focus(), 50);
      }
    });
  });

  const dropdownTriggers = document.querySelectorAll(".dropdown > a");

  dropdownTriggers.forEach((trigger) => {
    const dropdown = trigger.parentElement;
    let openedByHover = false;

    const openDropdown = () => {
      document
        .querySelectorAll(".dropdown.open")
        .forEach((d) => d !== dropdown && d.classList.remove("open"));

      dropdown.classList.add("open");

      // Focus input if search dropdown
      if (dropdown.classList.contains("search-item")) {
        const input = dropdown.querySelector("input");
        if (input) setTimeout(() => input.focus(), 50);
      }
    };

    // CLICK OPEN (forces focus)
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openedByHover = false; // user intentionally clicked

      if (dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");
        return;
      }

      openDropdown();
    });

    // HOVER OPEN
    dropdown.addEventListener("mouseenter", () => {
      openedByHover = true;
      openDropdown();
    });

    // ONLY CLOSE ON HOVER-OUT IF IT WAS HOVER-OPENED
    dropdown.addEventListener("mouseleave", () => {
      if (openedByHover) {
        dropdown.classList.remove("open");
      }
    });
  });

  // document.querySelectorAll(".search-dropdown").forEach((searchDrop) => {
  //   const toggle = searchDrop.querySelector("a");
  //   const input = searchDrop.querySelector("input");

  //   toggle.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     searchDrop.classList.toggle("open");

  //     if (searchDrop.classList.contains("open")) {
  //       setTimeout(() => input?.focus(), 50);
  //     }
  //   });
  // });
});

// carousel
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".arrow.left");
  const nextBtn = document.querySelector(".arrow.right");
  const carousel = document.querySelector(".carousel");

  let currentSlide = 0;
  let startX = 0;
  let endX = 0;
  const SWIPE_THRESHOLD = 60;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  prevBtn?.addEventListener("click", prevSlide);
  nextBtn?.addEventListener("click", nextSlide);

  dots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      currentSlide = i;
      showSlide(i);
    })
  );

  // --- AUTOPLAY ---
  let autoplay = null;

  function startAuto() {
    if (autoplay) clearInterval(autoplay);
    autoplay = setInterval(nextSlide, 5000);
  }

  function pauseAuto() {
    if (autoplay) clearInterval(autoplay);
    autoplay = null;
  }

  startAuto();

  // --- SWIPE / DRAG (pointer events = mouse + touch) ---
  carousel.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    pauseAuto();
  });

  carousel.addEventListener("pointerup", (e) => {
    endX = e.clientX;
    handleSwipe();
    startAuto();
  });

  carousel.addEventListener("pointerleave", () => {
    // prevents stuck pause when cursor leaves mid-drag
    startAuto();
  });

  function handleSwipe() {
    const diff = endX - startX;
    if (Math.abs(diff) < SWIPE_THRESHOLD) return;

    diff < 0 ? nextSlide() : prevSlide();
  }

  showSlide(currentSlide);
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".programs-carousel");
  const track = document.querySelector(".programs-track");
  const cards = document.querySelectorAll(".program-card");
  const prev = document.querySelector(".programs-arrow.left");
  const next = document.querySelector(".programs-arrow.right");

  let index = 0;
  const gap = 30;

  function cardWidth() {
    return cards[0].offsetWidth + gap;
  }

  function visibleCards() {
    return Math.floor(carousel.offsetWidth / cardWidth());
  }

  function maxIndex() {
    return Math.max(0, cards.length - visibleCards());
  }

  function update() {
    track.style.transform = `translateX(${-index * cardWidth()}px)`;
  }

  next.addEventListener("click", () => {
    index = Math.min(index + 1, maxIndex());
    update();
  });

  prev.addEventListener("click", () => {
    index = Math.max(index - 1, 0);
    update();
  });

  window.addEventListener("resize", update);
  update();
});
document.addEventListener("DOMContentLoaded", () => {
  const monthYearDisplay = document.getElementById("calendar-month-year");
  const calendarBody = document.getElementById("calendar-body");
  const prevBtn = document.querySelector(".cal-prev");
  const nextBtn = document.querySelector(".cal-next");

  // Tooltip panel BELOW the calendar
  const tooltip = document.querySelector(".event-tooltip");
  tooltip.style.display = "none";

  function showTooltipBelow(data) {
    tooltip.innerHTML = `
      <div class="calendar-event-date">${data.dayLabel}</div>
      <div class="calendar-event-title">${data.title}</div>
      <div class="calendar-event-location">
        <i class="fas fa-map-marker-alt"></i> ${data.location}
      </div>
    `;
    tooltip.style.display = "block";
  }

  function hideTooltipBelow() {
    tooltip.style.display = "none";
  }

  // Event list with details
  const events = {
    "2025-11-26": {
      dayLabel: "SAT, 26 NOV",
      title: "HIMALAYAN MELA",
      location: "Main Hall, Downtown Community Center",
    },
    "2025-11-30": {
      dayLabel: "SUN, 30 NOV",
      title: "Community Fundraiser",
      location: "City Cultural Hall",
    },
  };

  let currentDate = new Date(2025, 10);

  function renderCalendar() {
    calendarBody.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate
      .toLocaleString("default", { month: "long" })
      .toUpperCase();
    monthYearDisplay.textContent = `${monthName} ${year}`;

    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay();
    const lastDate = new Date(year, month + 1, 0);
    const totalDays = lastDate.getDate();

    const today = new Date();
    const isCurrentMonth =
      today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();

    let row = document.createElement("tr");
    let dayCount = 1;

    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      row.innerHTML += "<td></td>";
    }

    // Fill first week
    for (let i = startingDayOfWeek; i < 7; i++) {
      if (dayCount <= totalDays) {
        row.appendChild(
          createDayCell(
            year,
            month,
            dayCount,
            isCurrentMonth,
            todayDate,
            monthName
          )
        );
        dayCount++;
      }
    }
    calendarBody.appendChild(row);

    // Remaining weeks
    while (dayCount <= totalDays) {
      row = document.createElement("tr");

      for (let i = 0; i < 7; i++) {
        if (dayCount <= totalDays) {
          row.appendChild(
            createDayCell(
              year,
              month,
              dayCount,
              isCurrentMonth,
              todayDate,
              monthName
            )
          );
          dayCount++;
        } else {
          row.innerHTML += "<td></td>";
        }
      }
      calendarBody.appendChild(row);
    }
  }

  function createDayCell(
    year,
    month,
    day,
    isCurrentMonth,
    todayDate,
    monthName
  ) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const hasEvent = events[dateStr];

    const cell = document.createElement("td");
    cell.textContent = day;
    cell.style.cursor = "pointer";

    if (isCurrentMonth && day === todayDate) {
      cell.classList.add("today");
    }

    if (hasEvent) {
      cell.classList.add("has-event");

      cell.addEventListener("mouseenter", () => {
        showTooltipBelow(events[dateStr]);
      });

      cell.addEventListener("mouseleave", hideTooltipBelow);
    }

    return cell;
  }

  // Navigation
  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    tooltip.style.display = "none";
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    tooltip.style.display = "none";
    renderCalendar();
  });

  renderCalendar();
});

document.addEventListener("DOMContentLoaded", () => {
  const updatesTrack = document.querySelector(".updates-track");
  const updatesPrev = document.querySelector(".updates-arrow.left");
  const updatesNext = document.querySelector(".updates-arrow.right");

  let updateIndex = 0;

  function getCarouselInfo() {
    const updateCards = document.querySelectorAll(".update-card");
    let cardGap = parseInt(getComputedStyle(updatesTrack).gap) || 30;
    let cardWidth = updateCards[0] ? updateCards[0].offsetWidth : 380;
    let cardsVisible;

    // Determine number of visible cards based on viewport width
    if (window.innerWidth > 992) {
      cardsVisible = 3;
    } else if (window.innerWidth > 768) {
      cardsVisible = 2;
    } else {
      cardsVisible = 1;
    }

    const maxIndex = Math.max(0, updateCards.length - cardsVisible);
    return { cardWidth, cardGap, cardsVisible, maxIndex };
  }

  function updateUpdatesCarousel() {
    const { cardWidth, cardGap } = getCarouselInfo();
    const offset = -(updateIndex * (cardWidth + cardGap));
    updatesTrack.style.transform = `translateX(${offset}px)`;
  }

  updatesNext.addEventListener("click", () => {
    const { maxIndex } = getCarouselInfo();
    if (updateIndex < maxIndex) {
      updateIndex++;
    } else {
      updateIndex = 0; // Loop back to start
    }
    updateUpdatesCarousel();
  });

  updatesPrev.addEventListener("click", () => {
    const { maxIndex } = getCarouselInfo();
    if (updateIndex > 0) {
      updateIndex--;
    } else {
      updateIndex = maxIndex; // Loop to end
    }
    updateUpdatesCarousel();
  });

  // Initial load + resize
  updateUpdatesCarousel();
  window.addEventListener("resize", () => {
    // Recalculate index if needed
    const { maxIndex } = getCarouselInfo();
    if (updateIndex > maxIndex) updateIndex = maxIndex;
    updateUpdatesCarousel();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const directorsTrack = document.querySelector(".directors-track");
  const directorCards = document.querySelectorAll(".director-card");
  const directorsPrev = document.querySelector(".directors-arrow.left");
  const directorsNext = document.querySelector(".directors-arrow.right");

  let directorIndex = 0;
  const cardsVisible = 5; // Show 5 directors on desktop
  const cardWidthWithGap = directorCards[0]
    ? directorCards[0].offsetWidth + 20
    : 240;
  const maxDirectorIndex = Math.max(0, directorCards.length - cardsVisible);

  function updateDirectorsCarousel() {
    const offset = -directorIndex * cardWidthWithGap;
    directorsTrack.style.transform = `translateX(${offset}px)`;
  }

  if (directorsNext && directorsPrev) {
    directorsNext.addEventListener("click", () => {
      directorIndex = directorIndex < maxDirectorIndex ? directorIndex + 1 : 0;
      updateDirectorsCarousel();
    });

    directorsPrev.addEventListener("click", () => {
      directorIndex = directorIndex > 0 ? directorIndex - 1 : maxDirectorIndex;
      updateDirectorsCarousel();
    });
  }

  // Initial + resize
  updateDirectorsCarousel();
  window.addEventListener("resize", updateDirectorsCarousel);
});

document
  .querySelector(".newsletter-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value.trim();

    if (email) {
      alert("Thank you for subscribing!");
      this.reset();
    } else {
      alert("Please enter a valid email address.");
    }
  });
