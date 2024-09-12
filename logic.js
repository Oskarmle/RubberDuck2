// shorthand for document.getElementById
function elementId(element) {
    return document.getElementById(element);
}

const button = elementId("box");

function playSound() {
    const duckSound = elementId("duckSound");
    duckSound.play();
}

// setTimeOut(function stopSound(){
//    duckSound.pause();
//    duckSound.currentTime = 0;
// }, 1000)

/////////////////////7 Creating a new li element inside the ul
function createProblem() {
    const submittedDate = new Date().toLocaleString("da-DK");

    const newProblemText = elementId("newProblem").value;
    const newLi = document.createElement("li");
    newLi.setAttribute("title", submittedDate);

    newLi.textContent = newProblemText;
    elementId("problemsList").appendChild(newLi);
    // playSound() // when commented out the sound won't play
}

elementId("addButton").addEventListener("click", function () {
    createProblem();
});

const duckImg = elementId("duck");

duckImg.addEventListener("mouseover", function () {
    const duckSound = elementId("duckSound");
    // duckSound.play();
});

duckImg.addEventListener("mouseout", function () {
    const duckSound = document.getElementById("duckSound");
    duckSound.pause();
});

// const username = prompt("TELL ME YOUR NAME!!!!")
// console.log(username);

//////////////////////// joke api
async function showJoke() {
    async function fetchJokes() {
        const response = await fetch(
            "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
        );
        const jokes = await response.json();
        return jokes;
    }

    const jokeObject = await fetchJokes();
    const newPara = document.createElement("p");
    const jokeBox = elementId("jokeBox");

    // console.log(jokeObject.joke);
    newPara.textContent = jokeObject.joke;
    newPara.setAttribute("id", "jokeP");
    jokeBox.appendChild(newPara);
    jokeBox.classList.add("show");

    setTimeout(function () {
        jokeBox.classList.remove("show");
        setTimeout(function () {
            elementId("jokeP").remove();
        }, 300);
    }, 2500);
}

const jokeBtn = elementId("jokeBtn");

jokeBtn.addEventListener("click", function () {
    showJoke();
    // console.log("joke button clicked");
});
