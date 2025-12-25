// script.js

// Example JS for interactivity, e.g., dynamic calendar or form submission
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    toggle.classList.toggle("active");
  });

  document.querySelectorAll(".dropdown > a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });

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

  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      // If the user clicked a link inside, allow navigation
      if (e.target.tagName === "A" && e.target.getAttribute("href") !== "#") {
        return;
      }

      e.preventDefault();
      dropdown.classList.toggle("open");
    });
  });

  document.querySelectorAll(".search-dropdown").forEach((searchDrop) => {
    searchDrop.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation();
        searchDrop.classList.toggle("open");

        // Focus the input when opened
        if (searchDrop.classList.contains("open")) {
          const input = searchDrop.querySelector("input");
          if (input) input.focus();
        }
      }
    });
  });
});

// carousel

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let index = 0;

  function showSlide(i) {
    slides.forEach((s) => s.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));
    slides[i].classList.add("active");
    dots[i].classList.add("active");
  }

  document.querySelector(".arrow.left").onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  };

  document.querySelector(".arrow.right").onclick = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  };

  dots.forEach((dot, i) => {
    dot.onclick = () => {
      index = i;
      showSlide(index);
    };
  });

  /* Auto slide */
  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 5000);
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
  const updateCards = document.querySelectorAll(".update-card");
  const updatesPrev = document.querySelector(".updates-arrow.left");
  const updatesNext = document.querySelector(".updates-arrow.right");

  let updateIndex = 0;
  const cardsVisible = 3; // Show 3 cards on desktop
  const cardWidthWithGap = updateCards[0]
    ? updateCards[0].offsetWidth + 30
    : 410;
  const maxUpdateIndex = Math.max(0, updateCards.length - cardsVisible);

  function updateUpdatesCarousel() {
    const offset = -updateIndex * cardWidthWithGap;
    updatesTrack.style.transform = `translateX(${offset}px)`;
  }

  updatesNext.addEventListener("click", () => {
    if (updateIndex < maxUpdateIndex) {
      updateIndex++;
    } else {
      updateIndex = 0;
    }
    updateUpdatesCarousel();
  });

  updatesPrev.addEventListener("click", () => {
    if (updateIndex > 0) {
      updateIndex--;
    } else {
      updateIndex = maxUpdateIndex;
    }
    updateUpdatesCarousel();
  });

  // Initial + resize
  updateUpdatesCarousel();
  window.addEventListener("resize", updateUpdatesCarousel);
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

  directorsNext.addEventListener("click", () => {
    if (directorIndex < maxDirectorIndex) {
      directorIndex++;
    } else {
      directorIndex = 0;
    }
    updateDirectorsCarousel();
  });

  directorsPrev.addEventListener("click", () => {
    if (directorIndex > 0) {
      directorIndex--;
    } else {
      directorIndex = maxDirectorIndex;
    }
    updateDirectorsCarousel();
  });

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
