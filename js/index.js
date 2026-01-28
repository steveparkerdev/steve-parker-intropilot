// Create a footer element
const aFooter = document.createElement("footer");
aFooter.className = "footer";
aFooter.setAttribute("id", "myFooter");
document.body.appendChild(aFooter);

// Get current date
const today = new Date();
const thisYear = today.getFullYear();

// Find the added footer element
var newFooter = document.querySelector("footer");
console.log(newFooter);

// Create the copyright
const aCopyright = document.createElement("P");
const copyrightSymbol = "\u00A9";
aCopyright.textContent = `${copyrightSymbol} Steve Parker ${thisYear}`;

// Append copyright to footer
newFooter.appendChild(aCopyright);

// Skills section list
const skills = ["Git", "GitHub", "HTML", "CSS", "JavaScript"];

// Find the skills section and unordered list
const skillsSection = document.querySelector("#skills-section");
var skillsList = skillsSection.getElementsByTagName("ul")[0];
for (let i = 0; i < skills.length; i++) {
    var skill = document.createElement("li");
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}

// Create messageForm variable that selects the form
const messageForm = document.querySelector("form[name='leave_message']");
console.log(messageForm);

// Add a submit event listener to messageForm
messageForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents refresh upon submitting

    // Retrieve values from the form fields
    const usersName = event.target.usersName.value.trim();
    const usersEmail = event.target.usersEmail.value.trim();
    const usersMessage = event.target.usersMessage.value.trim();

    // Log the values
    console.log(usersName, usersEmail, usersMessage);

    const messageSection = document.querySelector("#messages");
    const messageList = document.querySelector("#messages ul");

    // Create a new message
    const newMessage = document.createElement("li");
    newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>
        <span> - ${usersMessage}</span>
    `;

    // Create a remove button
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function () {
        const entry = removeButton.parentNode;
        entry.remove();
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    // Resets form
    messageForm.reset();
});

// Get the repositories from github
fetch("https://api.github.com/users/steveparkerdev/repos")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return response.json(); // Parse the response as JSON
    })

    // Get the data and add it to the html
    .then((data) => {
        console.log("json data =", data);
        repositories = [...data];
        console.log("repositories array =", repositories);

        // Find the project section and ul
        const projectSection = document.getElementById("projects-section");
        const projectList = projectSection.querySelector("ul");

        // Create the repositories list by adding it to the html
        for (let i = 0; i < repositories.length; i++) {
            var project = document.createElement("li");
            project.className = "projects-list";

            // Repo card
            var card = document.createElement("div");
            card.className = "project-card";

            // Repo name
            var repoName = document.createElement("h3");
            repoName.textContent = repositories[i].name;
            repoName.className = "repo-name";

            // Repo description
            var repoDescription = document.createElement("p");
            repoDescription.textContent = repositories.description || "No description provided";
            repoDescription.className = "repo-description";

            // Append name and description to the card
            card.appendChild(repoName);
            card.appendChild(repoDescription);

            // Append card to li, then li to ul
            project.appendChild(card);
            projectList.appendChild(project);
        }
    })
    .catch ((error) => {
    console.error("Error fetching repositories:", error);
});

