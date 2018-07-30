// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Api key
const apiKey = "04b16f6e801b4af7bcd41a973b7f4776";
// Init Auth
const auth = new Auth();
// Init Favorite news
const news = new FavoriteNews();
// Init news store
const newsStore = NewsStore.getInstance();

const categories = [
    {
        title: 'Business',
        value: 'business'
    },
    {
        title: 'Entertainment',
        value: 'entertainment'
    },
    {
        title: 'Health',
        value: 'health'
    },
    {
        title: 'Science',
        value: 'science'
    },
    {
        title: 'Sports',
        value: 'sports'
    },
    {
        title: 'Technology',
        value: 'technology'
    }
];

let resources = [];
(function () {
    http.get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
        .then(response => {
            for (let i = 0; i < 10; i++) {
                resources.push({title: response.sources[i].name, value: response.sources[i].id})
            }
            ui.createSelect(resources, 'sources', 'afterbegin');
            $(document).ready(function () {
                $('select').formSelect();
            });
        })
        .catch(err => ui.showError(err))
}());

// Init elements
const select = document.getElementById("country");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const container = document.querySelector('.news-control .container');
const logout = document.querySelector('.logout');
const newsContainer = document.querySelector('.news-container');


// All events
searchBtn.addEventListener("click", onSearch);
container.addEventListener('change', onChoice);
logout.addEventListener("click", onLogout);
newsContainer.addEventListener("click", addFavorite);


//Check auth state
firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        window.location = 'login.html';
    }
});

function onChoice(e) {
    if (e.target.id === "country") {
        resetOptions(document.querySelector('#sources'), document.querySelector('#category'));
        onChange("country");
        document.querySelector('.category').style.display = 'block';
    }
    else if (e.target.id === "sources") {
        document.querySelector('.category').style.display = 'none';
        resetOptions(select, document.querySelector('#category'));
        onChange("sources");
    }
    else if (e.target.id === "category") {
        resetOptions(document.querySelector('#sources'));
        onChange("category");
    }

}

document.addEventListener("DOMContentLoaded", function () {
    //генерируем select
    // ui.createSelect(resources, 'sources', 'afterbegin');

    //генерируем select категорий
    ui.createSelect(categories, 'category', 'beforeend');
    document.querySelector('.category').style.display = 'none';

});


// Event handlers
function onChange(val) {
    let selectChoice = document.getElementById(val);
    let url;
    ui.showLoader();
    if (val === "category") {
        url = `https://newsapi.org/v2/top-headlines?${select.id}=${select.value}&${val}=${selectChoice.value}&apiKey=${apiKey}`
    } else {
        url = `https://newsapi.org/v2/top-headlines?${val}=${selectChoice.value}&apiKey=${apiKey}`;
    }

    http.get(url)
        .then(response => {
            if (response.totalResults) {
                ui.clearContainer();
                // перебираем новости из поля articles в объекте response
                response.articles.forEach((news, index) => ui.addNews(news, index));
                // сохраняем новости в хранилище news-store
                newsStore.setNews(response.articles);

            } else {
                val === 'category' ? ui.showInfo(`Новости по ${selectChoice.value} по стране ${select.value} не найдены`) :
                    ui.showInfo(`Новостей по ${selectChoice.value} не найдено!`);
            }
        })
        .catch(err => ui.showError(err));
}


function onSearch(e) {
    ui.showLoader();
    http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)
        .then(response => {
            if (response.totalResults) {
                ui.clearContainer();
                response.articles.forEach(news => ui.addNews(news));
            } else ui.showInfo('По вашему запрсу новостей не найдено!');
        })
        .catch(err => ui.showError(err));
}


function resetOptions() {
    Array.prototype.slice.apply(arguments).forEach(item => item[0].selected = true);
    $('select').formSelect();
}

function onLogout() {
    auth.logout()
        .then(() => window.location = "login.html")
        .catch(err => console.log(err));
}

function addFavorite(e) {
    e.target.setAttribute("disabled", true);
    if (e.target.classList.contains('add-favorite')) {
        const index = e.target.dataset.index;
        const oneNews = newsStore.getNews()[index];
        news.addFavoriteNews(oneNews)
            .then(data => {
                // вывод сообщения об успешном добавлении новости в избранное
                M.toast({html: 'News added to favorites!', classes: 'deep-orange darken-1', displayLength: 5000});
            })
            .catch(err => {
                console.log(err);
            })
    }
}