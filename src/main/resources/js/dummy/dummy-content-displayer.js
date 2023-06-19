const greeting = new Greeting();

function getGreetingText(){
    let userName = document.getElementById("name").value;
    return greeting.greetingUser(userName);
}

function displayGreetingText(){
    let greatingText = getGreetingText();
    let greetingReultDiv = document.getElementById("greeting-result");
    greetingReultDiv.innerHTML = "";
    greetingReultDiv.innerHTML = greatingText;
}

function displayGreetingAtButtonClick(){
    document.getElementById("greeting-button").addEventListener("click", displayGreetingText);
}

displayGreetingAtButtonClick();