// ***************************** create user ******************************
// shorthand for document.getElementById
function elementId(element){
    return document.getElementById(element)
}

const createUserBtn = elementId("createUserBtn");
const username = elementId("username");
const userPassword = elementId("userPassword");
const userEmail = elementId("userEmail");

function valUser() {
    const newUsername = username.value;
    const newPassword = userPassword.value;
    const newEmail = userEmail.value;

    // if (
    //     newUsername.length < 8 &&
    //     newPassword.length > 7 &&
    //     newEmail.includes("@") &&
    //     newEmail.includes(".")
    // ) {
    //     console.log("You did everything correct!");
    // } else {
    //     alert("You did something wrong");
    // }

    const emailCon = newEmail.includes("@") && newEmail.includes(".");
    const usernameCon = newUsername.length > 6;
    const passwordCon = newPassword.length > 6;

    if (emailCon && usernameCon && passwordCon) {
        console.log("You did everything correct!");
    } else {
        alert("you did something wrong!");
    }
}

createUserBtn.addEventListener("click", function (e) {
    e.preventDefault();
    valUser();
});
