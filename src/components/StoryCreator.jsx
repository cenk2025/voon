import React, { useState } from 'react';
import { generateStory } from '../utils/storyGenerator';
import './StoryCreator.css';

const StoryCreator = ({ language, onStoryCreated, onBack }) => {
    const [topic, setTopic] = useState('');
    const [hero, setHero] = useState('');
    const [length, setLength] = useState(5);
    const [isGenerating, setIsGenerating] = useState(false);
    const [storiesCreated, setStoriesCreated] = useState(0);

    const MAX_STORIES = 10;

    React.useEffect(() => {
        const count = parseInt(localStorage.getItem('storiesCreated') || '0', 10);
        setStoriesCreated(count);
    }, []);

    const uiText = {
        en: {
            title: "Create Your Own Story",
            topicLabel: "What is the story about?",
            topicPlaceholder: "e.g., Dinosaurs, Space, Magic Castle...",
            heroLabel: "Who is the main character?",
            heroPlaceholder: "e.g., Barnaby, Super Girl, Robo-Dog...",
            lengthLabel: "How many pages?",
            createBtn: "✨ Create Magic Story ✨",
            generating: "Writing your story...",
            back: "← Back",
            limitReached: "You have reached the daily limit of 10 stories!",
            storiesLeft: "stories left today"
        },
        fi: {
            title: "Luo Oma Tarina",
            topicLabel: "Mistä tarina kertoo?",
            topicPlaceholder: "esim. Dinosaurukset, Avaruus, Taikalinna...",
            heroLabel: "Kuka on päähenkilö?",
            heroPlaceholder: "esim. Barnaby, Supertyttö, Robo-Koira...",
            lengthLabel: "Kuinka monta sivua?",
            createBtn: "✨ Luo Taikatarina ✨",
            generating: "Kirjoitetaan tarinaa...",
            back: "← Takaisin",
            limitReached: "Olet saavuttanut 10 tarinan päivittäisen rajan!",
            storiesLeft: "tarinaa jäljellä tänään"
        },
        sv: {
            title: "Skapa Din Egen Saga",
            topicLabel: "Vad handlar sagan om?",
            topicPlaceholder: "t.ex. Dinosaurier, Rymden, Magiskt Slott...",
            heroLabel: "Vem är huvudpersonen?",
            heroPlaceholder: "t.ex. Barnaby, Supertjejen, Robo-Hund...",
            lengthLabel: "Hur många sidor?",
            createBtn: "✨ Skapa Magisk Saga ✨",
            generating: "Skriver din saga...",
            back: "← Tillbaka",
            limitReached: "Du har nått den dagliga gränsen på 10 sagor!",
            storiesLeft: "sagor kvar idag"
        },
        tr: {
            title: "Kendi Hikayeni Yarat",
            topicLabel: "Hikaye ne hakkında?",
            topicPlaceholder: "örn. Dinozorlar, Uzay, Büyülü Şato...",
            heroLabel: "Ana karakter kim?",
            heroPlaceholder: "örn. Barnaby, Süper Kız, Robo-Köpek...",
            lengthLabel: "Kaç sayfa?",
            createBtn: "✨ Büyülü Hikaye Yarat ✨",
            generating: "Hikayen yazılıyor...",
            back: "← Geri",
            limitReached: "Günlük 10 hikaye limitine ulaştın!",
            storiesLeft: "hikaye hakkın kaldı"
        }
    };

    const t = uiText[language] || uiText.en;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!topic || !hero) return;

        if (storiesCreated >= MAX_STORIES) {
            alert(t.limitReached);
            return;
        }

        setIsGenerating(true);

        // Simulate a small delay for "magic" effect
        setTimeout(() => {
            const newStory = generateStory(topic, hero, length);

            // Increment count
            const newCount = storiesCreated + 1;
            setStoriesCreated(newCount);
            localStorage.setItem('storiesCreated', newCount.toString());

            onStoryCreated(newStory);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="creator-container fade-in">
            <button className="btn btn-secondary back-btn" onClick={onBack}>
                {t.back}
            </button>

            <div className="creator-card">
                <h2 className="creator-title">{t.title}</h2>
                <div className="credit-counter" style={{ textAlign: 'center', marginBottom: '1rem', color: '#666' }}>
                    {MAX_STORIES - storiesCreated} {t.storiesLeft}
                </div>

                <form onSubmit={handleSubmit} className="creator-form">
                    <div className="form-group">
                        <label>{t.topicLabel}</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder={t.topicPlaceholder}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>{t.heroLabel}</label>
                        <input
                            type="text"
                            value={hero}
                            onChange={(e) => setHero(e.target.value)}
                            placeholder={t.heroPlaceholder}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>{t.lengthLabel} ({length})</label>
                        <input
                            type="range"
                            min="3"
                            max="10"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="form-range"
                        />
                        <div className="range-labels">
                            <span>3</span>
                            <span>10</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary create-btn"
                        disabled={isGenerating || storiesCreated >= MAX_STORIES}
                        style={{ opacity: storiesCreated >= MAX_STORIES ? 0.5 : 1 }}
                    >
                        {isGenerating ? t.generating : t.createBtn}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StoryCreator;
