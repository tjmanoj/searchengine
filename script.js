let inputEl = document.getElementById("searchInput");
let resultContainer = document.getElementById("searchResults");
let load = document.getElementById('spinner');


function displayres(content) {
    let {
        title,
        href,
        link,
        description
    } = content;
    console.log(title)
    let container = document.createElement('div');
    let titleEl = document.createElement('a');
    titleEl.href = link;
    titleEl.textContent = content.title;
    container.appendChild(titleEl);
    container.appendChild(document.createElement('br'));

    let linkEl = document.createElement("a");
    linkEl.href = link;
    linkEl.textContent = link;
    container.appendChild(linkEl);
    container.appendChild(document.createElement('br'));

    let para = document.createElement("p");
    para.textContent = description;
    container.appendChild(para);

    load.classList.add('d-none')
    resultContainer.appendChild(container);

}

function search() {
    let options = {
        method: "GET"
    }
    let url = "https://apis.ccbp.in/wiki-search?search=" + inputEl.value;
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                search_results
            } = jsonData;
            for (let each_ele of search_results)
                displayres(each_ele);
        })
}

inputEl.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        load.classList.remove('d-none');
        resultContainer.textContent = "";
        search();
    }
})