const express = require('express');
const req = require('express/lib/request');
const app = express();
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const Papers = require('./models/scientificPapers');

const PORT = process.env.PORT || 3000;
const ipPORT = process.env.ip_PORT;
const dbName = 'scientific-papers';
const url = `mongodb://${ipPORT}${dbName}`;

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;



db.once('open', _ => {
    console.log('Database connected:', url);
})

db.on('error', err => {
    console.error('connection error:', err);
})

app.use(express.json());
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

async function savePaper() {
    //Mongoose?
    const template = new Papers({
        title: 'Sample',
        abstract: 'Sample Abstract',
        link: 'Sample Link',
    });
    const lgbtqPaper = new Papers({
        title: 'A Decade of Microaggression Research and LGBTQ Communities: An Introduction to the Special Issue',
        abstract: 'Though the Supreme Court of the U.S. legalized same-sex marriage in 2015, heterosexism and transphobia has continued to manifest through many systems in the US — from lack of federal protection in employment non-discrimination laws to polices that prohibit transgender people from using bathroom and public facilities that match their gender identities. Heterosexist and transphobic discrimination have also persisted through interpersonal interactions — ranging from more overt forms (e.g., hate crimes, bullying) to more subtle forms of discrimination, otherwise known as microaggressions. Since 2008, there have been hundreds of articles written on microaggressions, with dozens focusing specifically on experiences of lesbian, gay, bisexual, transgender, and queer (LGBTQ) people. Qualitative and quantitative studies have revealed that LGBTQ people who experience microaggressions have reported negative outcomes like depression, low self-esteem, and trauma. This special issue aims to further Microaggression Theory by providing theoretical and empirical papers that focus on the manifestation and impact of microaggressions on LGBTQ people. Using an interdisciplinary approach, articles range in topic from intersectional identities, to health and psychological outcomes, to advancing research methods. Future studies regarding microaggressions and LGBTQ people are discussed- highlighting the influence of the changing landscape of heterosexism and transphobia within general society, as well as new dynamics that have formed and developed within LGBTQ communities.',
        link: 'https://www.tandfonline.com/doi/abs/10.1080/00918369.2018.1539582'
    })

    // await template.save();
    // await lgbtqPaper.save();

    //  const paper = await Papers.findOne({ link: 'https://www.tandfonline.com/doi/abs/10.1080/00918369.2018.1539582' })

    // paper.subject = ['Microaggressions', 'LGBTQ', 'discrimination', 'heterosexism', 'transphobia'];
    // const doc = await paper.save()


    // const deleted = await template.remove(); //find
    const papers = await Papers.find();
    console.log(papers);
}

savePaper()
    .catch(error => { console.error(error) });









let scientificPapers = [
    //Subject must be [], with the array accepting strings or else it'll break functionality in the app.get request below.
    //Id must be integer for accepting delete requests.
    //Author only lists first author but should be modified later.
    {
        name: 'A Decade of Microaggression Research and LGBTQ Communities: An Introduction to the Special Issue',
        id: 1,
        abstract: 'Though the Supreme Court of the U.S. legalized same-sex marriage in 2015, heterosexism and transphobia has continued to manifest through many systems in the US — from lack of federal protection in employment non-discrimination laws to polices that prohibit transgender people from using bathroom and public facilities that match their gender identities. Heterosexist and transphobic discrimination have also persisted through interpersonal interactions — ranging from more overt forms (e.g., hate crimes, bullying) to more subtle forms of discrimination, otherwise known as microaggressions. Since 2008, there have been hundreds of articles written on microaggressions, with dozens focusing specifically on experiences of lesbian, gay, bisexual, transgender, and queer (LGBTQ) people. Qualitative and quantitative studies have revealed that LGBTQ people who experience microaggressions have reported negative outcomes like depression, low self-esteem, and trauma. This special issue aims to further Microaggression Theory by providing theoretical and empirical papers that focus on the manifestation and impact of microaggressions on LGBTQ people. Using an interdisciplinary approach, articles range in topic from intersectional identities, to health and psychological outcomes, to advancing research methods. Future studies regarding microaggressions and LGBTQ people are discussed- highlighting the influence of the changing landscape of heterosexism and transphobia within general society, as well as new dynamics that have formed and developed within LGBTQ communities.',
        link: 'https://www.tandfonline.com/doi/abs/10.1080/00918369.2018.1539582',
        subject: ['Microaggressions', 'LGBTQ', 'discrimination', 'heterosexism', 'transphobia'],
        publishicationDate: "November 07, 2018",
        author: "Kevin L. Nadal",
    },
    {
        name: 'Dietary sources, health benefits, and risks of caffeine',
        id: 2,
        abstract: 'Dietary intake of caffeine has significantly increased in recent years, and beneficial and harmful effects of caffeine have been extensively studied. This paper reviews antioxidant and anti-inflammatory activities of caffeine as well as its protective effects on cardiovascular diseases, obesity, diabetes mellitus, cancers, and neurodegenerative and liver diseases. In addition, we summarize the side effects of long-term or excessive caffeine consumption on sleep, migraine, intraocular pressure, pregnant women, children, and adolescents. The health benefits of caffeine depend on the amount of caffeine intake and the physical condition of consumers. Moderate intake of caffeine helps to prevent and modulate several diseases. However, the long-term or over-consumption of caffeine can lead to addiction, insomnia, migraine, and other side effects. In addition, children, adolescents, pregnant women, and people who are sensitive to caffeine should be recommended to restrict/reduce their intake to avoid potential adverse effects.',
        link: 'https://www.tandfonline.com/doi/full/10.1080/10408398.2022.2074362',
        subject: ['Caffeine', 'cancer', 'cardiovascular disease', 'diabetes mellitus', 'liver disease', 'neurodegenerative disease', 'obesity', 'side effect'],
        publishicationDate: "May 16, 2022",
        author: 'Adila Saimaitia',
    },
    {
        name: 'Is caffeine mouth rinsing an effective strategy to improve physical and cognitive performance? A systematic review',
        id: 3,
        abstract: 'The aim of this study was to perform a systematic review on the effects of caffeine mouth rinsing on physical and cognitive performance. Following a search through 4 databases, 18 studies were found meeting the inclusion criteria (15 for physical performance and 3 for cognitive performance). All selected studies found an improvement in cognitive performance with caffeine mouth rinse. Four studies found positive effects of caffeine mouthwash on physical performance when repeated during exercise, while one study detected a positive effect with a single mouthwash before exercise, but only in a fasted state. Among these studies that showed positive effects, however, three (2 for physical performance and 1 for cognitive performance) presented fair methodological quality. There was also a variety of methodological approaches in the studies that showed no improvement in physical performance with caffeine mouth rinse, which may have influenced the potential to detect the ergogenic effect of caffeine mouth rinse. Thus, the effects of caffeine mouth rinse on physical performance are mixed, but a potential ergogenic effect might be present in a fasted state and when mouthwash is repeated during exercise. Concerning cognitive performance, caffeine mouth rinse seems to be a beneficial strategy.',
        link: 'https://www.tandfonline.com/doi/full/10.1080/10408398.2021.1949576',
        subject: ['Bitter tastant', 'cognition', 'ergogenic aids', 'exercise', 'sports nutrition'],
        publishicationDate: 'July 19, 2021',
        author: 'Widemar Ferraz da Silva',
    },

    //Default
    {
        name: null,
        id: 0,
        abstract: null,
        link: null,
        subject: [],
        publishicationDate: null,
        author: null,
    },
]

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.get('/api/scientificPapers', (request, response) => {
    response.send(scientificPapers);
})

function getListOfAllSubjects() {
    //Returns list alphabetically and with the first letter capitalized to display nicer to the user.
    const listOfTopics = [];
    scientificPapers.forEach(paper => paper.subject.forEach(topic => {
        if (listOfTopics.includes(topic) === false) {
            //To do capitalize topic first letter and lowercase the rest.
            listOfTopics.push(topic);
        }

    }))
    return listOfTopics.sort();
}

app.get('/info', (request, response) => {
    //Filtered papers with null names.
    const nonNullPapers = scientificPapers.filter(paper => paper.name);
    const numOfPapers = nonNullPapers.length;

    const availableTopics = getListOfAllSubjects();

    response.write(`<p> Scientific Papers has info for ${numOfPapers} papers. </p>`);
    response.write(`<p> Topics you can search with: ${availableTopics.join(', ')}<p/>`)
    response.send();
})

app.get('/api/scientificPapers/:topic', (request, response) => {
    //The user can search topics and will only return scientific papers that match those keywords.
    const userInput = request.params.topic;
    const filteredPapers = scientificPapers.filter(paper => paper.subject.find(tag => tag === userInput));

    const numOfResults = filteredPapers.length;

    if (numOfResults > 0) {
        response.send(filteredPapers);
    } else {
        response.status(404).end();
    }
})



app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on ${PORT}`)
})