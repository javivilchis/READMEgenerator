// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
// run npm init -y
// Install the necessary modules:
// 1. npm install inquirer
// 2. npm install fs
// run the app
// node index.js

inquirer
  .prompt([
     {
          type: 'input',
          message: 'What is the title of your project?',
          name: 'title',
     },
     {
          type: 'input',
          message: 'Write a brief description about your project.',
          name: 'description',
     },
     {
          type: 'input',
          message: 'What is the usage of your project?',
          name: 'usage'
     },
     {
          type: 'input',
          message: 'what is your name?',
          name: 'name',
     },
     {
          type: 'input',
          message: 'what is your email?',
          name: 'email',
     },
     {
          type: 'checkbox',
          message: 'please select what sections to include in your project',
          name: 'tableofcontents',
          choices: [
               "Installation",
               "Usage",
               "Process",
               "Contribution",
               "License",
               "Question"
          ]
     },
     {
          type: 'checkbox',
          message: 'What type of license?',
          name: "license",
          choices: [
               "Apache",
               "Academic",
               "GNU",
               "ISC",
               "MIT",
               "Mozilla",
               "Open"
           ]
     },
     {
          type: 'input',
          message: 'What is the process of getting the app installed?',
          name: 'installation',
     },
     {
          type: 'input',
          message: 'What is your GitHub URL?',
          name: 'github',
     },
     {
          type: 'input',
          message: 'How to test instructions',
          name: 'test',
     },
     {
          type: 'input',
          message: 'How can people contribute.',
          name: 'contribute',
     },
  ])
  .then(
     (response) => {
          const pageContent = createMarkup(response);
          const filename = "README.md";
          

          fs.writeFile(filename, pageContent, (err) =>
          err ? console.error(err) : console.log('Your Page Has Been Generated! Please exit on your right.'))
       
     });
 
// title of project
// Description

// TOC
// installation
// usage
// license
// contributing
// tests
// questions


var createMarkup = (response) =>{
//create table of contents from response

let pageToc += `## Table of contents`;
if (response.installation !== '') { pageToc += `
* [Installation](#installation)` };

if (response.usage !== '') { pageToc += `
* [Usage](#usage)` };

if (response.process !== '') { pageToc += `
* [Contributing](#contributing)` };

if (response.contribution !== '') { pageToc += `
* [Tests](#testing)` };

if (response.questions !== '') { pageToc += `
* [Questions](#questions)` };

// Initial requirement
// Generate markdown for the top required portions of the README
let pageMarkup = 
`# ${response.title}

<br>

![badge](https://img.shields.io/badge/license-${response.license}-brightgreen)<br />

## Description 

*The objective of this project:* 

${response.description}<br>`;
// add Table of contents
pageMarkup += pageToc;

// create installation
pageMarkup += `
## Installation
${response.installation}`;
// create usage
pageMarkup += `
## Usage 
  
*Instructions and examples for use:*
${response.usage}`;

// create process
pageMarkup += `
${response.process}`;

// create contribution
console.log("contribute: ",response.contribute);
if(response.contribute !== ''){
     pageMarkup +=`
## contributing
  
*If you would like to contribute it, you can follow these guidelines for how to do so.*
${response.contribute}`;
}
// Test
pageMarkup += `
## Testing
*Please follow these directions to test the app.
${response.test}`;

// contact
pageMarkup += `
## Questions

*If you have a concern or input abou the project, you can contact:*
<br>
${response.name} :  [Email](${response.email})`;
//return markdown
return pageMarkup; 
}
