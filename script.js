let userName = "";
let currentIndex = 0;
let isFinished = false;
const duration = 7500;
const typingSpeed = 70;

const messages = [
    { text: "Taqabbal Allahu Minna wa Minkum,\nShiyamana wa Shiyamakum.", icon: "🌙", sticker: "Dudu.gif" },
    { text: "Mohon Maaf Lahir dan Batin.\nSemoga berkah  dan rahmat selalu menyertai kita.", icon: "✨", sticker: "Dudu(1).gif" },
    { text: "Di hari yang fitri ini,\nSemoga Allah mengampuni kita semua.", icon: "🕌", sticker: "Dudu(2).gif" },
    { text: "Minal 'Aidin wal Faizin,\nSelamat Hari Raya Idul Fitri 1447 H.", icon: "☪️", sticker: "Dudu(3).gif" }
];

const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const typingText = document.getElementById('typingText');
const loadingLine = document.getElementById('loadingLine');
const mainSticker = document.getElementById('mainSticker');

// --- LOGIKA AWAL & MODAL ---

nameInput.addEventListener('input', () => {
    startBtn.disabled = nameInput.value.trim().length === 0;
});

startBtn.addEventListener('click', () => {
    userName = nameInput.value.trim();
    document.getElementById('modalOverlay').classList.add('hidden');
    document.getElementById('mainContainer').classList.add('visible');
    
    // Tampilkan Card Kejutan Terlebih Dahulu
    showSurpriseCard();
});

// --- FITUR BARU: CARD KEJUTAN ---

function showSurpriseCard() {
    const surpriseCard = document.getElementById('surpriseCard');
    document.getElementById('surpriseName').textContent = userName;
    surpriseCard.style.display = "flex";
}


// Fungsi saat ketupat diklik
function chooseKetupat(pesan, sticker) {
    document.getElementById('surpriseCard').style.display = "none";
    
    const messageBox = document.getElementById('messageBox');
    
    // Gunakan sticker container utama agar tetap bulat di message box
    const stickerCont = document.getElementById('stickerContainer');
    stickerCont.style.display = "block";
    document.getElementById('mainSticker').src = sticker;
    
    document.getElementById('surpriseResult').textContent = pesan;
    messageBox.style.display = "flex";
    //bsru
     document.getElementById('surpriseCard').style.display = "none";
    
    // 2. Pastikan stiker yang di ATAS kartu tetap SEMBUNYI dulu
    document.getElementById('stickerContainer').style.display = "none";
    
    // 3. Isi gambar stiker yang ada DI DALAM kartu (surpriseSticker)
    document.getElementById('surpriseSticker').src = sticker;
    
    // 4. Isi teks pesan iseng
    document.getElementById('surpriseResult').textContent = pesan;
    
    // 5. Tampilkan message box
    document.getElementById('messageBox').style.display = "flex";
}

// Fungsi pindah ke ucapan utama
function goToMainUcapan() {
    document.getElementById('messageBox').style.display = "none";
    document.getElementById('mainUcapanCard').style.display = "flex";
    
    // Pastikan Nama & Stiker Muncul
    document.getElementById('senderName').style.display = "block";
    document.getElementById('senderName').textContent = "Hai: " + userName;
    document.getElementById('senderName').classList.add('visible');
    
    document.getElementById('stickerContainer').style.display = "block";

    updateCard();
    startLoop();
}

function typeWriter(text) {
    typingText.innerHTML = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
            i++;
            setTimeout(type, typingSpeed);
        }
    }
    type();
}

function updateCard() {
    if (isFinished) return;
    const data = messages[currentIndex];
    
    mainSticker.src = data.sticker;
    document.getElementById('stickerContainer').classList.add('visible');
    
    typeWriter(data.text);

    loadingLine.style.animation = 'none';
    loadingLine.offsetHeight; 
    loadingLine.style.animation = `load ${duration}ms linear forwards`;

    const waMsg = `Pesan dari ${userName}: ${data.text.replace(/\n/g, ' ')}`;
    document.getElementById('waLink').href = `https://wa.me/?text=${encodeURIComponent(waMsg)}`;
}

function startLoop() {
    setInterval(() => {
        if (isFinished) return;
        currentIndex++;
        if (currentIndex >= messages.length) {
            showFinish();
        } else {
            updateCard();
        }
    }, duration);
}

function showFinish() {
    isFinished = true;
    document.getElementById('senderName').style.display = "none";
    // 1. Sembunyikan konten teks utama & loading bar
    document.getElementById('cardInnerContent').style.display = "none";
    document.getElementById('loadingBar').style.display = "none"; 
    
    // 2. PASTIKAN stiker utama TETAP MUNCUL
    // Pastikan baris ini TIDAK ADA atau di-set ke "block"
    document.getElementById('stickerContainer').style.display = "block";
    
    // 3. Munculkan pesan penutup
    document.getElementById('finishName').textContent = userName;
    document.getElementById('finishMessage').style.display = "block";
    
    // 4. Munculkan tombol WhatsApp & Label
    document.getElementById('waLink').classList.add('visible');
    document.getElementById('waLabel').style.opacity = 1;
}

// --- KONTROL MUSIK & BACKGROUND ---

let isPlaying = false;
function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        music.play().catch(() => {
            alert("Klik layar dulu untuk memutar musik!");
        });
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

music.onended = function() {
    isPlaying = false;
    musicBtn.innerHTML = '<i class="fas fa-music"></i>';
};

window.onload = () => {
    const starsWrap = document.getElementById('stars');
    for(let i=0; i<50; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.animationDelay = Math.random() * 3 + 's';
        starsWrap.appendChild(s);
    }
};