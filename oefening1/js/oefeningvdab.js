class Vacature {
  constructor(id, titel, functieomschrijving, profiel, bedrijf, plaats) {
    this._id = id;
    this._titel = titel;
    this._functieomschrijving = functieomschrijving;
    this._profiel = profiel;
    this._bedrijf = bedrijf;
    this._plaats = plaats;
  }

  get id() {
    return this._id;
  }
  get titel() {
    return this._titel;
  }
  get functieomschrijving() {
    return this._functieomschrijving;
  }
  get profiel() {
    return this._profiel;
  }
  get bedrijf() {
    return this._bedrijf;
  }
  get plaats() {
    return this._plaats;
  }

  bevatZoekterm(zoektermen) {
    return zoektermen.reduce((result, value) => result || this._titel.toLowerCase().includes(value.toLowerCase()), false)
  }
}

class VacaturesRepository {
  constructor() {
    this._vacatures = [];
    this.vacaturesVullen();
  }

  get vacatures() {
    return this._vacatures;
  }

  voegVacatureToe(id, titel, functieomschrijving, profiel, bedrijf, plaats) {
    this._vacatures.push(new Vacature(id, titel, functieomschrijving, profiel, bedrijf, plaats));
  }

  vacaturesVullen() {
    this.voegVacatureToe(
      '1',
      'JavaScript Front-End Developer',
      'Onze missie de lancering van straffe consultants op even straffe projecten. In dat verhaal zoeken we gedreven Frontend Developers voor projecten bij klanten, lancering alsook opvolging gegarandeerd.',
      [
        'Must have kennis: html5, css3, Gulp, javascript (VanillaJS – Modulair – Unit testen), sass, Progressive enhancement, Mobile First en Brower compatibility issues.',
        'Nice to have kennis: SMACSS, BEM, ESLint, scss-lint, Thymeleaf en automatische end-to-end testen',
        'Agile mindset en ervaring met Scrum of andere agile-methodes',
        'Teamgericht – samen willen winnen',
        'Gepassioneerd door development'
      ],
      'IT4IT SERVICES',
      'Westerlo'
    );
    this.voegVacatureToe(
      '1',
      'Front-End Developer (JavaScript/CSS/HTML)',
      'Vanuit jouw vakdomein werk je mee aan de ontwikkeling van nieuwe iOS/Android web applicaties. Hierbij word je betrokken bij de volledige development cyclus, van concept tot release. ',
      [
        'Je hebt een ruime ervaring met het ontwikkelen van websites/applicaties in HTML, Javascript en CSS',
        'Ervaring met Angular en native iOS/Android applicaties is een pluspunt',
        'Je bent analytisch, denkt logisch en hebt een hands-on mentaliteit',
        'Je bent een doorzetter, houdt van een technische uitdaging en werkt zelfstandig met de nodige aandacht voor deadlines',
        'Je bent perfect Nederlandstalig en Engelstalig'
      ],
      'Peak 6',
      'Merelbeke'
    );
    this.voegVacatureToe(
      '3',
      'Verantwoordelijke Groenzorg',
      'Boskat vzw zoekt een verantwoordelijke groenzorg die de (assistent)werkleiders van zijn team dagelijks aanstuurt. Boskat vzw is een toonaangevend groenbedrijf in de sociale economiesector dat bewust zoekt naar ecologische oplossingen die aanvaardbaar zijn voor milieu, werknemer en klant. Boskat biedt aan zijn medewerkers een permanente leeromgeving die hen uitnodigt tot professionele en persoonlijke ontwikkeling.',
      [
        'Degelijke kennis/ervaring met groen, natuur, bos- en landschapsbeheer.',
        'Kennis van informatica toepassingen.',
        'In bezit van rijbewijs B.',
        'Kennis van sociale economie en ervaring met het opleiden en begeleiden van personen uit kansengroepen is een pluspunt.'
      ],
      'VZW Boskat',
      'Herentals'
    );
    this.voegVacatureToe(
      '4',
      'Werfleider Groenonderhoud',
      'Je bent leidinggevende van een team arbeiders op de werkvloer, die je resultaatsgericht inzet op de werkvloer; zowel vaktechnisch als naar arbeidsattitude toe. Je staat 70% van de werktijd mee op de werkvloer om je arbeiders te begeleiden. Je motiveert je arbeiders dag in dag uit, je bemiddelt bij conflicten. Je begeleidt en coacht je arbeiders en werkt actief aan de arbeidsattitude van je arbeiders op de werkvloer',
      [
        'Professionele ervaring en/of opleiding in tuinaanleg en de groensector is een must',
        'Kennis van planten en tuintechnieken; kennis van machineonderhoud is een troef',
        'Je bent handig aangelegd en steekt graag de handen uit de mouwen op de werkvloer',
        'Je hebt ervaring of interesse in het begeleiden van doelgroep medewerkers',
        'Je bent eerlijk en communiceert open en vlot',
        'Je bent flexibel en kan omgaan met verandering',
        'Je goed organiseren en plannen en werkt probleemoplossend',
        'Je houdt van leidinggeven en werken in team',
        'Je levert een positieve bijdrage aan de groepssfeer',
        'Je kan vlot overweg met de PC en Tablet, en hebt kennis van Word en Excel en Outlook',
        'Je beschikt over een rijbewijs B',
        'Je hebt een basiskennis van het Frans.'
      ],
      'Manus Antwerpen',
      'Antwerpen'
    );
  }

  filterOpZoekTermen(zoektermen) {
    return this._vacatures.filter((value) => value.bevatZoekterm(zoektermen));
  }
}

class VdabApp {
  constructor(window) {
    this._vacaturesRepository = new VacaturesRepository();
    this._zoektermen = [];
    this._storage = window.localStorage;
  }

  get vacaturesRepository() {
    return this._vacaturesRepository;
  }
  get zoektermen() {
    return this._zoektermen;
  }
  get storage() {
    return this._storage;
  }

  voegZoektermToe = ()=> {    
    const zoekterm = document.getElementById("zoekterm").value;    
    if (zoekterm === '' || this.zoektermen.find(value => value.toLowerCase() === zoekterm.toLowerCase())) 
      document.getElementById('message').innerText = 'De zoekterm bestaat reeds of heeft geen waarde!';
    else {
      this.zoektermen.push(zoekterm);
      this.setZoektermenInStorage();    
      this.showResultaat();
      document.getElementById("zoekterm").value = '';
    }
  }

  verwijderZoekterm(zoekterm){
    const indexZoekterm = this._zoektermen.findIndex(value => zoekterm === value);
    this._zoektermen.splice(indexZoekterm, 1);
    this.setZoektermenInStorage(); 
    this.showResultaat();
  }

  getZoektermenFromStorage() {
    this._zoektermen = [];
    if (this._storage.getItem('VDABZoektermen')) {
      this._zoektermen = JSON.parse(this._storage.getItem('VDABZoektermen'))
    }
  }

  setZoektermenInStorage() {    
      this._storage.setItem('VDABZoektermen', JSON.stringify(this._zoektermen));    
  }

  showResultaat(){
    this.zoektermenToHtml();
    this.vacaturesToHtml();
  }

  zoektermenToHtml() {
    document.getElementById('message').innerText = '';
    document.getElementById('zoektermen').innerHTML = '';
    this._zoektermen.forEach((zoekterm) => {
      const sp = document.createElement("span");
      sp.appendChild(document.createTextNode(zoekterm));
      const img = document.createElement("img");
      img.setAttribute("src", "images/destroy.png");
      img.setAttribute("id", zoekterm);
      sp.appendChild(img);
      document.getElementById('zoektermen').appendChild(sp);
      img.onclick = () => {
        this.verwijderZoekterm(zoekterm);
      }
    })
  }

  vacaturesToHtml() {
    document.getElementById('resultaat').innerHTML = '';
    this._vacaturesRepository.filterOpZoekTermen(this._zoektermen).forEach(vacature => {
      const divElement = document.createElement('div');
      const h2Element = document.createElement('h2');
      const h2Text = document.createTextNode(vacature.titel);
      h2Element.setAttribute('class', 'vacatureTitel');
      h2Element.appendChild(h2Text);
      const h3Element = document.createElement('h3');
      const h3Text = document.createTextNode(
        vacature.bedrijf + ' - ' + vacature.plaats
      );
      h3Element.appendChild(h3Text);
      const h4Element1 = document.createElement('h4');
      const h4Text1 = document.createTextNode('Functieomschrijving');
      h4Element1.appendChild(h4Text1);
      const pElement = document.createElement('p');
      const pText = document.createTextNode(vacature.functieomschrijving);
      pElement.appendChild(pText);
      const h4Element2 = document.createElement('h4');
      const h4Text2 = document.createTextNode('Profiel');
      h4Element2.appendChild(h4Text2);
      const ulElement = document.createElement('ul');
      vacature.profiel.forEach(item => {
        const liElement = document.createElement('li');
        const liText = document.createTextNode(item);
        liElement.appendChild(liText);
        ulElement.appendChild(liElement);
      });
      divElement.appendChild(h2Element);
      divElement.appendChild(h3Element);
      divElement.appendChild(h4Element1);
      divElement.appendChild(pElement);
      divElement.appendChild(h4Element2);
      divElement.appendChild(ulElement);
      document.getElementById('resultaat').appendChild(divElement);
    });
  }
}

function init() {
  // Testcode Deel 1
  /*
  const vacature = new Vacature(
    '1',
    'JavaScript Front-End Developer',
    'Onze missie de lancering van straffe consultants op even straffe projecten. In dat verhaal zoeken we gedreven Frontend Developers voor projecten bij klanten, lancering alsook opvolging gegarandeerd.',
    [
      'Must have kennis: html5, css3, Gulp, javascript (VanillaJS – Modulair – Unit testen), sass, Progressive enhancement, Mobile First en Brower compatibility issues.',
      'Nice to have kennis: SMACSS, BEM, ESLint, scss-lint, Thymeleaf en automatische end-to-end testen',
      'Agile mindset en ervaring met Scrum of andere agile-methodes',
      'Teamgericht – samen willen winnen',
      'Gepassioneerd door development'
    ],
    'IT4IT SERVICES',
    'Westerlo'
  );
  console.log(vacature);
  console.log(
    `De vacature bevat één van de zoektermen [javascript, groen]: ${vacature.bevatZoekterm(["javascript", "groen"])}`
  );
  console.log(
    `De vacature bevat één van de zoektermen [werfleider, groen]: ${vacature.bevatZoekterm(["werfleider", "groen"])}`
  ); 
  */
  // Testcode Deel 2

  // const vacatureRepository = new VacaturesRepository();
  // console.log(vacatureRepository.vacatures);
  // console.log(vacatureRepository.filter(["javascript", "werfleider"]));
  // console.log(vacatureRepository.filter(["groen", "bomen", "planten"]));

  // Testcode Deel 3

  const vdabApp = new VdabApp(this);
  vdabApp.getZoektermenFromStorage();
  vdabApp.showResultaat();
  document.getElementById("zoektermToevoegen").onclick = vdabApp.voegZoektermToe;
}

window.onload = init;