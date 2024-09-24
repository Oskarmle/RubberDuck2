// shorthand for document.getElementById
function elementId(element) {
    return document.getElementById(element);
}

const button = elementId("box");

// function playSound() {
//     const duckSound = elementId("duckSound");
//     // duckSound.play();
// }

// Post data to mongoDB
async function createProblem() {
    const message = document.getElementById("newProblem").value;
    console.log(message);

    const url = "http://127.0.0.1:3002/messages";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}

elementId("addButton").addEventListener("click", async function (e) {
    e.preventDefault();
    await createProblem();
});

// GET request when window loads
async function getProblems() {
    const url = "http://127.0.0.1:3002/messages";
    try {
        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // Check Content-Type header to determine how to handle the response
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            const json = await response.json(); // Parse as JSON
            console.log(json);
        } else {
            const text = await response.text(); // Parse as plain text
            console.log('Non-JSON response:', text);
        }
    } catch (error) {
        console.error('Error during fetching problems:', error);
    }
}

//     const submittedDate = new Date().toLocaleString("da-DK");

//     const newProblemText = elementId("newProblem").value;
//     const newLi = document.createElement("li");
//     newLi.setAttribute("title", submittedDate);

//     newLi.textContent = newProblemText;
//     elementId("problemsList").appendChild(newLi);
// }

// async function getDuck() {}

const duckImg = elementId("duck");

duckImg.addEventListener("mouseover", function () {
    const duckSound = elementId("duckSound");
    // duckSound.play();
});

duckImg.addEventListener("mouseout", function () {
    const duckSound = document.getElementById("duckSound");
    // duckSound.pause();
});

window.addEventListener("load", async () => {
    await getProblems();
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
    }, 7500);
}

const jokeBtn = elementId("jokeBtn");

jokeBtn.addEventListener("click", function () {
    showJoke();
    // console.log("joke button clicked");
});
