import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import './StoryReader.css';

const StoryReader = ({ story, language, onBack }) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [imageKey, setImageKey] = useState(Date.now());
    const [isSaving, setIsSaving] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const currentPage = story.pages[pageIndex];
    const isDynamic = story.id !== 'rabbit-adventure';

    // UI Translations
    const uiText = {
        en: { back: "← Back to Library", newPic: "✨ New Pic", prev: "Previous", next: "Next", finish: "Finish", read: "▶ Read to Me", pause: "⏸ Pause", alert: "This story has special hand-drawn illustrations that can't be changed!", savePdf: "📥 Save as PDF", saving: "Saving...", loading: "Loading image..." },
        fi: { back: "← Takaisin", newPic: "✨ Uusi kuva", prev: "Edellinen", next: "Seuraava", finish: "Lopeta", read: "▶ Lue minulle", pause: "⏸ Tauko", alert: "Tässä tarinassa on erityisiä käsin piirrettyjä kuvia, joita ei voi muuttaa!", savePdf: "📥 Tallenna PDF", saving: "Tallennetaan...", loading: "Ladataan kuvaa..." },
        sv: { back: "← Tillbaka", newPic: "✨ Ny bild", prev: "Föregående", next: "Nästa", finish: "Avsluta", read: "▶ Läs för mig", pause: "⏸ Paus", alert: "Den här sagan har speciella handritade bilder som inte kan ändras!", savePdf: "📥 Spara som PDF", saving: "Sparar...", loading: "Laddar bild..." },
        tr: { back: "← Kütüphaneye Dön", newPic: "✨ Yeni Resim", prev: "Önceki", next: "Sonraki", finish: "Bitir", read: "▶ Bana Oku", pause: "⏸ Duraklat", alert: "Bu hikayenin değiştirilemeyen özel el çizimi resimleri var!", savePdf: "📥 PDF Olarak Kaydet", saving: "Kaydediliyor...", loading: "Resim yükleniyor..." }
    };

    const t = uiText[language] || uiText.en;

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    useEffect(() => {
        setIsImageLoading(true);
        if (isPlaying) {
            speak(currentPage.text[language]);
        } else {
            window.speechSynthesis.cancel();
        }
    }, [pageIndex, isPlaying, language, imageKey]);

    const speak = (text) => {
        // ... existing speak code ...
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;

        // Set language for TTS
        const langMap = { en: 'en-US', fi: 'fi-FI', sv: 'sv-SE', tr: 'tr-TR' };
        utterance.lang = langMap[language] || 'en-US';

        // Try to find a matching voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith(utterance.lang));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => {
            setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
    };

    const handleNext = () => {
        if (pageIndex < story.pages.length - 1) {
            setPageIndex(pageIndex + 1);
            setIsPlaying(true);
        } else {
            onBack();
        }
    };

    const handlePrev = () => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
            setIsPlaying(true);
        }
    };

    const handleRegenerateImage = () => {
        if (isDynamic) {
            setImageKey(Date.now());
        } else {
            alert(t.alert);
        }
    };

    const getImageUrl = (page) => {
        // Handle local images (starting with /)
        if (page.image.startsWith('/')) {
            // Remove leading slash to avoid double slashes if BASE_URL ends with /
            const imagePath = page.image.substring(1);
            // Ensure proper base URL handling
            const baseUrl = import.meta.env.BASE_URL.endsWith('/')
                ? import.meta.env.BASE_URL
                : `${import.meta.env.BASE_URL}/`;
            return `${baseUrl}${imagePath}`;
        }

        if (!isDynamic) return page.image;

        if (page.image.includes('pollinations.ai')) {
            const baseUrl = page.image.split('?')[0];
            // Ensure high reliability parameters
            return `${baseUrl}?seed=${imageKey}&width=1024&height=1024&nologo=true&model=flux`;
        }
        return `${page.image}?seed=${imageKey}`;
    };

    const getDataUrl = async (url) => {
        try {
            // Resolve local paths for fetch just like in getImageUrl
            let fetchUrl = url;
            if (url.startsWith('/')) {
                const imagePath = url.substring(1);
                const baseUrl = import.meta.env.BASE_URL.endsWith('/')
                    ? import.meta.env.BASE_URL
                    : `${import.meta.env.BASE_URL}/`;
                fetchUrl = `${baseUrl}${imagePath}`;
            }

            const response = await fetch(fetchUrl, {
                mode: 'cors',
                cache: 'force-cache' // Try to use cached version if available
            });

            if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);

            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error fetching image for PDF:", error, url);
            // Fallback: Return a simple placeholder or null
            return null;
        }
    };

    const handleSavePDF = async () => {
        setIsSaving(true);
        try {
            const doc = new jsPDF();
            const margin = 20;
            const pageWidth = doc.internal.pageSize.getWidth();
            const maxLineWidth = pageWidth - margin * 2;

            // Title Page
            doc.setFontSize(24);
            const title = story.title[language];
            const titleLines = doc.splitTextToSize(title, maxLineWidth);
            doc.text(titleLines, pageWidth / 2, 40, { align: 'center' });

            // Cover Image
            try {
                // Determine cover URL. If it's a relative path, use it. If it's external, use it.
                // For dynamic stories, cover might need a seed too if we wanted it to match, but covers are usually fixed in data/stories.js or generated in storyGenerator.
                // We'll just use the cover string as is.
                const coverUrl = story.cover;
                const coverData = await getDataUrl(coverUrl);
                if (coverData) {
                    doc.addImage(coverData, 'JPEG', margin, 60, maxLineWidth, maxLineWidth);
                }
            } catch (e) {
                console.error("Error loading cover", e);
            }

            doc.addPage();

            // Pages
            for (let i = 0; i < story.pages.length; i++) {
                if (i > 0) doc.addPage();
                const page = story.pages[i];

                // Image
                try {
                    // Reconstruct the exact URL being shown
                    let imgUrl = page.image;
                    if (isDynamic) {
                        if (imgUrl.includes('pollinations.ai')) {
                            const baseUrl = imgUrl.split('?')[0];
                            imgUrl = `${baseUrl}?seed=${imageKey}&width=1024&height=1024&nologo=true`;
                        } else {
                            imgUrl = `${imgUrl}?seed=${imageKey}`;
                        }
                    }

                    const imgData = await getDataUrl(imgUrl);
                    if (imgData) {
                        doc.addImage(imgData, 'JPEG', margin, 20, maxLineWidth, maxLineWidth);
                    }
                } catch (e) {
                    console.error("Error loading page image", e);
                }

                // Text
                doc.setFontSize(16);
                const textLines = doc.splitTextToSize(page.text[language], maxLineWidth);
                // Adjust Y position based on image usage, here we assume image is always there or we leave space
                doc.text(textLines, margin, 20 + maxLineWidth + 20);

                // Page number
                doc.setFontSize(10);
                doc.text(`${i + 1}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
            }

            doc.save(`${story.title[language]}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const currentImageUrl = getImageUrl(currentPage);

    return (
        <div className="reader-container fade-in">
            <div className="reader-header">
                <button className="btn btn-secondary back-btn" onClick={onBack}>
                    {t.back}
                </button>
                <button className="btn btn-primary save-btn" onClick={handleSavePDF} disabled={isSaving}>
                    {isSaving ? t.saving : t.savePdf}
                </button>
            </div>

            <div className="story-content">
                <div className="image-frame" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
                    {isImageLoading && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                            <p>{t.loading}</p>
                        </div>
                    )}
                    <img
                        key={`${pageIndex}-${imageKey}`}
                        src={currentImageUrl}
                        alt="Story illustration"
                        className="story-image"
                        onLoad={() => setIsImageLoading(false)}
                        onError={() => setIsImageLoading(false)}
                        style={{ display: isImageLoading ? 'none' : 'block' }}
                    />
                    {isDynamic && !isImageLoading && (
                        <button className="btn btn-primary magic-btn" onClick={handleRegenerateImage} title={t.newPic}>
                            {t.newPic}
                        </button>
                    )}
                </div>

                <div className="text-area">
                    <p className="story-text">{currentPage.text[language]}</p>

                    <div className="controls">
                        <button className="btn btn-secondary" onClick={handlePrev} disabled={pageIndex === 0}>
                            {t.prev}
                        </button>

                        <button className="btn btn-primary play-btn" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? t.pause : t.read}
                        </button>

                        <button className="btn btn-secondary" onClick={handleNext}>
                            {pageIndex === story.pages.length - 1 ? t.finish : t.next}
                        </button>
                    </div>
                </div>
            </div>

            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${((pageIndex + 1) / story.pages.length) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default StoryReader;
