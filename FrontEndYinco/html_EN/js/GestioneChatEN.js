const msgerForm = get(".msger-inputarea");
const msgerInput = document.getElementById("testo");
const msgerChat = get(".messaggi");

const docenti = ["Ranise", "Passerone", "Giorgini", "Tomasi", "Bucchiarone", "Casari", "Bouquet", "Velha", "Montresor", "Iacca"];

const BOT_IMG = "../Img/Logo.png";
const BOT_NAME = "YINCO";
const PERSON_NAME = "Studente";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessageUser(PERSON_NAME, "right", msgText);

  if(filter(msgText, docenti) == 1) {
    botResponseDocente();
  } else {
    botResponseInfo();
  }
});

function appendMessageUser(name, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function appendMessageBotDocente(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
        </div>

        <div class="msg-text">
          <p>Information regarding the following professor can be found here:</p>
          <a href="${text}" target=blank>LINK</a>
          </div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function appendMessageBotErrore(name, img, side) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
        </div>

        <div class="msg-text">
          <p>The information you are looking for is not available. Are you sure you wrote the question correctly???</p>
        </div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function appendMessageBotInfo(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
        </div>

        <div class="msg-text">
          <p>${text}</p>
        </div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponseDocente() {
  const msgText = msgerInput.value;
  const delay = msgText.split(" ").length * 100;
  
  setTimeout(() => {
    fetch('../docente/?cognome=' + msgText)
      .then(res => res.json())
      .then (function(data) {
        appendMessageBotDocente(BOT_NAME, BOT_IMG, "left", data.url);
      })
      .catch(error => console.error(error));
  }, delay);
}

function botResponseInfo() {
  const msgText = msgerInput.value;
  const delay = msgText.split(" ").length * 100;
  
  setTimeout(() => {
    fetch('../damn/?tags=' + msgText)
      .then(res => res.json())
      .then (function(data) {
        if(data.body != undefined) {
          appendMessageBotInfo(BOT_NAME, BOT_IMG, "left", data.body);
        } else {
          appendMessageBotErrore(BOT_NAME, BOT_IMG, "left");
        }
      })
      .catch(error => console.error(error));
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function filter(question, term) {
  const frase = question.match(/[\w']+/g);

  for(let i = 0; i < frase.length; i++) {
    if(docenti.includes(frase[i])) {
      return 1;
    }
  }

  return 0;
}