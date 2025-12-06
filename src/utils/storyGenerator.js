// Simple template-based story generator
// In a real app, this would call an LLM API (like OpenAI or Gemini)

const translations = {
    en: {
        intro: (hero, topic) => `Once upon a time, there was a brave hero named ${hero}. Today, ${hero} was going on a special adventure to explore ${topic}.`,
        middle: (hero, topic, action) => `While exploring ${topic}, ${hero} ${action}. It was so exciting!`,
        ending: (hero, topic) => `After a long day of fun, ${hero} was tired but happy. "I love ${topic}!" said ${hero}. It was the best adventure ever.`,
        title: (hero, topic) => `${hero}'s Adventure in ${topic}`,
        desc: (hero, topic) => `A unique story about ${hero} and ${topic}.`,
        actions: [
            "found a mysterious glowing object",
            "met a friendly creature who wanted to play",
            "had to solve a tricky puzzle",
            "climbed a giant mountain to see the view",
            "discovered a secret hidden path",
            "helped a lost friend find their way home",
            "flew high into the sky",
            "swam deep under the water"
        ]
    },
    fi: {
        intro: (hero, topic) => `Olipa kerran rohkea sankari nimeltä ${hero}. Tänään ${hero} lähti erityiseen seikkailuun tutkimaan aihetta ${topic}.`,
        middle: (hero, topic, action) => `Tutkiessaan aihetta ${topic}, ${hero} ${action}. Se oli niin jännittävää!`,
        ending: (hero, topic) => `Pitkän ja hauskan päivän jälkeen ${hero} oli väsynyt mutta onnellinen. "Rakastan aihetta ${topic}!" sanoi ${hero}. Se oli paras seikkailu ikinä.`,
        title: (hero, topic) => `Sankarin ${hero} seikkailu: ${topic}`,
        desc: (hero, topic) => `Ainutlaatuinen tarina sankarista ${hero} ja aiheesta ${topic}.`,
        actions: [
            "löysi salaperäisen hehkuvan esineen",
            "tapasi ystävällisen olennon, joka halusi leikkiä",
            "joutui ratkaisemaan kinkkisen palapelin",
            "kiipesi jättimäiselle vuorelle katsomaan maisemia",
            "löysi salaisen piilotetun polun",
            "auttoi eksynyttä ystävää löytämään kotiin",
            "lensi korkealle taivaalle",
            "ui syvälle veden alle"
        ]
    },
    sv: {
        intro: (hero, topic) => `Det var en gång en modig hjälte som hette ${hero}. Idag skulle ${hero} ut på ett speciellt äventyr för att utforska ${topic}.`,
        middle: (hero, topic, action) => `Medan hen utforskade ${topic}, ${hero} ${action}. Det var så spännande!`,
        ending: (hero, topic) => `Efter en lång dag av skoj var ${hero} trött men lycklig. "Jag älskar ${topic}!" sa ${hero}. Det var det bästa äventyret någonsin.`,
        title: (hero, topic) => `${hero}s äventyr i ${topic}`,
        desc: (hero, topic) => `En unik saga om ${hero} och ${topic}.`,
        actions: [
            "hittade ett mystiskt lysande föremål",
            "träffade en vänlig varelse som ville leka",
            "var tvungen att lösa ett klurigt pussel",
            "klättrade upp på ett jätteberg för att se utsikten",
            "upptäckte en hemlig dold stig",
            "hjälpte en vilsen vän att hitta hem",
            "flög högt upp i skyn",
            "simmade djupt under vattnet"
        ]
    },
    tr: {
        intro: (hero, topic) => `Bir zamanlar ${hero} adında cesur bir kahraman vardı. Bugün ${hero}, ${topic} dünyasını keşfetmek için özel bir maceraya çıkıyordu.`,
        middle: (hero, topic, action) => `${topic} dünyasını keşfederken, ${hero} ${action}. Çok heyecan vericiydi!`,
        ending: (hero, topic) => `Eğlence dolu uzun bir günün ardından ${hero} yorgun ama mutluydu. "Ben ${topic} dünyasını çok seviyorum!" dedi ${hero}. Bu şimdiye kadarki en iyi maceraydı.`,
        title: (hero, topic) => `${hero}'in ${topic} Macerası`,
        desc: (hero, topic) => `${hero} ve ${topic} hakkında eşsiz bir hikaye.`,
        actions: [
            "gizemli parlayan bir nesne buldu",
            "oyun oynamak isteyen dost canlısı bir yaratıkla tanıştı",
            "zorlu bir bulmacayı çözmek zorunda kaldı",
            "manzarayı görmek için dev bir dağa tırmandı",
            "gizli bir patika keşfetti",
            "kaybolmuş bir arkadaşının evini bulmasına yardım etti",
            "gökyüzünün yükseklerine uçtu",
            "suyun derinliklerine yüzdü"
        ]
    }
};

const getPrompt = (hero, topic, action, type) => {
    // Prompts should generally be in English for best results with Pollinations/Stable Diffusion
    // We try to construct a generic prompt even if inputs are non-English
    if (type === 'intro') {
        return `cute ${hero} standing in front of ${topic}, children's book illustration, vector style, colorful, masterpiece`;
    } else if (type === 'middle') {
        return `${hero} ${action} in ${topic}, children's book illustration, vector style, action scene, vibrant colors`;
    } else if (type === 'ending') {
        return `happy ${hero} resting after adventure in ${topic}, sunset, peaceful, children's book illustration, high quality`;
    }
};

export const generateStory = (topic, hero, length) => {
    // Clamp length between 3 and 10
    const safeLength = Math.max(3, Math.min(10, length));
    const langs = ['en', 'fi', 'sv', 'tr'];

    // Generate pages structure first
    const pages = [];

    // 1. Intro Page
    const introPage = {
        text: {},
        prompt: getPrompt(hero, topic, null, 'intro')
    };
    langs.forEach(lang => {
        introPage.text[lang] = translations[lang].intro(hero, topic);
    });
    pages.push(introPage);

    // 2. Middle Pages
    // We need to pick actions consistently across languages
    // We'll use the index to pick the corresponding action from each language's list
    const actionCount = translations.en.actions.length;

    for (let i = 1; i < safeLength - 1; i++) {
        const actionIndex = (i - 1) % actionCount;
        const middlePage = {
            text: {},
            prompt: getPrompt(hero, topic, translations.en.actions[actionIndex], 'middle')
        };

        langs.forEach(lang => {
            middlePage.text[lang] = translations[lang].middle(hero, topic, translations[lang].actions[actionIndex]);
        });
        pages.push(middlePage);
    }

    // 3. Ending Page
    const endingPage = {
        text: {},
        prompt: getPrompt(hero, topic, null, 'ending')
    };
    langs.forEach(lang => {
        endingPage.text[lang] = translations[lang].ending(hero, topic);
    });
    pages.push(endingPage);

    // Construct the full story object
    const story = {
        id: `custom-${Date.now()}`,
        title: {},
        description: {},
        cover: `https://pollinations.ai/p/${encodeURIComponent(pages[0].prompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000)}`,
        pages: pages.map(p => ({
            text: p.text,
            image: `https://pollinations.ai/p/${encodeURIComponent(p.prompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000)}`
        }))
    };

    langs.forEach(lang => {
        story.title[lang] = translations[lang].title(hero, topic);
        story.description[lang] = translations[lang].desc(hero, topic);
    });

    return story;
};
