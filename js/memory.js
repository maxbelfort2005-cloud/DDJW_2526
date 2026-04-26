// Plantilles SVG per a les cartes
const svgTemplates = {
    circle: (color) => `<svg width="90" height="115" viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="125" fill="white"/><circle cx="50" cy="62.5" r="30" fill="${color}" stroke="#333" stroke-width="1.5"/></svg>`,
    square: (color) => `<svg width="90" height="115" viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="125" fill="white"/><rect x="25" y="37.5" width="50" height="50" fill="${color}" stroke="#333" stroke-width="1.5"/></svg>`,
    triangle: (color) => `<svg width="90" height="115" viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="125" fill="white"/><polygon points="50,35 25,90 75,90" fill="${color}" stroke="#333" stroke-width="1.5"/></svg>`,
    back: `<svg width="90" height="115" viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="125" fill="#2c3e50"/><rect x="10" y="10" width="80" height="105" fill="none" stroke="#34495e" stroke-width="4"/></svg>`
};

const resources = [
    svgTemplates.circle("#0099ff"), svgTemplates.circle("#ff6600"),
    svgTemplates.square("#0099ff"), svgTemplates.square("#ff6600"),
    svgTemplates.triangle("#0099ff"), svgTemplates.triangle("#ff6600")
];

const back = svgTemplates.back;

const StateCard = Object.freeze({
    DISABLE: 0, ENABLE: 1, DONE: 2
});

var game = {
    items: [], states: [], setValue: null, ready: 0,
    lastCards: [], score: 200, pairs: 2, groupSize: 2, mode: 1,

    goBack: function(idx){
        this.setValue && this.setValue[idx](back);
        this.states[idx] = StateCard.ENABLE;
    },
    goFront: function(idx){
        this.setValue && this.setValue[idx](this.items[idx]);
        this.states[idx] = StateCard.DISABLE;
    },
    select: function(){
        // Mirem si venim de "Carregar Partida"
        if (sessionStorage.load){ 
            let toLoad = JSON.parse(sessionStorage.load);
            this.items = toLoad.items;
            this.states = toLoad.states;
            this.lastCards = toLoad.lastCards || [];
            this.score = toLoad.score;
            this.pairs = toLoad.pairs;
            this.groupSize = toLoad.groupSize || 2;
            this.mode = toLoad.mode || 1;
        } else { 
            // Partida nova: llegim opcions de localStorage
            if (localStorage.options) {
                let opt = JSON.parse(localStorage.options);
                this.pairs = parseInt(opt.pairs);
                this.groupSize = parseInt(opt.groupSize) || 2;
                this.mode = parseInt(opt.mode) || 1;
            }
            
            // Creem baralla segons la mida del grup (2, 3 o 4)
            let baseItems = resources.slice(0, this.pairs);
            this.items = [];
            for (let i = 0; i < this.groupSize; i++) {
                this.items = this.items.concat(baseItems);
            }
            
            shuffe(this.items);
            this.states = new Array(this.items.length).fill(StateCard.ENABLE);
        }
    },
    start: function(){
        // Si carreguem partida, algunes cartes ja poden estar girades (DONE o DISABLE)
        this.items.forEach((_, indx) => {
            if (this.states[indx] === StateCard.DONE || this.states[indx] === StateCard.DISABLE) {
                this.goFront(indx);
            } else {
                this.goBack(indx);
            }
        });
        this.ready = this.items.length;
    },
    click: function(indx){
        if (this.states[indx] !== StateCard.ENABLE || this.ready < this.items.length) return;
        
        this.goFront(indx);
        this.lastCards.push(indx);

        if (this.lastCards.length === this.groupSize) {
            let allMatch = this.lastCards.every(i => this.items[i] === this.items[this.lastCards[0]]);
            
            if (allMatch) {
                this.lastCards.forEach(i => this.states[i] = StateCard.DONE);
                this.pairs--;
                if (this.pairs <= 0) {
                    setTimeout(() => {
                        alert(`Has guanyat! Puntuació: ${this.score}`);
                        window.location.assign("../");
                    }, 500);
                }
            } else {
                this.ready -= this.groupSize; 
                setTimeout(() => {
                    this.lastCards.forEach(i => this.goBack(i));
                    this.lastCards = [];
                    this.ready += this.groupSize;
                }, 1000);
                this.score -= 25;
                if (this.score <= 0) {
                    alert("Has perdut la partida");
                    window.location.assign("../");
                }
                return;
            }
            this.lastCards = [];
        }
    },
    save: function(){
        // Recuperem la llista de partides guardades
        let allSaves = localStorage.allSaves ? JSON.parse(localStorage.allSaves) : [];
        
        // Creem l'objecte de la partida actual amb data i hora
        let currentSave = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            items: this.items,
            states: this.states,
            lastCards: this.lastCards,
            score: this.score,
            pairs: this.pairs,
            groupSize: this.groupSize,
            mode: this.mode
        };

        // L'afegim a la llista i guardem a localStorage
        allSaves.push(currentSave);
        localStorage.allSaves = JSON.stringify(allSaves);
        
        alert("Partida guardada a la llista!");
        window.location.assign("../");
    }
}

function shuffe(arr){ arr.sort(() => Math.random() - 0.5); }

export var gameItems;
export function selectCards() { game.select(); gameItems = game.items; }
export function clickCard(indx){ game.click(indx); }
export function startGame(){ game.start(); }
export function initCard(callback) { 
    if (!game.setValue) game.setValue = [];
    game.setValue.push(callback);
}
export function saveGame(){ game.save(); }