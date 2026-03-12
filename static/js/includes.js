function loadHTML(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            console.log(123)
            document.getElementById(id).innerHTML = html;
        })
        .catch(err => console.error("Include error:", err));
}

loadHTML("header", "/static/partials/header.html");
