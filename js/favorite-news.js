// Init UI
const ui = new UI();
// Api key
const apiKey = "9c27b0f722b84da5a08312d2b125351b";
// Init Auth
const auth = new Auth();
// Init Favorite news
const news = new FavoriteNews();
// Init news store
const newsStore = NewsStore.getInstance();


// Init elements
const logout = document.querySelector('.logout');
const newsContainer = document.querySelector('.news-container');



// All events
window.addEventListener("load", onLoad);
logout.addEventListener("click", onLogout);
newsContainer.addEventListener("click", onRemoveFavorite);


function onLoad(e) {
    // получить избранные новости
    news.getFavoriteNews()
        .then(favoriteNews => {
            if(favoriteNews.docs.length){
            favoriteNews.forEach((doc) => {
                // выводим в разметку
                ui.addFavoriteNews(doc.data(), doc.id);
            });
            }else ui.showInfo('No Selected News!');
        })
        .catch(err => {
            console.log(err);
        })
}

function onLogout() {
    auth.logout()
        .then(() => window.location = "favorite-news.html")
        .catch(err => console.log(err));
}

function onRemoveFavorite(e) {
    e.target.setAttribute("disabled", true);
    if (e.target.classList.contains("remove-favorite")) {
        const id = e.target.dataset.id;
        console.dir(id);
        news.removeFavoriteNews(id)
            .then(() => {
                // вывод сообщения об удалении новости
                M.toast({html: 'The news was deleted!', classes: 'red', displayLength: 1000});
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch(err => console.log(err));
    }
}


