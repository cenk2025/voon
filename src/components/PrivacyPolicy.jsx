import React from 'react';
import './LegalPages.css';

const PrivacyPolicy = ({ language, onBack }) => {
    const content = {
        en: {
            title: "Privacy Policy",
            lastUpdated: "Last Updated: November 22, 2025",
            sections: [
                {
                    heading: "1. Controller",
                    text: "VOOO AI\nWebsite: voon.fi\nContact: contact@voon.fi"
                },
                {
                    heading: "2. Purpose of Data Processing",
                    text: "We process personal data to provide the Story Magic application services, including story generation and reading features. The processing is based on your consent and our legitimate interest to maintain and improve our services."
                },
                {
                    heading: "3. Data We Collect",
                    text: "We may collect the following information:\n- Technical data (IP address, browser type)\n- Usage data (stories read, features used)\n- Cookies and local storage data (for preferences like language and cookie consent)"
                },
                {
                    heading: "4. Cookies",
                    text: "We use cookies to ensure the best experience on our website. You can manage your cookie preferences through the cookie banner or your browser settings."
                },
                {
                    heading: "5. Your Rights",
                    text: "Under the GDPR and Finnish Data Protection Act, you have the right to:\n- Access your data\n- Correct inaccurate data\n- Request deletion of your data\n- Withdraw consent at any time"
                },
                {
                    heading: "6. Third-Party Services",
                    text: "We use trusted third-party services for image generation (Pollinations.ai) and other functionalities. These providers process data in accordance with their own privacy policies."
                }
            ],
            back: "← Back to App"
        },
        fi: {
            title: "Tietosuojaseloste",
            lastUpdated: "Päivitetty: 22. marraskuuta 2025",
            sections: [
                {
                    heading: "1. Rekisterinpitäjä",
                    text: "VOOO AI\nVerkkosivusto: voon.fi\nYhteystiedot: contact@voon.fi"
                },
                {
                    heading: "2. Henkilötietojen käsittelyn tarkoitus",
                    text: "Käsittelemme henkilötietoja tarjotaksemme Story Magic -sovelluksen palveluita, mukaan lukien tarinoiden luonti- ja lukuominaisuudet. Käsittely perustuu suostumukseesi ja oikeutettuun etuumme ylläpitää ja parantaa palveluitamme."
                },
                {
                    heading: "3. Kerättävät tiedot",
                    text: "Saatamme kerätä seuraavia tietoja:\n- Tekniset tiedot (IP-osoite, selaimen tyyppi)\n- Käyttötiedot (luetut tarinat, käytetyt ominaisuudet)\n- Evästeet ja paikallinen tallennus (asetuksia varten, kuten kieli ja evästesuostumus)"
                },
                {
                    heading: "4. Evästeet",
                    text: "Käytämme evästeitä varmistaaksemme parhaan käyttökokemuksen sivustollamme. Voit hallita evästeasetuksiasi evästebannerin tai selaimesi asetusten kautta."
                },
                {
                    heading: "5. Oikeutesi",
                    text: "GDPR:n ja Suomen tietosuojalain mukaisesti sinulla on oikeus:\n- Tarkastaa tietosi\n- Oikaista virheelliset tiedot\n- Pyytää tietojesi poistamista\n- Peruuttaa suostumus milloin tahansa"
                },
                {
                    heading: "6. Kolmannen osapuolen palvelut",
                    text: "Käytämme luotettavia kolmannen osapuolen palveluita kuvien luomiseen (Pollinations.ai) ja muihin toimintoihin. Nämä palveluntarjoajat käsittelevät tietoja omien tietosuojakäytäntöjensä mukaisesti."
                }
            ],
            back: "← Takaisin sovellukseen"
        },
        sv: {
            title: "Integritetspolicy",
            lastUpdated: "Senast uppdaterad: 22 november 2025",
            sections: [
                {
                    heading: "1. Personuppgiftsansvarig",
                    text: "VOOO AI\nWebbplats: voon.fi\nKontakt: contact@voon.fi"
                },
                {
                    heading: "2. Syfte med databehandling",
                    text: "Vi behandlar personuppgifter för att tillhandahålla tjänsterna i Story Magic-applikationen, inklusive funktioner för att skapa och läsa sagor. Behandlingen baseras på ditt samtycke och vårt berättigade intresse av att upprätthålla och förbättra våra tjänster."
                },
                {
                    heading: "3. Data vi samlar in",
                    text: "Vi kan samla in följande information:\n- Tekniska data (IP-adress, webbläsartyp)\n- Användningsdata (lästa sagor, använda funktioner)\n- Cookies och lokal lagring (för inställningar som språk och cookie-samtycke)"
                },
                {
                    heading: "4. Cookies",
                    text: "Vi använder cookies för att säkerställa den bästa upplevelsen på vår webbplats. Du kan hantera dina cookie-inställningar via cookie-bannern eller din webbläsares inställningar."
                },
                {
                    heading: "5. Dina rättigheter",
                    text: "Enligt GDPR och finsk dataskyddslag har du rätt att:\n- Få tillgång till dina uppgifter\n- Korrigera felaktiga uppgifter\n- Begära radering av dina uppgifter\n- Återkalla samtycke när som helst"
                },
                {
                    heading: "6. Tredjepartstjänster",
                    text: "Vi använder pålitliga tredjepartstjänster för bildgenerering (Pollinations.ai) och andra funktioner. Dessa leverantörer behandlar data i enlighet med sina egna integritetspolicyer."
                }
            ],
            back: "← Tillbaka till appen"
        },
        tr: {
            title: "Gizlilik Politikası",
            lastUpdated: "Son Güncelleme: 22 Kasım 2025",
            sections: [
                {
                    heading: "1. Veri Sorumlusu",
                    text: "VOOO AI\nWeb sitesi: voon.fi\nİletişim: contact@voon.fi"
                },
                {
                    heading: "2. Veri İşleme Amacı",
                    text: "Kişisel verileri, hikaye oluşturma ve okuma özellikleri dahil olmak üzere Story Magic uygulama hizmetlerini sağlamak için işliyoruz. İşleme, rızanıza ve hizmetlerimizi sürdürme ve iyileştirme meşru menfaatimize dayanmaktadır."
                },
                {
                    heading: "3. Topladığımız Veriler",
                    text: "Aşağıdaki bilgileri toplayabiliriz:\n- Teknik veriler (IP adresi, tarayıcı türü)\n- Kullanım verileri (okunan hikayeler, kullanılan özellikler)\n- Çerezler ve yerel depolama verileri (dil ve çerez onayı gibi tercihler için)"
                },
                {
                    heading: "4. Çerezler",
                    text: "Web sitemizde en iyi deneyimi sağlamak için çerezleri kullanıyoruz. Çerez tercihlerinizi çerez banner'ı veya tarayıcı ayarlarınız aracılığıyla yönetebilirsiniz."
                },
                {
                    heading: "5. Haklarınız",
                    text: "GDPR ve Finlandiya Veri Koruma Yasası kapsamında şu haklara sahipsiniz:\n- Verilerinize erişme\n- Hatalı verileri düzeltme\n- Verilerinizin silinmesini talep etme\n- İstediğiniz zaman rızanızı geri çekme"
                },
                {
                    heading: "6. Üçüncü Taraf Hizmetleri",
                    text: "Görüntü oluşturma (Pollinations.ai) ve diğer işlevler için güvenilir üçüncü taraf hizmetleri kullanıyoruz. Bu sağlayıcılar, verileri kendi gizlilik politikalarına uygun olarak işler."
                }
            ],
            back: "← Uygulamaya Dön"
        }
    };

    const t = content[language] || content.en;

    return (
        <div className="legal-page fade-in">
            <button className="btn btn-secondary back-btn" onClick={onBack}>
                {t.back}
            </button>
            <div className="legal-content">
                <h1>{t.title}</h1>
                <p className="last-updated">{t.lastUpdated}</p>
                {t.sections.map((section, index) => (
                    <div key={index} className="legal-section">
                        <h2>{section.heading}</h2>
                        <p>{section.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrivacyPolicy;
