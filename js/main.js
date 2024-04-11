async function searchUsers() {
    try {
        const response = await axios.get('https://api.github.com/search/users', {
            params: {
                q: searchText.value
            },
            headers: {
                "Authorization": `Bearer ${window.config.token}`,
                "X-GitHub-Api-Version": "2022-11-28"
            }
        });

        let data = response.data;
        console.log(data);
        displayUsers(data.items);
        return data;
    } catch (error) {
        console.error("Si è verificato un errore durante la richiesta:", error);
        throw error;
    }
}


async function searchRepositories() {
    try {
        const response = await axios.get('https://api.github.com/search/repositories', {
            params: {
                q: searchText.value
            },
            headers: {
                "Authorization": `Bearer ${window.config.token}`,
                "X-GitHub-Api-Version": "2022-11-28"
            }
        });

        let data = response.data;
        console.log(data);
        displayRepositories(data.items);
        return data;
    } catch (error) {
        console.error("Si è verificato un errore durante la richiesta:", error);
        throw error;
    }
}

let searchText = document.getElementById("searchText");
let selectBar = document.getElementById("selectBar");
let searchButton = document.getElementById("searchButton");
let containerCard = document.getElementById("containerCard");
let searchError = document.getElementById("searchError");

searchText.addEventListener("input", function () {
    console.log("Valore dell'input searchText:", searchText.value);
});

function displayUsers(users) {
    containerCard.innerHTML = "";
    if (users.length === 0) {
        searchError.innerHTML = "Nessun utente trovato";
        searchError.classList.remove("d-none");
        return;
    }

    users.forEach(item => {
        const cardTypeClass = item.type == "User" ? "bg-user" : "bg-organization";

        const cardElement =
            `<div class="user col-lg-6 col-xl-3">
                <div class="card ${cardTypeClass} m-4">
                    <div class="card-header">
                        <img src="${item.avatar_url}" class="card-img bg-white my-rounded" alt="${item.login}">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div class="mb-5">
                            <h5 class="card-title">${item.login}</h5>
                            <p class="card-text mt-2"><strong>Profilo: </strong>${item.type}</p>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-center">
                        <a href="${item.html_url}" target="_blank" class="btn btn-secondary">Vai al profilo</a>
                    </div>
                </div>
            </div>`;

        containerCard.innerHTML += cardElement;
    });
}

/* 
Milestone 3
Integriamo una validazione minimale: la ricerca deve partire solo se l’utente ha digitato almeno 3 caratteri.
Mostriamo un messaggio in caso non venga restituito nessun risultato (es. non esiste una repo con il nome che è stato cercato).
Aggiungiamo un loader che sarà mostrato mentre siamo in attesa di ottenere i risultati.
 */

function displayRepositories(repositories) {
    containerCard.innerHTML = "";
    if (repositories.length === 0) {
        searchError.innerHTML = "Nessuna repository trovata";
        searchError.classList.remove("d-none");
        return;
    }

    repositories.forEach(item => {
        const cardElement =
            `<div class="repository col-lg-6 col-xl-3">
                <div class="card bg-repository m-4">
                    <div class="card-header">
                        <img src="${item.owner.avatar_url}" class="card-img bg-white my-rounded" alt="${item.owner.login}">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div class="mb-5"> 
                        <h5 class="card-title">${item.full_name}</h5>
                        <p class="card-title mt-2">${item.description}</p>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-center">
                        <a href="${item.html_url}" target="_blank" class="btn btn-secondary">Vai alla repository</a>
                    </div>
                </div>
            </div>`;

        containerCard.innerHTML += cardElement;
    });
}

function search() {
    if (selectBar.value == "user" && searchText.value.length >= 3) {
        searchUsers();
        searchError.classList.add("d-none");

    } else if (searchText.value.length < 3) {
        searchError.innerHTML = "La ricerca deve avere almeno 3 caratteri";
        searchError.classList.remove("d-none");
        containerCard.innerHTML = "";

    } else if (selectBar.value == "repository") {
        searchRepositories();
        searchError.classList.add("d-none");
    } else if (searchText.value.length >= 3 && selectBar.value != "user" && selectBar.value != "repository") {
        searchError.innerHTML = "Seleziona 'User' o 'Repository'";
        searchError.classList.remove("d-none");
        containerCard.innerHTML = "";
    }
}



