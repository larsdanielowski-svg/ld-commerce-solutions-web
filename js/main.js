// Einfaches Script für mobile Navigation und Formular-Feedback

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle (Basis-Logik)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // In einer echten Implementierung würde man hier eine Klasse umschalten
            // und CSS nutzen, um das Menü anzuzeigen/zu verstecken
            alert('Mobil-Menü Logik: Hier würde das Menü ein/ausgeklappt werden.');
        });
    }

    // Kontaktformular Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simuliertes Senden
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Wird gesendet...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Vielen Dank! Ihre Nachricht wurde (simuliert) gesendet.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }

    // Smooth Scroll Offset (für den Fixed Header)
    window.addEventListener('hashchange', () => {
        const offset = 80;
        window.scrollBy(0, -offset);
    });
});
