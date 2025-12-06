import React, { useState } from 'react';
import { stories } from './data/stories';
import StoryReader from './components/StoryReader';
import StoryCreator from './components/StoryCreator';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentStory, setCurrentStory] = useState(null);
  const [view, setView] = useState('home'); // 'home', 'create', 'privacy', 'terms'
  const [language, setLanguage] = useState('fi');

  // UI Translations for the main screen
  const uiText = {
    en: {
      welcome: "Pick a story and let's read!",
      readNow: "Read Now",
      createTitle: "Create Your Own",
      createDesc: "Type a story and watch the magic happen!",
      comingSoon: "Coming Soon",
      createBtn: "Create Now"
    },
    fi: {
      welcome: "Valitse tarina ja luetaan!",
      readNow: "Lue nyt",
      createTitle: "Luo oma",
      createDesc: "Kirjoita tarina ja katso taikaa!",
      comingSoon: "Tulossa pian",
      createBtn: "Luo Nyt"
    },
    sv: {
      welcome: "Välj en saga och låt oss läsa!",
      readNow: "Läs nu",
      createTitle: "Skapa din egen",
      createDesc: "Skriv en saga och se magin hända!",
      comingSoon: "Kommer snart",
      createBtn: "Skapa Nu"
    },
    tr: {
      welcome: "Bir hikaye seç ve okuyalım!",
      readNow: "Şimdi Oku",
      createTitle: "Kendi Hikayeni Yarat",
      createDesc: "Bir hikaye yaz ve sihri izle!",
      comingSoon: "Çok Yakında",
      createBtn: "Şimdi Yarat"
    }
  };

  const t = uiText[language] || uiText.en;

  const handleStoryCreated = (newStory) => {
    setCurrentStory(newStory);
    setView('home');
  };

  const renderContent = () => {
    if (currentStory) {
      return (
        <StoryReader
          story={currentStory}
          language={language}
          onBack={() => setCurrentStory(null)}
        />
      );
    }

    switch (view) {
      case 'create':
        return (
          <StoryCreator
            language={language}
            onStoryCreated={handleStoryCreated}
            onBack={() => setView('home')}
          />
        );
      case 'privacy':
        return (
          <PrivacyPolicy
            language={language}
            onBack={() => setView('home')}
          />
        );
      case 'terms':
        return (
          <TermsOfService
            language={language}
            onBack={() => setView('home')}
          />
        );
      default:
        return (
          <div className="library fade-in">
            <div className="mascot-container">
              <img src="/mascot.png" alt="Wise Owl" className="mascot pulse" />
              <div className="speech-bubble">
                {t.welcome}
              </div>
            </div>

            <div className="story-grid">
              {stories.map(story => (
                <div key={story.id} className="card story-card" onClick={() => setCurrentStory(story)}>
                  <div className="card-image-wrapper">
                    <img src={story.cover} alt={story.title[language]} className="card-image" />
                  </div>
                  <div className="card-content">
                    <h3>{story.title[language]}</h3>
                    <p>{story.description[language]}</p>
                    <button className="btn btn-primary start-btn">{t.readNow}</button>
                  </div>
                </div>
              ))}

              {/* Create Your Own Card */}
              <div className="card story-card create-card" onClick={() => setView('create')}>
                <div className="card-content centered">
                  <span className="icon">🎨</span>
                  <h3>{t.createTitle}</h3>
                  <p>{t.createDesc}</p>
                  <button className="btn btn-secondary">{t.createBtn}</button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">✨ Story Magic ✨</h1>
        <div className="language-selector">
          <button
            className={`lang-btn ${language === 'fi' ? 'active' : ''}`}
            onClick={() => setLanguage('fi')}
          >
            🇫🇮 Suomi
          </button>
          <button
            className={`lang-btn ${language === 'sv' ? 'active' : ''}`}
            onClick={() => setLanguage('sv')}
          >
            🇸🇪 Svenska
          </button>
          <button
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            🇺🇸 English
          </button>
          <button
            className={`lang-btn ${language === 'tr' ? 'active' : ''}`}
            onClick={() => setLanguage('tr')}
          >
            🇹🇷 Türkçe
          </button>
        </div>
      </header>

      <main className="main-content">
        {renderContent()}
      </main>

      <Footer language={language} onNavigate={setView} />
    </div>
  );
}

export default App;
