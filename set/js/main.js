Array.prototype.diff = function(a) {
  return this.filter(i => a.indexOf(i) === -1);
};

class SetTools {
  static getQualities(id) {
    let color = Math.floor(id / 27);
    let fill = Math.floor(id / 9) % 3;
    let shape = Math.floor(id / 3) % 3;
    let number = Math.floor(id / 1) % 3;
    return { color, fill, shape, number };
  }

  static checkIfSet(cards) {
    let a = this.getQualities(cards[0]);
    let b = this.getQualities(cards[1]);
    let c = this.getQualities(cards[2]);

    let color = new Set([a.color, b.color, c.color]);
    let fill = new Set([a.fill, b.fill, c.fill]);
    let number = new Set([a.number, b.number, c.number]);
    let shape = new Set([a.shape, b.shape, c.shape]);

    if (color.size == 2) return 0;
    if (fill.size == 2) return 0;
    if (number.size == 2) return 0;
    if (shape.size == 2) return 0;
    return 1;
  }
}

function createDeck() {
  let deck = [];
  for (let i = 0; i < 81; i++) {
    deck.push(i);
  }
  return deck;
}

function drawCards(number = 12, test = false) {
  if (number > deck.length) {
    throw Error("trying to draw more cards than are in the deck");
  }
  let s = new Set();
  do {
    s.add(deck[Math.floor(Math.random() * deck.length)]);
  } while (s.size < number);

  let drawn;
  if (test) drawn = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  else drawn = [...s];

  deck = deck.diff(drawn);
  document.getElementById("deck").innerHTML = `(${deck.length})`;

  return drawn;
}

let deck = createDeck();
let tableCards = drawCards(12, 0);
let foundSets = [];
setupTable();

let selectedCards = [];
let selectedCells = [];

function displayFoundSet(set) {
  let foundSets = document.getElementById("found-sets");
  tr = document.createElement("tr");

  for (let col = 0; col < 3; col++) {
    let td = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", `images/${set[col]}.jpg`);
    td.appendChild(img);
    tr.appendChild(td);
  }
  foundSets.appendChild(tr);
}

function setIsNew(set) {
  if (foundSets.length == 0) return true;
  for (let f of foundSets) {
    if (f.diff(set).length == 0) return false;
  }
  return true;
}

function setupTable(cards = tableCards.length) {
  let table = document.getElementById("table");
  let i = 0;
  for (let row = 0; row < cards / 3; row++) {
    tr = document.createElement("tr");
    for (let col = 0; col < 3; col++) {
      let td = document.createElement("td");
      let img = document.createElement("img");
      img.setAttribute("src", `images/${tableCards[i]}.jpg`);
      img.setAttribute("data-card-value", tableCards[i]);
      td.appendChild(img);
      tr.appendChild(td);
      i++;
    }
    table.appendChild(tr);
  }

  table.onclick = function(event) {
    let img = event.target.closest("img");
    if (!img) return; // (2)
    let td = event.target.closest("td");

    let cells = Array.from(table.getElementsByTagName("td"));
    selectedCells.push(cells.indexOf(td));

    let c = img.getAttribute("data-card-value");

    if (selectedCards.includes(c)) {
      selectedCards = selectedCards.filter(x => x != c);
    } else {
      selectedCards.push(c);
    }
    img.classList.toggle("highlight");

    if (selectedCards.length == 3) {
      result = SetTools.checkIfSet(selectedCards);
      if (result) {
        //alert("found a set!");
        if (setIsNew(selectedCards)) {
          foundSets.push(selectedCards);
          displayFoundSet(selectedCards);
        }
        document.getElementById("count").innerHTML = `(${foundSets.length})`;
        //draw and replace cards that were removed from table
        for (let sc of selectedCells) {
          let c = drawCards(1)[0];
          imgToChange = cells[sc].getElementsByTagName("img")[0];
          imgToChange.setAttribute("src", `images/${c}.jpg`);
          imgToChange.setAttribute("data-card-value", c);
        }
      }
      //clear all highlights
      let nodes = document.getElementById("table").getElementsByTagName("img");
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].classList.remove("highlight");
      }
      selectedCards = [];
      selectedCells = [];
    }
  };
}
