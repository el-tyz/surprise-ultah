(function() {
  function $(id) { return document.getElementById(id); }

  var card   = $('card'),
      openB  = $('open'),
      closeB = $('close'),
      timer  = null,
      bgMusic = $('bg-music'); // 🎵 audio

  openB.addEventListener('click', function () {
    // --- START audio segera saat klik (biar lolos policy iOS/Safari) ---
    try {
      bgMusic.currentTime = 0;
      bgMusic.volume = 0;        // mulai senyap dulu
      bgMusic.muted  = true;     // trik: mulai dalam keadaan muted
      const p = bgMusic.play();  // start di call stack klik user
      if (p && p.catch) p.catch(()=>{ /* ignore */ });
    } catch(e) { /* ignore */ }
    // --- END ---

    // animasi existing
    card.setAttribute('class', 'open-half');
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute('class', 'open-fully');
      timer = null;

      // Setelah kebuka penuh: unmute + fade-in volume pelan2
      setTimeout(() => {
        bgMusic.muted = false;
        let v = 0;
        const iv = setInterval(() => {
          v += 0.1;
          if (v >= 1) { v = 1; clearInterval(iv); }
          bgMusic.volume = v;
        }, 80);
      }, 50);
    }, 1000);
  });

  closeB.addEventListener('click', function () {
    card.setAttribute('class', 'close-half');
    if (timer) clearTimeout(timer); // (koreksi typo clearTimerout)
    timer = setTimeout(function () {
      card.setAttribute('class', '');
      timer = null;

      // stop musik saat kartu ditutup
      try {
        bgMusic.pause();
        bgMusic.currentTime = 0;
      } catch(e) { /* ignore */ }
    }, 1000);
  });
}());
