let userName = "";
let currentIndex = 0;
let isFinished = false;
const duration = 7500;
const typingSpeed = 70;

const messages = [
    { text: "Taqabbal Allahu Minna wa Minkum,\nShiyamana wa Shiyamakum.", sticker: "dudu.gif" },
    { text: "Mohon Maaf Lahir dan Batin.\nSemoga berkah  dan rahmat selalu menyertai kita.", sticker: "dudu1.gif" },
    { text: "Di hari yang fitri ini,\nSemoga Allah mengampuni kita semua.", sticker: "dudu2.gif" },
    { text: "Minal 'Aidin wal Faizin,\nSelamat Hari Raya Idul Fitri 1447 H.", sticker: "dudu3.gif" }
];

const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const typingText = document.getElementById('typingText');
const loadingLine = document.getElementById('loadingLine');
const mainSticker = document.getElementById('mainSticker');
const bgMusic = document.getElementById('bgMusic');

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
    // 1. Sembunyikan kartu pilihan (box 1, 2, 3)
    document.getElementById('surpriseCard').style.display = "none";
    
    // 2. Pastikan stiker container UTAMA (yang di atas) tetap sembunyi dulu
    document.getElementById('stickerContainer').style.display = "none";
    
    // 3. Ambil elemen gambar yang ada DI DALAM kartu hasil (surpriseSticker)
    const surpriseImg = document.getElementById('surpriseSticker');
    
    // 4. Masukkan sumber gambar stiker dengan tambahan timestamp agar HP tidak error
    // Gunakan huruf kecil sesuai file di GitHub kamu
    surpriseImg.src = sticker.toLowerCase() + "?t=" + new Date().getTime();
    
    // 5. Masukkan teks pesan zonk/hadiahnya
    document.getElementById('surpriseResult').textContent = pesan;
    
    // 6. Tampilkan box hasil kejutan
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
function startApp() {
    const input = document.getElementById('nameInput');
    userName = input.value.trim();
    if (userName) {
        bgMusic.play();

        document.getElementById('modalOverlay').style.display = 'none';
        document.getElementById('senderName').textContent = `Hai: ${userName}`;
        document.getElementById('senderName').style.display = 'block';
        updateCard();

    }
}

function updateCard() {
    if (isFinished) return;
    const data = messages[currentIndex];
    
    // 1. Ambil container dan pastikan muncul
    const stickerCont = document.getElementById('stickerContainer');
    stickerCont.style.display = "block";
    
    // 2. Ganti source stiker (Cukup satu kali panggil saja)
    // Gunakan timestamp agar browser dipaksa reload GIF-nya
    mainSticker.src = data.sticker + "?t=" + new Date().getTime();
    
    // 3. Jalankan teks typewriter
    typeWriter(data.text);

    // 4. Reset & Jalankan Loading Bar
    loadingLine.style.animation = 'none';
    void loadingLine.offsetWidth; // Trik agar animasi bisa restart
    loadingLine.style.animation = `load ${duration}ms linear forwards`;
const waMsg = `Pesan dari ${userName}: ${data.text.replace(/\n/g, ' ')}`;
document.getElementById('waLink').href = `https://wa.me/?text=${encodeURIComponent(waMsg)}`;
    // 5. ATUR PERPINDAHAN KARTU DI SINI (Hapus startLoop)
    setTimeout(() => {
        if (isFinished) return;
        currentIndex++;
        if (currentIndex < messages.length) {
            updateCard();
        } else {
            showFinish();
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
    document.getElementById('stickerContainer').style.display = "block";
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

