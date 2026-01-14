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
for (let i=0; i<skills.length; i++) {
    var skill = document.createElement("li");
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}