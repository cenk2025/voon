// Simple template-based story generator
// In a real app, this would call an LLM API (like OpenAI or Gemini)

const translations = {
    en: {
        intro: [
            (hero, topic) => `Meet ${hero}. Today is a special day because ${hero} is going on a journey to explore ${topic}.`,
            (hero, topic) => `Once there was a hero named ${hero}. Everyone knew that ${hero} loved adventures in ${topic}.`,
            (hero, topic) => `It was a sunny morning when ${hero} decided to visit the amazing world of ${topic}.`
        ],
        middle: [
            (hero, topic, action) => `In the world of ${topic}, ${hero} looked around and ${action}. It was amazing!`,
            (hero, topic, action) => `Suddenly, ${hero} ${action}. What a surprise!`,
            (hero, topic, action) => `While exploring ${topic}, ${hero} ${action} and smiled happily.`
        ],
        ending: [
            (hero, topic) => `What a great adventure in ${topic}! ${hero} felt very happy and sleepy.`,
            (hero, topic) => `The sun began to set on ${topic}. ${hero} knew it was time to go home and dream.`,
            (hero, topic) => `After seeing everything in ${topic}, ${hero} waved goodbye. "I will come back soon!"`
        ],
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
            "discovered a hidden cave",
            "danced with a friendly robot",
            "ate a delicious giant apple",
            "jumped over a sparkling river",
            "found a magic wand",
            "rode a fluffy cloud",
            "saw a shooting star",
            "planted a magical seed",
            "solved a fun puzzle",
            "played hide and seek with the wind",
            "built a sandcastle",
            "followed a map to a surprise",
            "sang a song with a cricket",
            "painted a picture of the sky",
            "read a book to a squirrel",
            "swam with colorful fishes",
            "had a picnic on the moon",
            "found a lost key"
        ]
    },
    fi: {
        intro: [
            (hero, topic) => `Tässä on ${hero}. Tänään on erityinen päivä, sillä ${hero} lähtee matkalle paikkaan: ${topic}.`,
            (hero, topic) => `Olipa kerran sankari nimeltä ${hero}. Kaikki tiesivät, että ${hero} rakasti seikkailuja aiheesta ${topic}.`,
            (hero, topic) => `Oli aurinkoinen aamu, kun ${hero} päätti vierailla paikassa ${topic}.`
        ],
        middle: [
            (hero, topic, action) => `Paikassa ${topic}, ${hero} katseli ympärilleen ja ${action}. Se oli mahtavaa!`,
            (hero, topic, action) => `Yhtäkkiä ${hero} ${action}. Mikä yllätys!`,
            (hero, topic, action) => `Tutkiessaan aihetta ${topic}, ${hero} ${action} ja hymyili iloisesti.`
        ],
        ending: [
            (hero, topic) => `Mikä seikkailu paikassa ${topic}! ${hero} oli hyvin onnellinen ja väsynyt.`,
            (hero, topic) => `Aurinko alkoi laskea paikan ${topic} ylle. ${hero} tiesi, että oli aika mennä kotiin nukkumaan.`,
            (hero, topic) => `Nähtyään kaiken paikassa ${topic}, ${hero} vilkutti hyvästit. "Tulen pian takaisin!"`
        ],
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
            "löysi piilotetun luolan",
            "tanssi ystävällisen robotin kanssa",
            "söi herkullisen jättiomenan",
            "hyppäsi kimaltelevan joen yli",
            "löysi taikasauvan",
            "ratsasti pörröisellä pilvellä",
            "näki tähdenlennon",
            "istutti taikasiemenen",
            "ratkaisi hauskan palapelin",
            "leikki piilosta tuulen kanssa",
            "rakensi hiekkalinnan",
            "seurasi karttaa yllätykseen",
            "lauloi laulun sirkan kanssa",
            "maalasi kuvan taivaasta",
            "luki kirjaa oravalle",
            "ui värikkäiden kalojen kanssa",
            "piti piknikin kuussa",
            "löysi kadonneen avaimen"
        ]
    },
    sv: {
        intro: [
            (hero, topic) => `Här är ${hero}. Idag är en speciell dag eftersom ${hero} ska resa till ${topic}.`,
            (hero, topic) => `Det fanns en hjälte som hette ${hero}. Alla visste att ${hero} älskade äventyr om ${topic}.`,
            (hero, topic) => `Det var en solig morgon när ${hero} bestämde sig för att besöka ${topic}.`
        ],
        middle: [
            (hero, topic, action) => `I ${topic} såg ${hero} sig omkring och ${action}. Det var fantastiskt!`,
            (hero, topic, action) => `Plötsligt ${action} ${hero}. Vilken överraskning!`,
            (hero, topic, action) => `Medan hen utforskade ${topic}, ${action} ${hero} och log lyckligt.`
        ],
        ending: [
            (hero, topic) => `Vilket äventyr i ${topic}! ${hero} kände sig mycket glad och sömnig.`,
            (hero, topic) => `Solen började gå ner över ${topic}. ${hero} visste att det var dags att gå hem och drömma.`,
            (hero, topic) => `Efter att ha sett allt i ${topic}, vinkade ${hero} hejdå. "Jag kommer snart tillbaka!"`
        ],
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
            "upptäckte en dold grotta",
            "dansade med en vänlig robot",
            "åt ett jättelikt äpple",
            "hoppade över en glittrande flod",
            "hittade en trollstav",
            "red på ett fluffigt moln",
            "såg ett stjärnfall",
            "planterade ett magiskt frö",
            "löste ett roligt pussel",
            "lekte kurragömma med vinden",
            "byggde ett sandslott",
            "följde en karta till en överraskning",
            "sjöng en sång med en syrsa",
            "målade en bild av himlen",
            "läste en bok för en ekorre",
            "simmade med färgglada fiskar",
            "hade picknick på månen",
            "hittade en förlorad nyckel"
        ]
    },
    tr: {
        intro: [
            (hero, topic) => `Karşınızda: ${hero}. Bugün çok özel bir gün çünkü ${hero}, ${topic} dünyasına doğru bir yolculuğa çıkıyor.`,
            (hero, topic) => `Bir zamanlar ${hero} adında bir kahraman vardı. Herkes ${hero}'in ${topic} maceralarını sevdiğini bilirdi.`,
            (hero, topic) => `Güneşli bir sabahtı ve ${hero}, ${topic} diyarını keşfetmeye karar verdi.`
        ],
        middle: [
            (hero, topic, action) => `${topic} diyarında gezinirken, ${hero} ${action}. Bu inanılmazdı!`,
            (hero, topic, action) => `Aniden ${hero} ${action}. Ne büyük bir sürpriz!`,
            (hero, topic, action) => `${topic} dünyasını keşfederken, ${hero} ${action} ve mutlulukla gülümsedi.`
        ],
        ending: [
            (hero, topic) => `${topic} macerası harikaydı! ${hero} çok mutlu ama biraz uykulu hissediyordu.`,
            (hero, topic) => `${topic} üzerinde güneş batmaya başladı. ${hero} artık eve dönüp rüya görme zamanının geldiğini biliyordu.`,
            (hero, topic) => `${topic} diyarındaki her şeyi gördükten sonra, ${hero} el salladı. "Yakında geri geleceğim!"`
        ],
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
            "gizli bir mağara buldu",
            "dost canlısı bir robotla dans etti",
            "dev gibi lezzetli bir elma yedi",
            "ışıldayan bir nehrin üzerinden atladı",
            "sihirli bir değnek buldu",
            "pamuk gibi bir bulutun üzerine bindi",
            "kayan bir yıldız gördü",
            "sihirli bir tohum ekti",
            "eğlenceli bir bulmaca çözdü",
            "rüzgarla saklambaç oynadı",
            "bir kumdan kale yaptı",
            "sürpriz bir yere giden haritayı takip etti",
            "bir cırcır böceğiyle şarkı söyledi",
            "gökyüzünün resmini yaptı",
            "bir sincaba kitap okudu",
            "renkli balıklarla yüzdü",
            "ayda piknik yaptı",
            "kayıp bir anahtar buldu"
        ]
    }
};

const getPrompt = (hero, topic, action, type) => {
    // Keywords for consistent style
    const style = "children's book illustration, vibrant colors, flat vector art style, cute character design, magical atmosphere, masterpiece, 8k resolution, white background";

    let prompt = "";

    // Clean input
    const cleanHero = hero.replace(/[^\w\s]/gi, '');
    const cleanTopic = topic.replace(/[^\w\s]/gi, '');

    if (type === 'intro') {
        prompt = `cute character named ${cleanHero} standing ready for adventure, background theme is ${cleanTopic}, ${style}, full body shot, happy expression`;
    } else if (type === 'middle') {
        prompt = `cute character named ${cleanHero} ${action}, background theme is ${cleanTopic}, ${style}, dynamic pose, exciting scene`;
    } else if (type === 'ending') {
        prompt = `cute character named ${cleanHero} sleeping peacefully, tired but happy, background theme is ${cleanTopic}, ${style}, soft lighting, night time`;
    }

    return prompt.substring(0, 300);
};

// Shuffle helper
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const generateStory = (topic, hero, length) => {
    // Clamp length
    const safeLength = Math.max(3, Math.min(7, length));
    const langs = ['en', 'fi', 'sv', 'tr'];

    const pages = [];

    // 1. Intro Page
    // Randomly pick one of the 3 intro templates
    const introIndex = Math.floor(Math.random() * 3);

    const introPage = {
        text: {},
        prompt: getPrompt(hero, topic, null, 'intro')
    };
    langs.forEach(lang => {
        introPage.text[lang] = translations[lang].intro[introIndex](hero, topic);
    });
    pages.push(introPage);

    // 2. Middle Pages
    const actionCount = translations.en.actions.length;
    const actionIndices = Array.from({ length: actionCount }, (_, i) => i);
    const shuffledIndices = shuffleArray(actionIndices);

    const middlePageCount = safeLength - 2;

    for (let i = 0; i < middlePageCount; i++) {
        const actionIndex = shuffledIndices[i % actionCount];
        const englishAction = translations.en.actions[actionIndex];

        // Randomly pick one of the 3 middle templates
        const midTemplateIndex = Math.floor(Math.random() * 3);

        const middlePage = {
            text: {},
            prompt: getPrompt(hero, topic, englishAction, 'middle')
        };

        langs.forEach(lang => {
            middlePage.text[lang] = translations[lang].middle[midTemplateIndex](hero, topic, translations[lang].actions[actionIndex]);
        });
        pages.push(middlePage);
    }

    // 3. Ending Page
    // Randomly pick one of the 3 ending templates
    const endingIndex = Math.floor(Math.random() * 3);

    const endingPage = {
        text: {},
        prompt: getPrompt(hero, topic, null, 'ending')
    };
    langs.forEach(lang => {
        endingPage.text[lang] = translations[lang].ending[endingIndex](hero, topic);
    });
    pages.push(endingPage);

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
