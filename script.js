// ==============================================================================
// 💖 İNTERAKTİF MOTOR / ROMANTIC INTERACTIVE ENGINE (script.js)
// ==============================================================================

function initApp() {
    // 1. URL PARAMETRELERİ İLE DİNAMİK ÖZELLEŞTİRME (Opsiyonel Kolaylık)
    // Örn: site.com/?cift=Ali%20%26%20Ayse&tarih=2023-10-14
    if (typeof CONFIG === "undefined") {
        console.error("CONFIG nesnesi bulunamadı!");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("cift")) CONFIG.coupleTitle = urlParams.get("cift");
    if (urlParams.has("tarih")) CONFIG.startDate = urlParams.get("tarih");
    if (urlParams.has("partner")) CONFIG.partnerName = urlParams.get("partner");
    if (urlParams.has("gonderen")) CONFIG.senderName = urlParams.get("gonderen");

    // 2. METİNLERİ VE BİLGİLERİ DOLDURMA
    initTextContents();

    // 3. AŞK SAYACINI BAŞLATMA
    initLoveTimer();

    // 4. MÜZİK ÇALAR & İLK TIKLAMA YÖNETİMİ
    initMusicPlayer();

    // 5. KAÇAN BUTON & İNTERAKTİF AF/SEVGİ OYUNU
    initInteractiveGame();

    // 6. POLAROID GALERİSİ
    initPolaroidGallery();

    // 7. DAKTİLO MEKTUP (SCROLL İLE TETİKLENEN)
    initTypewriterLetter();

    // 8. SENİ SEVMEMİN NEDENLERİ
    initLoveReasons();

    // 9. SEVGİ KUPONLARI
    initCoupons();

    // 10. UÇUŞAN KALPLER ARKA PLANI
    startFloatingHearts();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

// ==============================================================================
// METİNLERİ DOLDURMA
// ==============================================================================
function initTextContents() {
    document.title = `${CONFIG.coupleTitle} ❤️`;
    document.getElementById("coupleTitle").textContent = CONFIG.coupleTitle;
    document.getElementById("heroSubtitle").textContent = CONFIG.subTitle;
    document.getElementById("songTitle").textContent = CONFIG.music.title;
    document.getElementById("songArtist").textContent = CONFIG.music.artist;
    document.getElementById("letterHeading").textContent = CONFIG.letter.heading;
    document.getElementById("senderNameDisplay").textContent = CONFIG.senderName;
    document.getElementById("gameQuestion").textContent = CONFIG.interactiveQuestion.question;
    document.getElementById("yesBtnText").textContent = CONFIG.interactiveQuestion.yesBtn;
    document.getElementById("noBtnText").textContent = CONFIG.interactiveQuestion.noBtn;
    document.getElementById("modalEmoji").textContent = CONFIG.interactiveQuestion.successEmoji;
    document.getElementById("modalTitle").textContent = CONFIG.interactiveQuestion.successTitle;
    document.getElementById("modalMessage").textContent = CONFIG.interactiveQuestion.successMessage;
    document.getElementById("footerText").textContent = `${CONFIG.partnerName}, seninle her şey çok daha güzel.`;
}

// ==============================================================================
// ⏳ CANLI AŞK SAYACI (İLİŞKİ SÜRESİ)
// ==============================================================================
function initLoveTimer() {
    const startDate = new Date(CONFIG.startDate).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const difference = now - startDate;

        if (difference < 0) {
            // Gelecek bir tarih girilmişse
            document.getElementById("years").textContent = "0";
            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";
            return;
        }

        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        
        // Toplam gün ve yıl hesaplama
        const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        const years = Math.floor(totalDays / 365.25);
        const days = Math.floor(totalDays % 365.25);

        document.getElementById("years").textContent = years;
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ==============================================================================
// 🎵 MÜZİK ÇALAR & NOSTALJİK PLAK
// ==============================================================================
function initMusicPlayer() {
    const audio = document.getElementById("bgAudio");
    const vinyl = document.getElementById("vinylRecord");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playIcon = document.getElementById("playIcon");
    const musicPlayer = document.getElementById("musicPlayer");
    const musicToast = document.getElementById("musicToast");

    audio.src = CONFIG.music.url;
    let isPlaying = false;
    let hasInteracted = false;

    // Toast bildirimi göster
    setTimeout(() => {
        if (!isPlaying) {
            musicToast.classList.add("show");
            setTimeout(() => musicToast.classList.remove("show"), 6000);
        }
    }, 1500);

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            vinyl.classList.remove("spinning");
            playIcon.className = "fa-solid fa-play";
            isPlaying = false;
        } else {
            audio.play().then(() => {
                vinyl.classList.add("spinning");
                playIcon.className = "fa-solid fa-pause";
                isPlaying = true;
                musicToast.classList.remove("show");
            }).catch(e => {
                console.log("Ses oynatma hatası (kullanıcı etkileşimi bekleniyor):", e);
            });
        }
    }

    playPauseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        togglePlay();
    });

    musicPlayer.addEventListener("click", () => {
        togglePlay();
    });

    // Kullanıcı sayfada herhangi bir yere ilk dokunduğunda müziği başlat
    function startOnFirstInteraction() {
        if (!hasInteracted && !isPlaying) {
            hasInteracted = true;
            togglePlay();
        }
    }

    document.body.addEventListener("click", startOnFirstInteraction, { once: true });
    document.body.addEventListener("touchstart", startOnFirstInteraction, { once: true });
}

// ==============================================================================
// 🏃‍♂️ KAÇAN BUTON & İNTERAKTİF SORU
// ==============================================================================
function initInteractiveGame() {
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");
    const btnContainer = document.getElementById("btnContainer");
    const successModal = document.getElementById("successModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");

    let yesScale = 1;
    let escapeCount = 0;

    const phrases = [
        "Hayır 😜",
        "Emin misin? 🥺",
        "Bir daha düşün bence!",
        "Yakalayamazsın ki! 🏃‍♂️",
        "Tıklayamazsın! 😂",
        "Evet'e basmalısın! ❤️",
        "Kaçıyorum! 💨",
        "Hala deniyor musun? 🥰"
    ];

    function runAwayButton(e) {
        if (e) e.preventDefault();
        escapeCount++;

        const containerRect = btnContainer.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Rastgele X ve Y koordinatları
        const maxX = containerRect.width - btnRect.width - 20;
        const maxY = 120; // dikeyde hafif oyna

        const randomX = (Math.random() - 0.5) * maxX;
        const randomY = (Math.random() - 0.5) * maxY;

        noBtn.style.position = "relative";
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        // Buton yazısını eğlenceli değiştir
        const nextPhrase = phrases[escapeCount % phrases.length];
        document.getElementById("noBtnText").textContent = nextPhrase;

        // Evet butonunu her kaçışta biraz büyüt
        yesScale += 0.08;
        if (yesScale > 1.8) yesScale = 1.8;
        yesBtn.style.transform = `scale(${yesScale})`;

        // Mini pıt pıt titreşim
        if (navigator.vibrate) navigator.vibrate(40);
    }

    noBtn.addEventListener("mouseenter", runAwayButton);
    noBtn.addEventListener("touchstart", (e) => {
        runAwayButton(e);
    });
    noBtn.addEventListener("click", runAwayButton);

    // EVET BUTONUNA TIKLANINCA
    yesBtn.addEventListener("click", () => {
        triggerConfettiCelebration();
        successModal.classList.add("active");
    });

    modalCloseBtn.addEventListener("click", () => {
        successModal.classList.remove("active");
    });

    successModal.addEventListener("click", (e) => {
        if (e.target === successModal) {
            successModal.classList.remove("active");
        }
    });
}

// Konfeti ve Kalp Yağmuru
function triggerConfettiCelebration() {
    if (typeof confetti === "function") {
        // Renkli konfeti patlaması
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff758f', '#ffffff', '#ffd166', '#c9184a']
        });

        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 80,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 250);
    }
}

// ==============================================================================
// 📸 POLAROID ANI GALERİSİ & RESİM BÜYÜTME
// ==============================================================================
function initPolaroidGallery() {
    const gallery = document.getElementById("polaroidGallery");
    const imageModal = document.getElementById("imageModal");
    const modalImagePreview = document.getElementById("modalImagePreview");
    const modalImageDate = document.getElementById("modalImageDate");
    const modalImageText = document.getElementById("modalImageText");
    const imageModalClose = document.getElementById("imageModalClose");

    gallery.innerHTML = "";

    CONFIG.memories.forEach((mem, index) => {
        const card = document.createElement("div");
        card.className = "polaroid-card";
        card.innerHTML = `
            <div class="polaroid-pin"></div>
            <div class="polaroid-img-box">
                <img src="${mem.image}" alt="${mem.title || 'Anı'}" loading="lazy">
            </div>
            <div class="polaroid-info">
                <span class="polaroid-date">${mem.date}</span>
                <p class="polaroid-caption">${mem.caption}</p>
            </div>
        `;

        card.addEventListener("click", () => {
            modalImagePreview.src = mem.image;
            modalImageDate.textContent = mem.date;
            modalImageText.textContent = mem.caption;
            imageModal.classList.add("active");
        });

        gallery.appendChild(card);
    });

    imageModalClose.addEventListener("click", () => {
        imageModal.classList.remove("active");
    });

    imageModal.addEventListener("click", (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove("active");
        }
    });
}

// ==============================================================================
// 💌 DAKTİLO EFEKTLİ ROMANTİK MEKTUP
// ==============================================================================
function initTypewriterLetter() {
    const letterTextElem = document.getElementById("typewriterText");
    const letterSection = document.querySelector(".letter-section");
    const fullText = CONFIG.letter.body;
    let isTyped = false;

    function typeWriterEffect() {
        if (isTyped) return;
        isTyped = true;
        
        let index = 0;
        letterTextElem.textContent = "";

        const timer = setInterval(() => {
            if (index < fullText.length) {
                letterTextElem.textContent += fullText.charAt(index);
                index++;
            } else {
                clearInterval(timer);
            }
        }, 28);
    }

    // Kullanıcı mektup bölümüne scroll ettiğinde daktilo başlasın
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriterEffect();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(letterSection);
}

// ==============================================================================
// ✨ SENİ SEVMEMİN NEDENLERİ LİSTESİ
// ==============================================================================
function initLoveReasons() {
    const container = document.getElementById("reasonsContainer");
    container.innerHTML = "";

    CONFIG.loveReasons.forEach((reason, idx) => {
        const item = document.createElement("div");
        item.className = "reason-item";
        item.innerHTML = `
            <div class="reason-number">#${idx + 1}</div>
            <p class="reason-text">${reason}</p>
        `;
        container.appendChild(item);
    });
}

// ==============================================================================
// 🎟️ SEVGİ KUPONLARI (TIKLAYINCA DAMGA BASILIR)
// ==============================================================================
function initCoupons() {
    const grid = document.getElementById("couponsGrid");
    grid.innerHTML = "";

    CONFIG.coupons.forEach((coupon) => {
        const card = document.createElement("div");
        card.className = "coupon-card";
        card.innerHTML = `
            <div class="coupon-stamp">✅ KULLANILDI</div>
            <div class="coupon-icon">${coupon.icon}</div>
            <h4 class="coupon-title">${coupon.title}</h4>
            <p class="coupon-desc">${coupon.desc}</p>
        `;

        card.addEventListener("click", () => {
            card.classList.toggle("used");
            
            if (card.classList.contains("used")) {
                if (typeof confetti === "function") {
                    confetti({
                        particleCount: 25,
                        spread: 40,
                        origin: { y: 0.8 }
                    });
                }
                if (navigator.vibrate) navigator.vibrate(60);
            }
        });

        grid.appendChild(card);
    });
}

// ==============================================================================
// 💖 UÇUŞAN KALPLER ARKA PLANI
// ==============================================================================
function startFloatingHearts() {
    const container = document.getElementById("hearts-container");
    const icons = ["fa-heart", "fa-heart", "fa-sparkles", "fa-star"];

    setInterval(() => {
        if (document.hidden) return; // Sekme arka plandaysa kalp üretme

        const heart = document.createElement("i");
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        heart.className = `fa-solid ${randomIcon} floating-heart`;
        heart.style.left = `${Math.random() * 96}%`;
        heart.style.fontSize = `${Math.random() * 16 + 12}px`;
        heart.style.animationDuration = `${Math.random() * 6 + 6}s`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 12000);
    }, 450);
}
