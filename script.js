// Original matnni o'qitish
document.getElementById('speak-original').addEventListener('click', () => {
    const text = document.getElementById('text-input').value.trim();
    if (!text) return alert("Matn yozing!");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'uz-UZ'; // original o'zbek tilida
    speechSynthesis.speak(utterance);
});

// Tarjima qilish
document.getElementById('translate-button').addEventListener('click', () => {
    const text = document.getElementById('text-input').value.trim();
    const targetLang = document.getElementById('language').value;

    if (!text) return alert("Avval matn kiriting!");

    fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: text,
            source: "uz", // bu yerda original til — o'zbek
            target: targetLang,
            format: "text"
        })
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('translated-text').value = data.translatedText;
        })
        .catch(err => {
            console.error(err);
            alert("Tarjimada xatolik bo‘ldi!");
        });
});

// Tarjima qilingan matnni o‘qitish
document.getElementById('speak-translated').addEventListener('click', () => {
    const translatedText = document.getElementById('translated-text').value.trim();
    const lang = document.getElementById('language').value;

    if (!translatedText) return alert("Tarjima hali yo‘q!");

    const langMap = {
        ru: 'ru-RU',
        en: 'en-US',
        uz: 'uz-UZ',
        de: 'de-DE',
        fr: 'fr-FR',
        tr: 'tr-TR',
        es: 'es-ES'
    };

    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = langMap[lang] || 'en-US';
    speechSynthesis.speak(utterance);
});
