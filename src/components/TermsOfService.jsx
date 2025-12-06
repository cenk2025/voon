import React from 'react';
import './LegalPages.css';

const TermsOfService = ({ language, onBack }) => {
    const content = {
        en: {
            title: "Terms of Service",
            lastUpdated: "Last Updated: November 22, 2025",
            sections: [
                {
                    heading: "1. Acceptance of Terms",
                    text: "By accessing and using Story Magic, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our application."
                },
                {
                    heading: "2. Use of the Application",
                    text: "Story Magic is designed for children and families. Users agree to use the application only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the application."
                },
                {
                    heading: "3. Intellectual Property",
                    text: "All content, features, and functionality of Story Magic are owned by VOOO AI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws."
                },
                {
                    heading: "4. User-Generated Content",
                    text: "When using the 'Create Your Own Story' feature, you agree not to generate content that is offensive, harmful, or inappropriate for children. We reserve the right to remove any content that violates these terms."
                },
                {
                    heading: "5. Disclaimer",
                    text: "The application is provided on an 'as is' and 'as available' basis. VOOO AI makes no warranties, expressed or implied, regarding the operation of the application or the information, content, or materials included therein."
                },
                {
                    heading: "6. Governing Law",
                    text: "These terms shall be governed by and construed in accordance with the laws of Finland, without regard to its conflict of law provisions."
                },
                {
                    heading: "7. Contact Information",
                    text: "For any questions about these Terms, please contact us at contact@voon.fi."
                }
            ],
            back: "← Back to App"
        },
        fi: {
            title: "Käyttöehdot",
            lastUpdated: "Päivitetty: 22. marraskuuta 2025",
            sections: [
                {
                    heading: "1. Ehtojen hyväksyminen",
                    text: "Käyttämällä Story Magic -sovellusta sitoudut noudattamaan näitä käyttöehtoja. Jos et hyväksy näitä ehtoja, älä käytä sovellustamme."
                },
                {
                    heading: "2. Sovelluksen käyttö",
                    text: "Story Magic on suunniteltu lapsille ja perheille. Käyttäjät sitoutuvat käyttämään sovellusta vain laillisiin tarkoituksiin ja tavalla, joka ei loukkaa muiden oikeuksia tai rajoita muiden sovelluksen käyttöä."
                },
                {
                    heading: "3. Immateriaalioikeudet",
                    text: "Kaikki Story Magicin sisältö, ominaisuudet ja toiminnot ovat VOOO AI:n omaisuutta ja niitä suojaavat kansainväliset tekijänoikeus-, tavaramerkki-, patentti-, liikesalaisuus- ja muut immateriaalioikeuslait."
                },
                {
                    heading: "4. Käyttäjän luoma sisältö",
                    text: "Käyttäessäsi 'Luo oma tarina' -ominaisuutta sitoudut olemaan luomatta sisältöä, joka on loukkaavaa, haitallista tai lapsille sopimatonta. Pidätämme oikeuden poistaa sisällön, joka rikkoo näitä ehtoja."
                },
                {
                    heading: "5. Vastuunrajoitus",
                    text: "Sovellus tarjotaan 'sellaisena kuin se on' ja 'saatavuuden mukaan'. VOOO AI ei anna mitään nimenomaisia tai oletettuja takuita sovelluksen toiminnasta tai sen sisältämistä tiedoista tai materiaaleista."
                },
                {
                    heading: "6. Sovellettava laki",
                    text: "Näihin ehtoihin sovelletaan Suomen lakia, ottamatta huomioon sen lainvalintasäännöksiä."
                },
                {
                    heading: "7. Yhteystiedot",
                    text: "Jos sinulla on kysyttävää näistä ehdoista, ota meihin yhteyttä osoitteessa contact@voon.fi."
                }
            ],
            back: "← Takaisin sovellukseen"
        },
        sv: {
            title: "Användarvillkor",
            lastUpdated: "Senast uppdaterad: 22 november 2025",
            sections: [
                {
                    heading: "1. Godkännande av villkor",
                    text: "Genom att använda Story Magic godkänner du att vara bunden av dessa användarvillkor. Om du inte godkänner dessa villkor, vänligen använd inte vår applikation."
                },
                {
                    heading: "2. Användning av applikationen",
                    text: "Story Magic är utformad för barn och familjer. Användare samtycker till att använda applikationen endast för lagliga ändamål och på ett sätt som inte inkräktar på andras rättigheter eller begränsar andras användning av applikationen."
                },
                {
                    heading: "3. Immateriella rättigheter",
                    text: "Allt innehåll, funktioner och funktionalitet i Story Magic ägs av VOOO AI och skyddas av internationella lagar om upphovsrätt, varumärken, patent, företagshemligheter och andra immateriella rättigheter."
                },
                {
                    heading: "4. Användargenererat innehåll",
                    text: "När du använder funktionen 'Skapa din egen saga' samtycker du till att inte generera innehåll som är stötande, skadligt eller olämpligt för barn. Vi förbehåller oss rätten att ta bort innehåll som bryter mot dessa villkor."
                },
                {
                    heading: "5. Ansvarsfriskrivning",
                    text: "Applikationen tillhandahålls i befintligt skick. VOOO AI lämnar inga garantier, uttryckliga eller underförstådda, gällande applikationens drift eller informationen, innehållet eller materialet som ingår däri."
                },
                {
                    heading: "6. Tillämplig lag",
                    text: "Dessa villkor ska styras av och tolkas i enlighet med Finlands lagar, utan hänsyn till dess lagvalsregler."
                },
                {
                    heading: "7. Kontaktinformation",
                    text: "För frågor om dessa villkor, vänligen kontakta oss på contact@voon.fi."
                }
            ],
            back: "← Tillbaka till appen"
        },
        tr: {
            title: "Hizmet Şartları",
            lastUpdated: "Son Güncelleme: 22 Kasım 2025",
            sections: [
                {
                    heading: "1. Şartların Kabulü",
                    text: "Story Magic'i kullanarak bu Hizmet Şartlarına uymayı kabul edersiniz. Bu şartları kabul etmiyorsanız, lütfen uygulamamızı kullanmayın."
                },
                {
                    heading: "2. Uygulamanın Kullanımı",
                    text: "Story Magic çocuklar ve aileler için tasarlanmıştır. Kullanıcılar, uygulamayı yalnızca yasal amaçlarla ve başkalarının haklarını ihlal etmeyecek veya kullanımını kısıtlamayacak şekilde kullanmayı kabul eder."
                },
                {
                    heading: "3. Fikri Mülkiyet",
                    text: "Story Magic'in tüm içeriği, özellikleri ve işlevselliği VOOO AI'ye aittir ve uluslararası telif hakkı, ticari marka, patent, ticari sır ve diğer fikri mülkiyet yasalarıyla korunmaktadır."
                },
                {
                    heading: "4. Kullanıcı Tarafından Oluşturulan İçerik",
                    text: "'Kendi Hikayeni Yarat' özelliğini kullanırken, saldırgan, zararlı veya çocuklar için uygunsuz içerik oluşturmamayı kabul edersiniz. Bu şartları ihlal eden içeriği kaldırma hakkımızı saklı tutarız."
                },
                {
                    heading: "5. Sorumluluk Reddi",
                    text: "Uygulama 'olduğu gibi' ve 'mevcut olduğu şekilde' sağlanmaktadır. VOOO AI, uygulamanın işleyişi veya içerdiği bilgiler, içerik veya materyallerle ilgili açık veya zımni hiçbir garanti vermez."
                },
                {
                    heading: "6. Geçerli Hukuk",
                    text: "Bu şartlar, kanunlar ihtilafı hükümlerine bakılmaksızın Finlandiya yasalarına göre yönetilecek ve yorumlanacaktır."
                },
                {
                    heading: "7. İletişim Bilgileri",
                    text: "Bu Şartlar hakkında sorularınız için lütfen contact@voon.fi adresinden bizimle iletişime geçin."
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

export default TermsOfService;
