const express = require('express');
const req = require('express/lib/request');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

let scientificPapers = [
    //Subject must be [], with the array accepting strings or else it'll break functionality in the app.get request below.
    //Id must be integer for accepting delete requests.
    {
        name: 'A Decade of Microaggression Research and LGBTQ Communities: An Introduction to the Special Issue',
        id: 1,
        abstract: 'Though the Supreme Court of the U.S. legalized same-sex marriage in 2015, heterosexism and transphobia has continued to manifest through many systems in the US — from lack of federal protection in employment non-discrimination laws to polices that prohibit transgender people from using bathroom and public facilities that match their gender identities. Heterosexist and transphobic discrimination have also persisted through interpersonal interactions — ranging from more overt forms (e.g., hate crimes, bullying) to more subtle forms of discrimination, otherwise known as microaggressions. Since 2008, there have been hundreds of articles written on microaggressions, with dozens focusing specifically on experiences of lesbian, gay, bisexual, transgender, and queer (LGBTQ) people. Qualitative and quantitative studies have revealed that LGBTQ people who experience microaggressions have reported negative outcomes like depression, low self-esteem, and trauma. This special issue aims to further Microaggression Theory by providing theoretical and empirical papers that focus on the manifestation and impact of microaggressions on LGBTQ people. Using an interdisciplinary approach, articles range in topic from intersectional identities, to health and psychological outcomes, to advancing research methods. Future studies regarding microaggressions and LGBTQ people are discussed- highlighting the influence of the changing landscape of heterosexism and transphobia within general society, as well as new dynamics that have formed and developed within LGBTQ communities.',
        link: 'https://www.tandfonline.com/doi/abs/10.1080/00918369.2018.1539582',
        subject: ['Microaggressions', 'LGBTQ', 'discrimination', 'heterosexism', 'transphobia'],
        publishicationDate: "November 07, 2018",
        author: "Kevin L. Nadal",
    },
    //Default
    {
        name: 'Missing',
        id: 0,
        abstract: 'Missing',
        link: 'Missing',
        subject: [],
        publishicationDate: null,
    },
]


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.get('/api/scientificPapers', (request, response) => {
    response.send(scientificPapers);
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

/*
app.delete('/api/scientificPapers/:id', (request, response) => {
    //Delete based on ID
    const id = Number(request.params.id);
    scientificPapers = scientificPapers.filter(paper => paper.id !== id);

    response.status(204).end();
})*/


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})