
function getCards() {
    return JSON.parse(localStorage.getItem('cards')) || [];
  }

  function saveCards(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
  }
  
  
  function addCard() {
    var englishInput = document.getElementById('english-input').value.trim();
    var translationInput = document.getElementById('translation-input').value.trim();
    var explanationInput = document.getElementById('explanation-input').value.trim();
  
    if (!englishInput || !translationInput || !explanationInput) {
      alert('Please fill in all fields.');
      return;
    }
  
    var card = { english: englishInput, translation: translationInput, explanation: explanationInput };
  
    var cards = getCards();
    cards.push(card);
    saveCards(cards);
  
    displayCards();
  }

  function deleteCard(index) {
    var cards = getCards();
    cards.splice(index, 1);
    saveCards(cards);
    displayCards();
  }
  

  function flipCard(index) {
    var card = document.getElementById('card-' + index);
    card.classList.toggle('flipped');
  }

  function displayCards() {
    var cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
  
    var cards = getCards();
  
    cards.forEach(function(card, index) {
      var cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.id = 'card-' + index;
  
      var front = document.createElement('div');
      front.classList.add('front');
      front.textContent = card.english;
  
      var back = document.createElement('div');
      back.classList.add('back');
      back.innerHTML = '<strong>Překlad:</strong> ' + card.translation + '<br><strong>Vysvětlení:</strong> ' + card.explanation;
  
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Smazat';
      deleteButton.onclick = function() {
        deleteCard(index);
      };
  
      var flipButton = document.createElement('button');
      flipButton.textContent = 'Otočit';
      flipButton.onclick = function() {
        flipCard(index);
      };
  
      cardElement.appendChild(front);
      cardElement.appendChild(back);
      cardElement.appendChild(deleteButton);
      cardElement.appendChild(flipButton);
      cardsContainer.appendChild(cardElement);
    });
  }
  
  
  displayCards();
  