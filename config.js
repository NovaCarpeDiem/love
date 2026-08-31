// ==============================================================================
// 💖 KİŞİYE ÖZEL AYARLAR / CUSTOM CONFIGURATION
// Müşteriye göre bu dosyayı kolayca değiştirebilirsin!
// ==============================================================================

const CONFIG = {
    // 👫 İsimler ve Başlıklar
    partnerName: "Ayşe'm",
    senderName: "Ali",
    coupleTitle: "Ali & Ayşe",
    subTitle: "Seninle geçen her saniye hayatımın en güzel anı...",
    
    // 📅 Tanışma / İlişki Başlangıç Tarihi (Yıl, Ay-1, Gün, Saat, Dakika)
    // Örnek: Yıl: 2023, Ay: 10 (Ekim için 9 yazılır çünkü aylar 0'dan başlar), Gün: 14, Saat: 20, Dakika: 0
    startDate: "2023-10-14T20:00:00",

    // 🎵 Bizim Şarkımız (Müzik Ayarları)
    // MP3 linki veya hazır telifsiz romantik müzik
    music: {
        title: "Bizim Şarkımız",
        artist: "Sana Özel Parçamız",
        url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-love-112199.mp3",
        autoPlayPrompt: "🎵 Şarkımızı dinlemek için ekrana tıkla ❤️"
    },

    // 💌 Aşk / Özür Mektubu (Daktilo ile yazılacak yazı)
    letter: {
        heading: "Benim Güzel Sevgilim,",
        body: `Hayatıma girdiğin andan itibaren her şey o kadar güzelleşti ki, bazen seni hak edecek ne yaptım diye düşünüyorum. 
Gülüşün, sesin, bana olan bakışın dünyadaki her şeye bedel. 

Bazen ufak tefek anlaşmazlıklar olsa da, bil ki kalbim her zaman sadece senin için atıyor. Seninle bir ömür el ele yürümek, her günü seninle paylaşmak en büyük hayalim. 

İyi ki varsın, iyi ki hayatımdasın. Seni her şeyden çok seviyorum! ❤️`
    },

    // 🏃‍♂️ Kaçan "Hayır" Butonu / İnteraktif Bölüm
    interactiveQuestion: {
        question: "Beni dünyalar kadar seviyor musun? (Ve tabii ki affettin mi?)",
        yesBtn: "Evet, Sonsuza Dek! ❤️",
        noBtn: "Hayır 😜",
        successEmoji: "🥰🎉💍",
        successTitle: "Biliyordum! Seni Çok Seviyorum!",
        successMessage: "Dünyanın en tatlı, en harika sevgilisi sensin. Artık kaçışın yok, hep benimlesin! ❤️✨"
    },

    // 📸 Polaroid Anı Fotoğrafları (İstediğin kadar ekleyebilirsin)
    memories: [
        {
            image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
            date: "İlk Buluştuğumuz Gün",
            caption: "Gözlerine ilk baktığım o an, kalbimin yerinden çıkacağını sanmıştım..."
        },
        {
            image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80",
            date: "Birlikte İlk Kahvemiz",
            caption: "Saatlerce konuşup zamanın nasıl geçtiğini hiç anlamamıştık."
        },
        {
            image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&auto=format&fit=crop&q=80",
            date: "Unutulmaz Gün Batımı",
            caption: "Gökyüzü ne kadar güzelse, senin yanındaki huzur bin kat daha fazlaydı."
        },
        {
            image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600&auto=format&fit=crop&q=80",
            date: "Her Anımızda Gülümseme",
            caption: "Birlikte saçmalamayı, çocuk gibi gülmeyi sadece seninle seviyorum."
        }
    ],

    // 🌟 Seni Sevmemin Nedenleri
    loveReasons: [
        "Gözlerinin içindeki o benzersiz sıcaklık ve ışık ✨",
        "Ne zaman canım sıkılsa bir gülüşünle beni neşelendirmen 😊",
        "Bana hissettirdiğin o eşsiz güven ve huzur duygusu 🏡",
        "En saçma şakalarıma bile benimle birlikte kahkaha atman 😂",
        "Beni her halimle kabul edip her gün daha iyi biri olmamı sağlaman 💖",
        "Birlikte kurduğumuz o güzel gelecek hayalleri ✈️"
    ],

    // 🎟️ Sevgi Kuponları (Tıklayınca 'Kullanıldı' olur!)
    coupons: [
        {
            icon: "🫂",
            title: "Sınırsız Sarılma Kuponu",
            desc: "İstediğin an ve yerde geçerli, 7/24 koşulsuz sıcacık bir sarılma."
        },
        {
            icon: "☕",
            title: "Kahve & Tatlı Ismarlama",
            desc: "En sevdiğin kafede istediğin tatlı ve kahve benden!"
        },
        {
            icon: "🎬",
            title: "Film & Dizi Gecesi",
            desc: "Filmi, diziyi ve tüm atıştırmalıkları tamamen sen seçiyorsun."
        },
        {
            icon: "🕊️",
            title: "1 Günlük Trip Muafiyeti",
            desc: "Bu kupon sunulduğunda tüm anlaşmazlıklar anında tatlıya bağlanır :)"
        },
        {
            icon: "💆‍♀️",
            title: "Ayak & Omuz Masajı",
            desc: "Yorucu bir günün ardından 30 dakikalık özel rahatlama seansı."
        },
        {
            icon: "🍕",
            title: "Gece Yarısı Kaçamağı",
            desc: "Saat kaç olursa olsun en sevdiğin yemeği söyleme hakkı!"
        }
    ]
};
