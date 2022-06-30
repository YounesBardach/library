let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readChange = function () {
  this.read = !this.read;
};

const addButton = document.querySelector(".form>.blue-button");
const cards = document.querySelector(".cards");

addButton.addEventListener(
  "click",
  () => {
    addButton.insertAdjacentHTML(
      "beforebegin",
      `<label class="beige-label" for="title">Title:</label>
      <input type="text" id="title"/>
      <label class="beige-label" for="author">Author:</label>
      <input type="text" id="author"/>
      <label class="beige-label" for="pages">Pages:</label>
      <input type="text" id="pages"/>
      <div class="grid-checkbox">
      <label class="beige-label" for="read">Read:</label>
      <input class="align-checkbox" type="checkbox" id="read"/>
      </div>`
    );
    addButton.insertAdjacentHTML(
      "afterend",
      `<div class="hidden-alert">Please fill all fields above</div>`
    );
    addButton.addEventListener("click", () => {
      const titleInput = document.querySelector("#title").value;
      const authorInput = document.querySelector("#author").value;
      const pagesInput = document.querySelector("#pages").value;
      const readInput = document.querySelector("#read").checked;
      if (titleInput && authorInput && pagesInput) {
        addBookToLibrary(titleInput, authorInput, pagesInput, readInput);
        displayBooks();
        addButton.nextElementSibling.classList.add("hidden-alert");
      } else {
        addButton.nextElementSibling.classList.remove("hidden-alert");
      }
    });
  },
  { once: true }
);

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  cards.innerHTML = "";
  myLibrary.map((book) => {
    const infoCard = document.createElement("div");
    infoCard.classList.add("card");
    cards.appendChild(infoCard);
    for (let i = 0; i < 9; i++) {
      infoCard.appendChild(document.createElement("div"));
    }
    const infos = [
      `<span class = "bold-text">Title:</span>`,
      `${book.title}`,
      `<span class = "bold-text">Author: </span>`,
      `${book.author}`,
      `<span class = "bold-text">Pages: </span>`,
      `${book.pages}`,
      `<span class = "bold-text">Read:</span>`,
      `<svg style="width:24px;height:24px;" viewBox="0 0 24 24">
      <path fill="red" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
      </svg>`,
      `<svg style="width:24px;height:24px;" viewBox="0 0 24 24">
      <path fill="green" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
      </svg>`,
    ];
    for (let i = 1, j = 0; i < 8, j < 7; i++, j++) {
      infoCard.querySelector(`.card>:nth-child(${i})`).innerHTML = infos[j];
    }
    if (!book.read) {
      infoCard.querySelector(
        ".card>:nth-child(9)"
      ).innerHTML = `<button class="blue-button">Remove</button> <button class="blue-button">Read</button>`;
      infoCard.querySelector(`.card>:nth-child(8)`).innerHTML = infos[7];
      infoCard
        .querySelector(".card>:nth-child(9)>:last-child")
        .addEventListener("click", () => {
          book.readChange();
          displayBooks();
        });
      infoCard
        .querySelector(".card>:nth-child(9)>:first-child")
        .addEventListener("click", () => {
          myLibrary.splice(myLibrary.indexOf(book), 1);
          displayBooks();
        });
    } else {
      infoCard.querySelector(
        ".card>:nth-child(9)"
      ).innerHTML = `<button class="blue-button">Remove</button> <button class="blue-button">Unread</button>`;
      infoCard.querySelector(`.card>:nth-child(8)`).innerHTML = infos[8];
      infoCard
        .querySelector(".card>:nth-child(9)>:last-child")
        .addEventListener("click", () => {
          book.readChange();
          displayBooks();
        });
      infoCard
        .querySelector(".card>:nth-child(9)>:first-child")
        .addEventListener("click", () => {
          myLibrary.splice(myLibrary.indexOf(book), 1);
          displayBooks();
        });
    }
  });
}
