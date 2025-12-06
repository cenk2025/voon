import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import './StoryReader.css';

const StoryReader = ({ story, language, onBack }) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [imageKey, setImageKey] = useState(Date.now());
    const [isSaving, setIsSaving] = useState(false);

    const currentPage = story.pages[pageIndex];
    const isDynamic = story.id !== 'rabbit-adventure';

    // UI Translations
    const uiText = {
        en: { back: "← Back to Library", newPic: "✨ New Pic", prev: "Previous", next: "Next", finish: "Finish", read: "▶ Read to Me", pause: "⏸ Pause", alert: "This story has special hand-drawn illustrations that can't be changed!", savePdf: "📥 Save as PDF", saving: "Saving..." },
        fi: { back: "← Takaisin", newPic: "✨ Uusi kuva", prev: "Edellinen", next: "Seuraava", finish: "Lopeta", read: "▶ Lue minulle", pause: "⏸ Tauko", alert: "Tässä tarinassa on erityisiä käsin piirrettyjä kuvia, joita ei voi muuttaa!", savePdf: "📥 Tallenna PDF", saving: "Tallennetaan..." },
        sv: { back: "← Tillbaka", newPic: "✨ Ny bild", prev: "Föregående", next: "Nästa", finish: "Avsluta", read: "▶ Läs för mig", pause: "⏸ Paus", alert: "Den här sagan har speciella handritade bilder som inte kan ändras!", savePdf: "📥 Spara som PDF", saving: "Sparar..." },
        tr: { back: "← Kütüphaneye Dön", newPic: "✨ Yeni Resim", prev: "Önceki", next: "Sonraki", finish: "Bitir", read: "▶ Bana Oku", pause: "⏸ Duraklat", alert: "Bu hikayenin değiştirilemeyen özel el çizimi resimleri var!", savePdf: "📥 PDF Olarak Kaydet", saving: "Kaydediliyor..." }
    };

    const t = uiText[language] || uiText.en;

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            speak(currentPage.text[language]);
        } else {
            window.speechSynthesis.cancel();
        }
    }, [pageIndex, isPlaying, language]);

    const speak = (text) => {
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
        if (!isDynamic) return page.image;
        return `${page.image}?seed=${imageKey}`;
    };

    const getDataUrl = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/jpeg'));
            };
            img.onerror = reject;
        });
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
            // Split title if too long
            const titleLines = doc.splitTextToSize(title, maxLineWidth);
            doc.text(titleLines, pageWidth / 2, 40, { align: 'center' });

            // Cover Image
            try {
                const coverData = await getDataUrl(story.cover);
                doc.addImage(coverData, 'JPEG', margin, 60, maxLineWidth, maxLineWidth);
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
                    const imgUrl = isDynamic ? `${page.image}?seed=${imageKey}` : page.image;
                    const imgData = await getDataUrl(imgUrl);
                    doc.addImage(imgData, 'JPEG', margin, 20, maxLineWidth, maxLineWidth);
                } catch (e) {
                    console.error("Error loading page image", e);
                }

                // Text
                doc.setFontSize(16);
                const textLines = doc.splitTextToSize(page.text[language], maxLineWidth);
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
                <div className="image-frame">
                    <img
                        key={`${pageIndex}-${imageKey}`}
                        src={getImageUrl(currentPage)}
                        alt="Story illustration"
                        className="story-image"
                    />
                    {isDynamic && (
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
