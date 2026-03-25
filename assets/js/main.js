
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 50 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }


  /**
   * Mobile nav toggle
   */

  const mobileNavToogleButton = document.querySelector('.mobile-nav-toggle');

  if (mobileNavToogleButton) {
    mobileNavToogleButton.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    });
  }

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToogleButton.classList.toggle('bi-list');
    mobileNavToogleButton.classList.toggle('bi-x');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }


  /**
   * Open and close the search form.
   */
  const searchOpen = document.querySelector('.js-search-open');
  const searchClose = document.querySelector('.js-search-close');
  const searchWrap = document.querySelector(".js-search-form-wrap");

  searchOpen.addEventListener("click", (e) => {
    e.preventDefault();
    searchWrap.classList.add("active");
  });

  searchClose.addEventListener("click", (e) => {
    e.preventDefault();
    searchWrap.classList.remove("active");
  });


});


// popup js

// Open popup
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('contactModal');
  const openBtns = document.querySelectorAll('.open-popup');
  const closeBtn = document.querySelector('.popup-close');

  // Open popup
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('show'), 10);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    });
  });

  // Close popup
  function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }, 300);
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});


// Tabs
(function () {
  const allTabs = document.querySelectorAll(".flex-tabs");
  if (!allTabs.length) return;

  allTabs.forEach(tabContainer => {
    const buttons = tabContainer.querySelectorAll(".tablinks");
    buttons.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const wrapper = tabContainer.closest(".tabsCon");
        wrapper.querySelectorAll(".tabcontent").forEach(c => (c.style.display = "none"));
        tabContainer.querySelectorAll(".tablinks").forEach(b => b.classList.remove("active"));

        const match = btn.getAttribute("onclick")?.match(/'(.*?)'/);
        if (!match) return;

        const target = wrapper.querySelector("#" + match[1]);
        if (target) target.style.display = "block";
        btn.classList.add("active");
      });
    });
  });
})();