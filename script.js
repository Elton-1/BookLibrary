const cardContainer = document.querySelector(".card-container");
const submitBtn = document.querySelector("button[type=submit]");
const nameInput = document.querySelector("input#name");
const authorInput = document.querySelector("input#author");
const genreInput = document.querySelector("input#genre");

let library = [];
let visited = [];

function Book(name, author, genre) {
    this.name = name;
    this.author = author;
    this.genre = genre;
}

function addBookToLibrary(name, author, genre) {
    let book = new Book(name, author, genre);
    library.push(book);

    return library;
}

const removeBtnOnClick = (e) => {
    const parent = e.target.parentElement;

    library = library.filter(book => !(book.name === parent.querySelector(".name").getAttribute("data-content") && book.author === parent.querySelector(".author").getAttribute("data-content") && book.genre === parent.querySelector(".genre").getAttribute("data-content")));
    visited = visited.filter(book => !(book.name === parent.querySelector(".name").getAttribute("data-content") && book.author === parent.querySelector(".author").getAttribute("data-content") && book.genre === parent.querySelector(".genre").getAttribute("data-content")));

    cardContainer.removeChild(parent);
}

const changeBtnOnClick = (e) => {
    submitBtn.textContent = "Change";

    const parent = e.target.parentElement;

    let dataIndex = -1;

    library.forEach((book, index) => {
        if(book.name === parent.querySelector(".name").getAttribute("data-content") && book.author === parent.querySelector(".author").getAttribute("data-content") && book.genre === parent.querySelector(".genre").getAttribute("data-content"))
        {
            dataIndex = index;
            return;
        }
    });

    submitBtn.setAttribute("data-link", dataIndex);
}

const updateCards = () => {
    for (let book of library) {
        if (visited.find(vBook => book.name === vBook.name && book.author === vBook.author && vBook.genre === book.genre)) continue;

        const container = document.createElement("div");
        container.innerHTML = `<p class="name" data-content="${book.name}">Name: ${book.name}</p><p class="author" data-content="${book.author}">Author: ${book.author}</p><p class="genre" data-content="${book.genre}">Genre: ${book.genre}</p>`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("removeBtn");
        deleteBtn.addEventListener("click", removeBtnOnClick);

        const changeBtn = document.createElement("button");
        changeBtn.textContent = "Change";
        changeBtn.classList.add("changeBtn");
        changeBtn.addEventListener("click", changeBtnOnClick);

        cardContainer.appendChild(container);
        container.appendChild(deleteBtn);
        container.appendChild(changeBtn);
        visited.push(book);
    }
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(nameInput.value.length > 0 && authorInput.value.length > 0 && authorInput.value.length > 0)
    {
        if(e.target.textContent === "Change")
        {
            const index = e.target.getAttribute("data-link");

            let currIndex = 0;

            for(let card of document.querySelectorAll(".card-container > *"))
            {
                if(currIndex == index)
                {
                    card.querySelector("p.name").textContent = `Name: ${nameInput.value}`;
                    card.querySelector("p.author").textContent = `Author: ${authorInput.value}`;
                    card.querySelector("p.genre").textContent = `Genre: ${genreInput.value}`;

                    return;
                } 

                currIndex++;
            };
        }
        else
        {
            addBookToLibrary(nameInput.value, authorInput.value, genreInput.value);
        }
    }

    updateCards();
});

