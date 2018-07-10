class UI {
    constructor() {
        this.container = document.querySelector(".news-container .container .row");
    }

    addNews(news) {
        const template = `
      <div class="col s12 m6">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
    `;

        this.container.insertAdjacentHTML("beforeend", template);
    }

    clearContainer() {
        this.container.innerHTML = "";
    }

    showLoader() {
        this.clearContainer();

        const template = `
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
    `;
        this.container.insertAdjacentHTML("beforeend", template);
    }

    showInfo(msg) {
        this.clearContainer();

        const template = `
      <div class="card blue lighten-4">
        <div class="card-content">
            <p>${msg}</p>
        </div>
      </div>
    `;
        this.container.insertAdjacentHTML("beforeend", template);
    }

    showError(err) {
        this.clearContainer();

        const template = `
      <div class="card red lighten-1">
        <div class="card-content">
            <span class="card-title">Error:</span>
            <p>${err}</p>
        </div>
      </div>
    `;
        this.container.insertAdjacentHTML("beforeend", template);
    }


    // генерируем селект
    createSelect(arr, className, position) {
        let row = document.querySelector('.row.wrapper');
        let div = document.createElement('div');
        div.className = `input-field col s12 ${className}`;
        row.insertAdjacentElement(position, div);

        let select = document.createElement('select');
        select.setAttribute('id', className);
        select[0] = new Option();
        select[0].innerHTML = `Choose ${className}`;
        select[0].disabled = true;
        select[0].selected = true;

        arr.forEach((item, i) => select[i + 1] = new Option(item.title, item.value));
        div.appendChild(select);
    }

    showAlert(message, type) {
        // Create markup
        const alert = `
      <div class="card alert ${type === 'error' ? 'red' : 'green'}">
        <div class="card-content white-text">
          <span class="card-title">${type === 'error' ? 'Error' : 'Success'}</span>
          <p>${message}</p>
        </div>
      </div>
    `;

        // Get title
        const cardTitle = document.querySelector('.card-title');
        // Get button
        const btn = document.querySelector('form button');
        // Disabled btn
        btn.disabled = true;

        // Insert alert
        cardTitle.insertAdjacentHTML('afterend', alert);

        setTimeout(function () {
            document.querySelector('.alert').remove();
            btn.disabled = false;
        }, 3000);
    }
}