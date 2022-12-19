const msgerForm = get(".msger-inputarea");
const msgerInput = document.getElementById("testo");
const msgerChat = get(".messaggi");

const BOT_MSGS = [
  "TemplateRisposte.html"
];

const BOT_IMG = "Img/Logo.png";
const BOT_NAME = "YINCO";
const PERSON_NAME = "Studente";

msgerForm.addEventListener("click", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessageUser(PERSON_NAME, "right", msgText);
  msgerInput.value = "";

  botResponse();
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

function appendMessageBot(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
        </div>

        <div class="msg-text"><a href="${text}" target="blank">LINK</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const msgText = BOT_MSGS[0];
  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    appendMessageBot(BOT_NAME, BOT_IMG, "left", msgText);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}