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

searchText.addEventListener("input", function () {
    console.log("Valore dell'input searchText:", searchText.value);
});

function displayUsers(users) {
    containerCard.innerHTML = "";

    users.forEach(item => {
        const cardElement =
            `<div class="user col-3">
                <div class="card bg-user m-4">
                    <div class="card-header">
                        <img src="${item.avatar_url}" class="card-img my-rounded" alt="${item.login}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title my-5">Nome: ${item.login}</h5>
                        <a href="${item.html_url}" target="_blank" class="btn btn-secondary">Vai al profilo</a>
                    </div>
                </div>
            </div>`;

        containerCard.innerHTML += cardElement;
    });
}

function displayRepositories(repositories) {
    containerCard.innerHTML = "";

    repositories.forEach(item => {
        const cardElement =
            `<div class="repository col-3">
                <div class="card bg-repository m-4">
                    <div class="card-header">
                        <img src="${item.owner.avatar_url}" class="card-img my-rounded" alt="${item.owner.login}">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div class="mb-5"> 
                        <h5 class="card-title">${item.full_name}</h5>
                        <p class="card-title mt-2">${item.description}</p>
                        </div>
                        <a href="${item.html_url}" target="_blank" class="btn btn-secondary">Vai al profilo</a>
                    </div>
                </div>
            </div>`;

        containerCard.innerHTML += cardElement;
    });
}

searchButton.addEventListener("click", function () {


    if (selectBar.value == "user") {
        searchUsers();

    } else if (selectBar.value == "repository") {
        searchRepositories();
    }
});



