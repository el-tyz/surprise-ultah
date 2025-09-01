const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// --- bikin elemen popup untuk No ---
const funnyMessage = document.createElement("div");
funnyMessage.innerText = "Hehe, ga bisa nolak aku dong 😝";
funnyMessage.style.position = "fixed";
funnyMessage.style.top = "50%";
funnyMessage.style.left = "50%";
funnyMessage.style.transform = "translate(-50%, -50%)";
funnyMessage.style.background = "pink";
funnyMessage.style.padding = "20px 30px";
funnyMessage.style.borderRadius = "20px";
funnyMessage.style.fontSize = "18px";
funnyMessage.style.fontFamily = "Quicksand, sans-serif";
funnyMessage.style.display = "none";
document.body.appendChild(funnyMessage);

// --- tombol No kabur ---
noBtn.addEventListener("mouseover", () => {
  const newX = Math.floor(Math.random() * questionContainer.offsetWidth);
  const newY = Math.floor(Math.random() * questionContainer.offsetHeight);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
});

// --- kalau tombol Yes dipencet ---
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";

  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
    gifResult.play();

    // Tambahan: setelah 4.5 detik pindah ke page2.html
    setTimeout(() => {
      window.location.href = "page2.html";
    }, 4500);
  }, 3000); // waktu animasi loader
});

// --- kalau tombol No berhasil dipencet ---
let scale = 1; // ukuran awal

noBtn.addEventListener("click", () => {
  // pesan popup
  funnyMessage.style.display = "block";
  setTimeout(() => {
    funnyMessage.style.display = "none";
  }, 2000);

  // efek mengecil
  scale -= 0.2;
  if (scale <= 0) {
    noBtn.style.display = "none"; // hilang
  } else {
    noBtn.style.transform = `scale(${scale})`;
    noBtn.style.transition = "transform 0.3s ease";
  }
});

