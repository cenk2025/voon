// Simple template-based story generator
// In a real app, this would call an LLM API (like OpenAI or Gemini)

const translations = {
    en: {
        intro: (hero, topic) => `Meet ${hero}. Today is a special day because ${hero} is going on a journey to ${topic}.`,
        middle: (hero, topic, action) => `In the world of ${topic}, ${hero} looked around and ${action}. It was amazing!`,
        ending: (hero, topic) => `What a great adventure in ${topic}! ${hero} felt very happy and sleepy.`,
        title: (hero, topic) => `${hero} and the ${topic}`,
        desc: (hero, topic) => `A story about ${hero} journeying to ${topic}.`,
        actions: [
            "found a shiny treasure chest",
            "met a new funny friend",
            "saw a magical rainbow bridge",
            "climbed a very tall tree",
            "found a secret door",
            "helped a little bird",
            "flew over the clouds",
            "discovered a hidden cave"
        ]
    },
    fi: {
        intro: (hero, topic) => `Tässä on ${hero}. Tänään on erityinen päivä, sillä ${hero} lähtee matkalle paikkaan: ${topic}.`,
        middle: (hero, topic, action) => `Paikassa ${topic}, ${hero} katseli ympärilleen ja ${action}. Se oli mahtavaa!`,
        ending: (hero, topic) => `Mikä seikkailu paikassa ${topic}! ${hero} oli hyvin onnellinen ja väsynyt.`,
        title: (hero, topic) => `${hero} ja ${topic}`,
        desc: (hero, topic) => `Tarina sankarista ${hero} ja matkasta paikkaan ${topic}.`,
        actions: [
            "löysi kiiltävän aarrearkun",
            "tapasi uuden hauskan ystävän",
            "näki taianomaisen sateenkaarisillan",
            "kiipesi hyvin korkeaan puuhun",
            "löysi salaisen oven",
            "auttoi pientä lintua",
            "lensi pilvien yllä",
            "löysi piilotetun luolan"
        ]
    },
    sv: {
        intro: (hero, topic) => `Här är ${hero}. Idag är en speciell dag eftersom ${hero} ska resa till ${topic}.`,
        middle: (hero, topic, action) => `I ${topic} såg ${hero} sig omkring och ${action}. Det var fantastiskt!`,
        ending: (hero, topic) => `Vilket äventyr i ${topic}! ${hero} kände sig mycket glad och sömnig.`,
        title: (hero, topic) => `${hero} och ${topic}`,
        desc: (hero, topic) => `En berättelse om ${hero} och resan till ${topic}.`,
        actions: [
            "hittade en skinande skattkista",
            "träffade en ny rolig vän",
            "såg en magisk regnbågsbro",
            "klättrade upp i ett mycket högt träd",
            "hittade en hemlig dörr",
            "hjälpte en liten fågel",
            "flög över molnen",
            "upptäckte en dold grotta"
        ]
    },
    tr: {
        intro: (hero, topic) => `Karşınızda: ${hero}. Bugün çok özel bir gün çünkü ${hero}, ${topic} dünyasına doğru bir yolculuğa çıkıyor.`,
        middle: (hero, topic, action) => `${topic} diyarında gezinirken, ${hero} ${action}. Bu inanılmazdı!`,
        ending: (hero, topic) => `${topic} macerası harikaydı! ${hero} çok mutlu ama biraz uykulu hissediyordu.`,
        title: (hero, topic) => `${hero} ve ${topic} Macerası`,
        desc: (hero, topic) => `${hero} isimli kahramanın ${topic} yolculuğu.`,
        actions: [
            "parlayan bir hazine sandığı buldu",
            "yeni ve komik bir arkadaşla tanıştı",
            "sihirli bir gökkuşağı köprüsü gördü",
            "kocaman bir ağaca tırmandı",
            "gizli bir kapı keşfetti",
            "küçük bir kuşa yardım etti",
            "bulutların üzerine uçtu",
            "gizli bir mağara buldu"
        ]
    }
};

const getPrompt = (hero, topic, action, type) => {
    // English keywords help the image generator even if the dynamic inputs are non-English
    const style = "children's book illustration, vibrant colors, vector art style, cute, masterpiece, 8k resolution";

    // We try to provide context. 
    // If input is non-english, we hope the model picks up proper nouns or common words.
    // Adding 'character named' and 'theme of' helps structure it.

    if (type === 'intro') {
        return `character named ${hero} standing in the theme of ${topic}, ${style}, welcoming pose`;
    } else if (type === 'middle') {
        return `character named ${hero} ${action}, set in the world of ${topic}, ${style}, action shot, magical atmosphere`;
    } else if (type === 'ending') {
        return `character named ${hero} sleeping happily, dream like atmosphere, theme of ${topic} in background, ${style}, soft lighting`;
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
    const actionCount = translations.en.actions.length;

    for (let i = 1; i < safeLength - 1; i++) {
        // Randomize actions slightly but consistently
        const actionIndex = (i - 1 + Math.floor(Math.random() * 3)) % actionCount;

        // Convert the action to english for the prompt if possible? 
        // We only have the English action string for the prompt
        const englishAction = translations.en.actions[actionIndex];

        const middlePage = {
            text: {},
            prompt: getPrompt(hero, topic, englishAction, 'middle')
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
    // Note: We use the Intro prompt for the cover
    const story = {
        id: `custom-${Date.now()}`,
        title: {},
        description: {},
        cover: `https://pollinations.ai/p/${encodeURIComponent(pages[0].prompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000)}&nologo=true&model=flux`,
        pages: pages.map(p => ({
            text: p.text,
            image: `https://pollinations.ai/p/${encodeURIComponent(p.prompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000)}&nologo=true&model=flux`
        }))
    };

    langs.forEach(lang => {
        story.title[lang] = translations[lang].title(hero, topic);
        story.description[lang] = translations[lang].desc(hero, topic);
    });

    return story;
};
