var imagesLazy = 12;

function addListener() {
  window.addEventListener('scroll', lazy);
  showHideLoader(true);
}

function copyCat(number) {
  while(number > 0) {
    number--;
    loadCats();
  }
}

function lazy () {
  if((window.innerHeight + window.scrollY) > document.body.offsetHeight) {
    window.removeEventListener('scroll', lazy);
    new Promise((resolve) => {setTimeout(loadCats, 1000);}).then(addListener());
  }
}

function loadCats() {
  let apiCat = "https://cataas.com";
  showHideLoader();
  fetch(apiCat  + "/cat?json=true")
    .then(response => response.json())
    .then(json => {
      let parent = document.getElementById("lazyImgContainer");
      let li = document.createElement("li");
      let img = document.createElement("img");
      img.src = apiCat + json.url;
      li.append(img);
      parent.append(li);
    })
    .catch(function(err) {
        console.error(err);
    });
}

function showHideLoader(show) {
  document.getElementById("loader").style.display = show ? "block" : "none";
}

(function() {
  copyCat(imagesLazy);
  addListener();
})();
