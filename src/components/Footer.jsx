import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = ({ language, onNavigate }) => {
    const [showCookieBanner, setShowCookieBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowCookieBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowCookieBanner(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookieConsent', 'false');
        setShowCookieBanner(false);
    };

    const uiText = {
        en: {
            copyright: "© 2025 Story Magic. All rights reserved.",
            cookieText: "We use cookies to improve your experience. By using our site, you agree to our use of cookies.",
            accept: "Accept",
            reject: "Reject",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            productOf: "A product of"
        },
        fi: {
            copyright: "© 2025 Story Magic. Kaikki oikeudet pidätetään.",
            cookieText: "Käytämme evästeitä parantaaksemme käyttökokemustasi. Käyttämällä sivustoamme hyväksyt evästeiden käytön.",
            accept: "Hyväksy",
            reject: "Hylkää",
            privacy: "Tietosuojakäytäntö",
            terms: "Käyttöehdot",
            productOf: "Tuote:"
        },
        sv: {
            copyright: "© 2025 Story Magic. Alla rättigheter förbehållna.",
            cookieText: "Vi använder cookies för att förbättra din upplevelse. Genom att använda vår webbplats godkänner du vår användning av cookies.",
            accept: "Acceptera",
            reject: "Avvisa",
            privacy: "Integritetspolicy",
            terms: "Användarvillkor",
            productOf: "En produkt av"
        },
        tr: {
            copyright: "© 2025 Story Magic. Tüm hakları saklıdır.",
            cookieText: "Deneyiminizi geliştirmek için çerezleri kullanıyoruz. Sitemizi kullanarak çerez kullanımımızı kabul etmiş olursunuz.",
            accept: "Kabul Et",
            reject: "Reddet",
            privacy: "Gizlilik Politikası",
            terms: "Hizmet Şartları",
            productOf: "Bir ürünü:"
        }
    };

    const t = uiText[language] || uiText.en;

    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-left">
                        <p>{t.copyright}</p>
                        <p className="vooo-branding">
                            {t.productOf} <a href="https://voon.fi" target="_blank" rel="noopener noreferrer">VOOO AI</a>
                        </p>
                    </div>
                    <div className="footer-links">
                        <button className="link-btn" onClick={() => onNavigate('privacy')}>{t.privacy}</button>
                        <button className="link-btn" onClick={() => onNavigate('terms')}>{t.terms}</button>
                    </div>
                </div>
            </footer>

            {showCookieBanner && (
                <div className="cookie-banner fade-in">
                    <div className="cookie-content">
                        <p>{t.cookieText}</p>
                        <div className="cookie-buttons">
                            <button className="btn btn-secondary btn-sm" onClick={handleReject}>{t.reject}</button>
                            <button className="btn btn-primary btn-sm" onClick={handleAccept}>{t.accept}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;
