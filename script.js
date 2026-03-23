document.addEventListener("DOMContentLoaded", function () {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var themeToggle = document.getElementById("themeToggle");
  var savedTheme = localStorage.getItem("aw-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light");
    var isLight = document.body.classList.contains("light");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("aw-theme", isLight ? "light" : "dark");
  });

  var menuToggle = document.getElementById("menuToggle");
  var mobileNav = document.getElementById("mobileNav");
  menuToggle.addEventListener("click", function () {
    mobileNav.classList.toggle("open");
  });
  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("open");
    });
  });

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("show");
    });
  }

  var typingText = document.getElementById("typingText");
  if (typingText) {
    var words = ["Websites", "Landing Pages", "Brand Systems", "UI Experiences"];
    var wordIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function typeTick() {
      var current = words[wordIndex];
      typingText.textContent = current.slice(0, charIndex);

      if (!deleting && charIndex === current.length) {
        deleting = true;
        setTimeout(typeTick, 1000);
        return;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      charIndex += deleting ? -1 : 1;
      setTimeout(typeTick, deleting ? 55 : 85);
    }
    typeTick();
  }

  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10);
        var current = 0;
        var step = Math.max(1, Math.ceil(target / 60));

        var timer = setInterval(function () {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current;
        }, 24);

        counterObserver.unobserve(el);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  var filters = document.querySelectorAll(".filter-btn");
  var projects = document.querySelectorAll(".project");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");
      filters.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      projects.forEach(function (card) {
        var type = card.getAttribute("data-type");
        var show = filter === "all" || filter === type;
        card.style.display = show ? "block" : "none";
      });
    });
  });

  var faqButtons = document.querySelectorAll(".faq-q");
  faqButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var answer = btn.nextElementSibling;
      var isOpen = answer.style.display === "block";

      document.querySelectorAll(".faq-a").forEach(function (a) {
        a.style.display = "none";
      });

      answer.style.display = isOpen ? "none" : "block";
    });
  });

  var testimonials = [
    { text: "The website looks premium and feels like a real modern studio brand.", name: "Client A" },
    { text: "Fast, clean, and beautiful. The glass effect makes it stand out.", name: "Client B" },
    { text: "Very polished design. The scrolling and sections feel professional.", name: "Client C" }
  ];

  var tText = document.getElementById("testimonialText");
  var tName = document.getElementById("testimonialName");
  var testimonialIndex = 0;

  function showTestimonial() {
    var item = testimonials[testimonialIndex];
    tText.textContent = "“" + item.text + "”";
    tName.textContent = "— " + item.name;
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  }
  if (tText && tName) {
    showTestimonial();
    setInterval(showTestimonial, 3000);
  }

  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill all fields.");
        return;
      }

      var subject = encodeURIComponent("Website inquiry from " + name);
      var body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
      );

      window.location.href = "mailto:Aaradhya_web_tudio.com?subject=" + subject + "&body=" + body;
    });
  }

  var canvas = document.getElementById("particleCanvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = [];
      var count = Math.min(90, Math.floor(w / 18));
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.35,
          vy: Math.random() * 0.45 + 0.2
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y > h + 10) {
          p.y = -10;
          p.x = Math.random() * w;
        }
        if (p.x > w + 10) p.x = -10;
        if (p.x < -10) p.x = w + 10;

        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
  }
});
