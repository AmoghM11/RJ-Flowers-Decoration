(function(){
  "use strict";

  var BIZ = {
    name: "RJ Flowers Decoration",
    phone: "+91XXXXXXXXXX", // TODO: replace with real number before launch
    wa: "91XXXXXXXXXX",     // TODO: replace with real WhatsApp number (no + or spaces)
    waMsg: "Hi RJ Flowers Decoration! I'd like a quote for wedding/event decoration."
  };

  function waLink(msg){
    return "https://wa.me/" + BIZ.wa + "?text=" + encodeURIComponent(msg || BIZ.waMsg);
  }

  document.querySelectorAll(".js-wa").forEach(function(el){ el.href = waLink(); });
  document.querySelectorAll(".js-call").forEach(function(el){ el.href = "tel:" + BIZ.phone; });

  /* ---------- Nav scroll state ---------- */
  var nav = document.querySelector(".nav");
  var backTop = document.querySelector(".fab.top");
  function onScroll(){
    var y = window.scrollY || document.documentElement.scrollTop;
    if(nav) nav.classList.toggle("scrolled", y > 40);
    if(backTop) backTop.classList.toggle("show", y > 600);
  }
  document.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector(".burger");
  var mobileMenu = document.querySelector(".mobile-menu");
  if(burger && mobileMenu){
    burger.addEventListener("click", function(){
      mobileMenu.classList.toggle("open");
    });
    mobileMenu.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ mobileMenu.classList.remove("open"); });
    });
  }

  /* ---------- Back to top ---------- */
  if(backTop){
    backTop.addEventListener("click", function(){
      window.scrollTo({top:0, behavior:"smooth"});
    });
  }

  /* ---------- Scroll reveals ---------- */
  var revealEls = document.querySelectorAll(".reveal:not(.in)");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:"0px 0px -60px 0px"});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in"); });
  }

  /* ---------- Gallery lightbox ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery__item"));
  var lightbox = document.querySelector(".lightbox");
  if(items.length && lightbox){
    var lbImg = lightbox.querySelector(".lightbox__img");
    var lbCap = lightbox.querySelector(".lightbox__cap");
    var idx = 0;

    function show(i){
      idx = (i + items.length) % items.length;
      var img = items[idx].querySelector("img");
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.alt;
    }
    function open(i){
      show(i);
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close(){
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
    items.forEach(function(item, i){
      item.addEventListener("click", function(){ open(i); });
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", close);
    lightbox.querySelector(".lightbox__nav.prev").addEventListener("click", function(){ show(idx - 1); });
    lightbox.querySelector(".lightbox__nav.next").addEventListener("click", function(){ show(idx + 1); });
    lightbox.addEventListener("click", function(e){ if(e.target === lightbox) close(); });
    document.addEventListener("keydown", function(e){
      if(!lightbox.classList.contains("open")) return;
      if(e.key === "Escape") close();
      if(e.key === "ArrowLeft") show(idx - 1);
      if(e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  var form = document.querySelector(".contact-form");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var eventDate = (data.get("eventDate") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      var lines = ["Hi RJ Flowers Decoration!"];
      if(name) lines.push("My name is " + name + ".");
      if(service) lines.push("I'm interested in: " + service + ".");
      if(eventDate) lines.push("Event date: " + eventDate + ".");
      if(message) lines.push(message);

      var status = form.querySelector(".form-status");
      if(status){ status.textContent = "Opening WhatsApp…"; }
      window.open(waLink(lines.join(" ")), "_blank");
      if(status){
        setTimeout(function(){
          status.textContent = "Thanks! Continue the chat on WhatsApp to confirm your booking.";
        }, 400);
      }
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector(".js-year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

})();
