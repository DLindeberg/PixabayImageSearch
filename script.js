let inputColor = document.querySelector("#colors");
let inputText = document.querySelector(".userInput");
let exeButton = document.querySelector('#executeButton');
let next = document.querySelector("#next");
let previous = document.querySelector("#previous");
let pageNumber = 1;
let buttonclick = 0;
let elementNo = document.querySelector("#resultgrid");
let fixedColor = inputColor.value
let form = document.querySelector('form');



form.onsubmit = event => {
    event.preventDefault();
}

exeButton.onclick = async function (event) {
    document.querySelector("#resultgrid").innerHTML = ""
    buttonclick++;
    pageNumber = 1;
    let data = SearchPhotos();
    ManipulateDOM(await data);
}
async function SearchPhotos() {
    let fetchUrl = "";
    if (inputColor.value == "anycolor") {
        let params = new URLSearchParams({
            key: "25706674-b9c01a86dee6bf80ba5a5b48f",
            q: inputText.value,
            per_page: 10,
            page: pageNumber,
        });
        fetchUrl = "https://pixabay.com/api/?" + params.toString();
        let response = await fetch(fetchUrl);
        return response.json();
    }
    else {
        let params = new URLSearchParams({
            key: "25706674-b9c01a86dee6bf80ba5a5b48f",
            q: inputText.value,
            colors: inputColor.value,
            per_page: 10,
            page: pageNumber,
        });
        fetchUrl = "https://pixabay.com/api/?" + params.toString();
        let response = await fetch(fetchUrl);
        return response.json();
    }
}
async function ManipulateDOM(data){
    if (data.totalHits == 0) {
        const thisTitle = document.createElement("li");
        thisTitle.innerHTML = "No results found";
        document.querySelector("#resultgrid").appendChild(thisTitle)
        return;
    }
    let dataList = data.hits;
    for (let obj of dataList){
        const thisTitle = document.createElement("li");
        thisTitle.innerHTML = "<a href=" + obj.largeImageURL + "><img src=" + obj.webformatURL + "></img></a><p>Author: " + obj.user + "</p><p>Tags: " + obj.tags + "</p>";
        document.querySelector("#resultgrid").appendChild(thisTitle)
    }
    let maxPage = elementNo.childElementCount;
    next.onclick = async function (event) {
        if (maxPage == 10) {
            if (buttonclick == 0) {
                return;
            }
            else {
                if (fixedColor != inputColor.value) {
                        inputColor.value = fixedColor;
                }
                pageNumber++;
                document.querySelector("#resultgrid").innerHTML = ""
            }
        }
        else {
            return;
        }
    }
    previous.onclick = async function (event) {
        if (pageNumber == 1) {
            return;
        }
        else {
            if (fixedColor != inputColor.value) {
                inputColor.value = fixedColor;
            }
            pageNumber--;
            document.querySelector("#resultgrid").innerHTML = ""
            let data = SearchPhotos();
            ManipulateDOM(await data);
        }
    }
};