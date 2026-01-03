document.addEventListener("DOMContentLoaded", function () {
  // Tabs Functionality
  const tabs = document.querySelectorAll(".events-tabs a");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Here you would normally filter events based on tab
      // For demo: just change text (you can expand with real filtering)
      console.log("Switched to:", this.textContent.trim());
    });
  });

  // Pagination Functionality (Demo - Page 1 to 10)
  const prevBtn = document.querySelector(".pagination button:not(.next-btn)");
  const nextBtn = document.querySelector(".pagination .next-btn");
  const pageInfo = document.querySelector(".pagination .page-info");

  let currentPage = 1;
  const totalPages = 10;

  function updatePagination() {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.textContent = currentPage === totalPages ? "NEXT →" : "NEXT →";
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
      // Load previous page events (simulate)
      console.log("Load page:", currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
      // Load next page events (simulate)
      console.log("Load page:", currentPage);
    }
  });

  // Initial update
  updatePagination();
});
