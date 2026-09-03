# 💖 Sana Özel Bir Sürpriz | Romantic Love Website & QR Generator

Çiftlere özel, tamamen kişiselleştirilebilir, mobil uyumlu ve interaktif romantik hediye web sitesi ve link/QR kod oluşturucu paneli.

Sevgilinize, eşinize veya partnerinize yıl dönümü, sevgililer günü ya da sadece içinizden geldiği için unutulmaz bir dijital sürpriz hazırlayın! ✨

---

## ✨ Öne Çıkan Özellikler

- ⏳ **Canlı Aşk Sayacı:** Birlikte geçirdiğiniz zamanı yıl, gün, saat, dakika ve salise bazında canlı olarak sayar.
- 🎵 **Spotify Entegrasyonu:** Özel şarkınızın Spotify linkini ekleyin; sayfada şık ve modern gömülü bir çalar olarak çalsın. *(İsteğe bağlı klasik romantik müzik desteği)*.
- 🪙 **Aşk Kazı Kazanı:** Parmağınızla veya farenizle kazınabilen rose-gold kaplamalı sürpriz kart! Kazındığında konfetiler patlar ve gizli aşk mesajınız açığa çıkar.
- 💌 **Daktilo Efektli Aşk Mektubu:** Sayfa mektup bölümüne kaydırıldığında daktilo sesi hissiyle harf harf yazılan nostaljik mektup. Mektup başlığı partnerinizin ismine göre otomatik güncellenir.
- 📸 **Polaroid Anı Tüneli:** En güzel 4 anınızı nostaljik mandallı Polaroid çerçevelerinde sergileyin. Tıklandığında büyüyen modal önizleme.
- 🏃‍♂️ **Kaçan "Hayır" Butonu:** *"Beni dünyalar kadar seviyor musun?"* sorusuna hayır dedirtmeyen, tıkladıkça kaçan muzip buton ve *"Evet"*e basınca patlayan konfeti yağmuru!
- 🎟️ **Aşk & Şımartma Kuponları:** *"Sınırsız Sarılma"*, *"Masaj"*, *"Film Gecesi"* gibi tıklandığında damgalanan interaktif aşk kuponları.
- ✨ **Seni Sevmemin Nedenleri:** Kalbinizden dökülen en tatlı maddeleri listeleyen romantik bölüm.
- 💖 **Uçuşan Kalpler:** Arka planda sürekli süzülen estetik kalpler ve ışıltılar.

---

## 🛠️ Panel & Link / QR Kod Üretici (`olustur.html`)

Sitenin yanında gelen yönetim paneli sayesinde hiçbir kodlama bilmeden dakikalar içinde kişiye özel sayfa oluşturabilirsiniz:

1. **`olustur.html`** sayfasına girin.
2. İsimlerinizi, ilişkinizin başlangıç tarihini ve özel mesajlarınızı yazın.
3. Varsa Spotify şarkı linkinizi ve fotoğraf bağlantılarınızı ekleyin.
4. **"Özel Linki ve QR Kodu Üret"** butonuna basın!
5. Sistem anında:
   - **📱 Anında Okunan HD QR Kod:** Düşük yoğunluklu, büyük pikselli yapısı sayesinde telefon kameraları 0.05 saniyede anında okur.
   - **⚡ Çift Katmanlı Zırhlı Link:** URL parametreleri sayesinde mobilde, WhatsApp'ta veya başka tarayıcılarda açıldığında **asla varsayılan şablona düşmez**, %100 girdiğiniz bilgilerle açılır.
   - **💬 Tek Tıkla WhatsApp Paylaşımı** ve **QR Kodu PNG Olarak İndirme** imkanı sunar.

---

## 🚀 Canlıya Alma (GitHub Pages)

1. Bu depoyu (repository) GitHub hesabınıza yükleyin.
2. Deponuzun **Settings (Ayarlar)** ➡️ **Pages** sekmesine gidin.
3. **Branch** kısmından `main` (veya `master`) dalını ve `/root` klasörünü seçip **Save** butonuna tıklayın.
4. 1-2 dakika içinde siteniz `https://kullaniciadi.github.io/depo-adi/` adresinde yayında olacaktır!
5. `https://kullaniciadi.github.io/depo-adi/olustur.html` adresinden dilediğiniz kadar farklı link ve QR kod üretebilirsiniz.

---

## 📂 Dosya Yapısı

```text
├── index.html       # Ziyaretçinin gördüğü ana romantik sürpriz sayfası (Tam entegre motor)
├── olustur.html      # Müşteri/Kullanıcı için özel link ve QR kod üretim paneli
├── style.css        # Cam efektli (Glassmorphism), modern ve duyarlı (responsive) tasarımlar
├── script.js        # İnteraktif oyun, sayaç, daktilo ve kazı kazan motoru
├── config.js        # Varsayılan şablon bilgileri
└── README.md        # Proje tanıtım ve kullanım kılavuzu
