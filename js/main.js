/* Sovann Su — Portfolio
   main.js — mobile navigation toggle and certification tabs.
   No styling is applied here; all presentation lives in css/style.css. */

(function () {
  "use strict";

  /* ---------------------------------------------------------------
     Mobile navigation toggle
     --------------------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");

    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* ---------------------------------------------------------------
     Certification tabs (ARIA tablist pattern)
     --------------------------------------------------------------- */
  function initTabs() {
    var tablist = document.querySelector('[role="tablist"]');

    if (!tablist) {
      return;
    }

    var tabs = Array.prototype.slice.call(
      tablist.querySelectorAll('[role="tab"]')
    );

    if (tabs.length === 0) {
      return;
    }

    function selectTab(tab, setFocus) {
      tabs.forEach(function (item) {
        var selected = item === tab;
        var panel = document.getElementById(
          item.getAttribute("aria-controls")
        );

        item.setAttribute("aria-selected", selected ? "true" : "false");
        item.setAttribute("tabindex", selected ? "0" : "-1");

        if (panel) {
          panel.hidden = !selected;
        }
      });

      if (setFocus) {
        tab.focus();
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        selectTab(tab, false);
      });

      tab.addEventListener("keydown", function (event) {
        var index = tabs.indexOf(tab);
        var nextIndex = null;

        switch (event.key) {
          case "ArrowRight":
          case "ArrowDown":
            nextIndex = (index + 1) % tabs.length;
            break;
          case "ArrowLeft":
          case "ArrowUp":
            nextIndex = (index - 1 + tabs.length) % tabs.length;
            break;
          case "Home":
            nextIndex = 0;
            break;
          case "End":
            nextIndex = tabs.length - 1;
            break;
          default:
            return;
        }

        event.preventDefault();
        selectTab(tabs[nextIndex], true);
      });
    });

    /* Ensure a consistent starting state regardless of markup order. */
    var initial =
      tabs.filter(function (tab) {
        return tab.getAttribute("aria-selected") === "true";
      })[0] || tabs[0];

    selectTab(initial, false);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initTabs();
  });
})();
