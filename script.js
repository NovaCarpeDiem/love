// ==============================================================================
// 💖 İNTERAKTİF MOTOR / ROMANTIC INTERACTIVE ENGINE (script.js)
// ==============================================================================

function initApp() {
    // 1. URL DATA DECODE (Tüm Telefonlar, Mobil Tarayıcılar ve WebViews İçin %100 Uyumlu)
    const urlParams = new URLSearchParams(window.location.search);
    let parsedData = {};

    let rawParam = urlParams.get("data");
    if (!rawParam) {
        const match = window.location.href.match(/[?&#]data=([^&#]+)/);
        if (match && match[1]) rawParam = match[1];
    }

    if (rawParam) {
        try {
            const cleanStr = decodeURIComponent(rawParam).replace(/ /g, "+");
            let rawJson = "";
            try {
                const binary = atob(cleanStr);
                const bytes = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
                rawJson = new TextDecoder('utf-8').decode(bytes);
            } catch (e1) {
                rawJson = decodeURIComponent(escape(atob(cleanStr)));
            }
            parsedData = JSON.parse(rawJson);
        } catch (e) {
            console.error("Özel veri çözümlenirken hata oluştu:", e);
        }
    }

    // Doğrudan URL Parametreleri (Örn: ?c=Merve&p=Orkide&s=Ali&d=2025-02-17...)
    if (urlParams.has("c")) parsedData.c = urlParams.get("c");
    if (urlParams.has("p")) parsedData.p = urlParams.get("p");
    if (urlParams.has("s")) parsedData.s = urlParams.get("s");
    if (urlParams.has("d")) parsedData.d = urlParams.get("d");
    if (urlParams.has("st")) parsedData.st = urlParams.get("st");
    if (urlParams.has("sp")) parsedData.sp = urlParams.get("sp");
    if (urlParams.has("sc")) parsedData.sc = urlParams.get("sc");
    if (urlParams.has("l")) parsedData.l = urlParams.get("l");

    if (urlParams.has("cift")) parsedData.c = urlParams.get("cift");
    if (urlParams.has("tarih")) parsedData.d = urlParams.get("tarih");
    if (urlParams.has("partner")) parsedData.p = urlParams.get("partner");
    if (urlParams.has("gonderen")) parsedData.s = urlParams.get("gonderen");

    // CONFIG'i gelen verilerle güncelle
    if (parsedData.c || parsedData.coupleTitle) CONFIG.coupleTitle = parsedData.c || parsedData.coupleTitle;
    if (parsedData.p || parsedData.partnerName) CONFIG.partnerName = parsedData.p || parsedData.partnerName;
    if (parsedData.s || parsedData.senderName) CONFIG.senderName = parsedData.s || parsedData.senderName;
    if (parsedData.d || parsedData.startDate) CONFIG.startDate = parsedData.d || parsedData.startDate;
    if (parsedData.st || parsedData.subTitle) CONFIG.subTitle = parsedData.st || parsedData.subTitle;

    if (parsedData.l) {
        if (!CONFIG.letter) CONFIG.letter = {};
        CONFIG.letter.body = parsedData.l;
    } else if (parsedData.letter) {
        if (typeof parsedData.letter === "string") CONFIG.letter.body = parsedData.letter;
        else Object.assign(CONFIG.letter, parsedData.letter);
    }

    if (parsedData.sp) {
        if (!CONFIG.music) CONFIG.music = {};
        CONFIG.music.spotifyUrl = parsedData.sp.startsWith("http") ? parsedData.sp : "https://open.spotify.com/track/" + parsedData.sp;
    } else if (parsedData.music && parsedData.music.spotifyUrl) {
        CONFIG.music.spotifyUrl = parsedData.music.spotifyUrl;
    }

    if (parsedData.mu) {
        if (!CONFIG.music) CONFIG.music = {};
        CONFIG.music.url = parsedData.mu;
    }

    if (parsedData.sc) {
        if (!CONFIG.scratchCard) CONFIG.scratchCard = {};
        CONFIG.scratchCard.message = parsedData.sc;
    } else if (parsedData.scratchCard) {
        Object.assign(CONFIG.scratchCard, parsedData.scratchCard);
    }

    if (parsedData.imgs && Array.isArray(parsedData.imgs)) {
        parsedData.imgs.forEach((imgUrl, i) => {
            if (imgUrl && CONFIG.memories[i]) {
                CONFIG.memories[i].image = imgUrl.startsWith("http") ? imgUrl : "https://files.catbox.moe/" + imgUrl;
            }
        });
    } else if (parsedData.memories) {
        CONFIG.memories = parsedData.memories;
    }

    // 2. METİNLERİ VE BİLGİLERİ DOLDURMA
    initTextContents();

    // 3. AŞK SAYACINI BAŞLATMA
    initLoveTimer();

    // 4. MÜZİK ÇALAR & İLK TIKLAMA YÖNETİMİ
    initMusicPlayer();

    // 5. KAÇAN BUTON & İNTERAKTİF AF/SEVGİ OYUNU
    initInteractiveGame();

    // 5.5 🪙 KAZI KAZAN SÜRPRİZ KARTI
    initScratchCard();

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
    
    const cTitle = document.getElementById("coupleTitle");
    if (cTitle) cTitle.textContent = CONFIG.coupleTitle;

    const hSub = document.getElementById("heroSubtitle");
    if (hSub) hSub.textContent = CONFIG.subTitle;

    const sTitle = document.getElementById("songTitle");
    if (sTitle) sTitle.textContent = (CONFIG.music && CONFIG.music.title) || "Bizim Şarkımız";

    const sArtist = document.getElementById("songArtist");
    if (sArtist) sArtist.textContent = (CONFIG.music && CONFIG.music.artist) || "Sana Özel";
    
    // Spotify Entegrasyonu (Sadece Spotify Linki Varsa Açılır)
    const spotifyBtn = document.getElementById("spotifyBtn");
    const spotifyCard = document.getElementById("spotifyEmbedCard");
    const spotifyIframeWrap = document.getElementById("spotifyIframeWrap");

    if (CONFIG.music && CONFIG.music.spotifyUrl && CONFIG.music.spotifyUrl.trim()) {
        const spotUrl = CONFIG.music.spotifyUrl.trim();
        if (spotifyBtn) {
            spotifyBtn.href = spotUrl;
            spotifyBtn.style.display = "flex";
        }

        const match = spotUrl.match(/spotify\.com\/(?:intl-[a-z]+\/)?(track|playlist|album|artist)\/([a-zA-Z0-9]+)/);
        if (match && spotifyCard && spotifyIframeWrap) {
            const type = match[1];
            const id = match[2];
            const embedUrl = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
            const iframeHeight = type === 'track' ? 80 : 152;

            spotifyIframeWrap.innerHTML = `
                <iframe style="border-radius:12px;" src="${embedUrl}" width="100%" height="${iframeHeight}" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            `;
            spotifyCard.style.display = "block";
        } else if (spotifyCard) {
            spotifyCard.style.display = "none";
        }
    } else {
        if (spotifyBtn) spotifyBtn.style.display = "none";
        if (spotifyCard) spotifyCard.style.display = "none";
    }

    // Kazı Kazan Metinleri
    if (CONFIG.scratchCard) {
        const sHead = document.getElementById("scratchHeading");
        if (sHead) sHead.textContent = CONFIG.scratchCard.heading || "🎉 Gizli Aşk Mesajın:";

        const sMsg = document.getElementById("scratchMessage");
        if (sMsg) sMsg.textContent = CONFIG.scratchCard.message || "Sen benim bu hayatta başıma gelen en güzel şeysin... ❤️✨";
    }

    const lHead = document.getElementById("letterHeading");
    if (lHead) lHead.textContent = (CONFIG.letter && CONFIG.letter.heading) ? CONFIG.letter.heading : `Benim Güzel ${CONFIG.partnerName},`;
    
    const sName = document.getElementById("senderNameDisplay");
    if (sName) sName.textContent = CONFIG.senderName;

    const gQ = document.getElementById("gameQuestion");
    if (gQ && CONFIG.interactiveQuestion) gQ.textContent = CONFIG.interactiveQuestion.question;

    const yBtn = document.getElementById("yesBtnText");
    if (yBtn && CONFIG.interactiveQuestion) yBtn.textContent = CONFIG.interactiveQuestion.yesBtn;

    const nBtn = document.getElementById("noBtnText");
    if (nBtn && CONFIG.interactiveQuestion) nBtn.textContent = CONFIG.interactiveQuestion.noBtn;

    const mEmo = document.getElementById("modalEmoji");
    if (mEmo && CONFIG.interactiveQuestion) mEmo.textContent = CONFIG.interactiveQuestion.successEmoji;

    const mTit = document.getElementById("modalTitle");
    if (mTit && CONFIG.interactiveQuestion) mTit.textContent = CONFIG.interactiveQuestion.successTitle;

    const mMsg = document.getElementById("modalMessage");
    if (mMsg && CONFIG.interactiveQuestion) mMsg.textContent = CONFIG.interactiveQuestion.successMessage;

    const fText = document.getElementById("footerText");
    if (fText) fText.textContent = `${CONFIG.partnerName}, seninle her şey çok daha güzel.`;
}

// ==============================================================================
// ⏳ CANLI AŞK SAYACI (İLİŞKİ SÜRESİ)
// ==============================================================================
function initLoveTimer() {
    function parseSafeDate(dStr) {
        if (!dStr) return new Date("2023-10-14T20:00:00").getTime();
        let formatted = dStr.toString().replace(/ /g, "T");
        if (formatted.length === 10) formatted += "T00:00:00";
        const parsed = new Date(formatted).getTime();
        return isNaN(parsed) ? new Date("2023-10-14T20:00:00").getTime() : parsed;
    }

    const startDate = parseSafeDate(CONFIG.startDate);

    function updateTimer() {
        const now = new Date().getTime();
        const difference = now - startDate;

        if (isNaN(difference) || difference < 0) {
            const y = document.getElementById("years");
            const d = document.getElementById("days");
            const h = document.getElementById("hours");
            const m = document.getElementById("minutes");
            const s = document.getElementById("seconds");
            if (y) y.textContent = "0";
            if (d) d.textContent = "0";
            if (h) h.textContent = "0";
            if (m) m.textContent = "0";
            if (s) s.textContent = "0";
            return;
        }

        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        
        // Toplam gün ve yıl hesaplama
        const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        const years = Math.floor(totalDays / 365.25);
        const days = Math.floor(totalDays % 365.25);

        const yEl = document.getElementById("years");
        if (yEl) yEl.textContent = years;

        const dEl = document.getElementById("days");
        if (dEl) dEl.textContent = days;

        const hEl = document.getElementById("hours");
        if (hEl) hEl.textContent = hours < 10 ? '0' + hours : hours;

        const mEl = document.getElementById("minutes");
        if (mEl) mEl.textContent = minutes < 10 ? '0' + minutes : minutes;

        const sEl = document.getElementById("seconds");
        if (sEl) sEl.textContent = seconds < 10 ? '0' + seconds : seconds;
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

    const backupPhotos = [
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&auto=format&fit=crop&q=80"
    ];

    CONFIG.memories.forEach((mem, index) => {
        const fallbackImg = backupPhotos[index % backupPhotos.length];
        const card = document.createElement("div");
        card.className = "polaroid-card";
        card.innerHTML = `
            <div class="polaroid-pin"></div>
            <div class="polaroid-img-box">
                <img src="${mem.image || fallbackImg}" onerror="this.onerror=null; this.src='${fallbackImg}';" alt="${mem.title || 'Anı'}" loading="lazy">
            </div>
            <div class="polaroid-info">
                <span class="polaroid-date">${mem.date}</span>
                <p class="polaroid-caption">${mem.caption}</p>
            </div>
        `;

        card.addEventListener("click", () => {
            modalImagePreview.src = mem.image || fallbackImg;
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

// ==============================================================================
// 🪙 KAZI KAZAN SÜRPRİZ KART MOTORU (HTML5 CANVAS)
// ==============================================================================
function initScratchCard() {
    const canvas = document.getElementById("scratchCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let isDrawing = false;
    let isRevealed = false;

    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width || 340;
        canvas.height = rect.height || 180;
        drawCover();
    }

    function drawCover() {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, "#d4af37");
        grad.addColorStop(0.3, "#f3e5ab");
        grad.addColorStop(0.5, "#ff758c");
        grad.addColorStop(0.7, "#e8c39e");
        grad.addColorStop(1, "#b38728");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        for (let i = 0; i < 24; i++) {
            const x = (Math.sin(i * 99) * 0.5 + 0.5) * canvas.width;
            const y = (Math.cos(i * 33) * 0.5 + 0.5) * canvas.height;
            const r = (i % 3) + 1.5;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 17px 'Plus Jakarta Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 6;
        ctx.fillText("✨ Sürprizini Görmek İçin Kazı! ✨", canvas.width / 2, canvas.height / 2 - 10);

        ctx.font = "13px 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fillText("🪙 (Parmağınla veya farenle sürükle)", canvas.width / 2, canvas.height / 2 + 18);
        ctx.shadowBlur = 0;
    }

    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: (clientX - rect.left) * (canvas.width / rect.width),
            y: (clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    function scratch(e) {
        if (!isDrawing || isRevealed) return;
        if (e.cancelable) e.preventDefault();

        const pos = getPosition(e);
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
        ctx.fill();

        checkScratchedPercentage();
    }

    function checkScratchedPercentage() {
        if (isRevealed) return;
        try {
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imgData.data;
            let transparentCount = 0;
            const sampleRate = 32;

            for (let i = 3; i < pixels.length; i += sampleRate * 4) {
                if (pixels[i] === 0) transparentCount++;
            }

            const totalSampled = pixels.length / (sampleRate * 4);
            const percent = (transparentCount / totalSampled) * 100;

            if (percent > 40) {
                isRevealed = true;
                canvas.style.transition = "opacity 0.6s ease";
                canvas.style.opacity = "0";
                setTimeout(() => {
                    canvas.style.display = "none";
                }, 600);

                if (typeof confetti === "function") {
                    confetti({
                        particleCount: 70,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
                if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
            }
        } catch (err) {}
    }

    canvas.addEventListener("mousedown", (e) => { isDrawing = true; scratch(e); });
    window.addEventListener("mousemove", (e) => { if (isDrawing) scratch(e); });
    window.addEventListener("mouseup", () => { isDrawing = false; });

    canvas.addEventListener("touchstart", (e) => { isDrawing = true; scratch(e); }, { passive: false });
    window.addEventListener("touchmove", (e) => { if (isDrawing) scratch(e); }, { passive: false });
    window.addEventListener("touchend", () => { isDrawing = false; });

    setTimeout(resizeCanvas, 100);
    window.addEventListener("resize", resizeCanvas);
}
