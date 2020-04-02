const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//add emps and manager to office
//add office to company

let companyStaff = {}

let teamMembers = [];


const questions = [
    {
        type: "input",
        message: "Enter member's name ",
        name: "name"
    },
    {
        type: "list",
        message: "Select member's role",
        choices: ["Engineer", "Intern"],
        name: "role"
    },
    {
        type: "input",
        message: "Enter id number",
        name: "id",
        validate : answer =>{
           const valid = answer.match(
                `^[0-9]*$` );
                if (valid){
                    return true
                }
                return 'Please enter a number'
        }
    },
    {
        type: 'input',
        message: 'Enter email',
        name: 'email',
        validate: answer => {
            const valid = answer.match(
              /\S+@\S+\.\S+/
            );
            if (valid) {
              return true;
            }
            return 'Please enter a valid email address';
          }
    },
    {
        type: 'input',
        message: 'Enter GitHub username',
        name: 'github',
        when: function (answers) {
            return answers.role === 'Engineer';
        }
    },
    {
        type: 'input',
        message: "Enter new intern's School",
        name: 'school',
        when: function (answers) {
            return answers.role === 'Intern'
        }
    }
]
//add team member​
//if statement if add another is true call addTeamMember again else don't
function buildTeam(){
    //which branch would you like to view?
    inquirer.prompt({
        type: 'list',
        message : 'Which branch would you like to edit?',
        choices : ['New York', 'Seattle', 'Minneapolis'],
        name : 'branch'
    }).then(function(data){
        var branchName = data.branch;
        inquirer.prompt({
            type : 'list',
            message: `Would you like to view or edit the team members of the ${branchName} branch?`,
            choices : ['View','Edit'],
            name : 'editChoice'
        }).then(function(data){
            if(data.editChoice === 'View'){
                console.log('view');
            }
            else{
                addManager(branchName);
            }
        })
    
    })   
}

//add manager function
function addManager(branch){

    //The questions for managers are differnet than engineers and interns. 
    //Since we already know that they are the manager, we do not need to ask the role question. 
    //We are also asking a slightly different name question
    const managerQuestions = [
        {
            type : 'input',
            message : `What is the name of the ${branch} branch manager?`,
            name : 'name'
        },
        //pulling questions out of the standard question array
        questions[2],
        questions[3],
        questions[4]
    ]

    //using inquirer to prompt user for info about manager
    inquirer.prompt(managerQuestions).then(function(data){
        const manager = new Manager(data.name, data.id, data.email, branch)
        //pushes new manager object into team member array
        teamMembers.push(manager);
        newMemberPrompt();
    })

}

function newMemberPrompt(){

    inquirer.prompt(
        {
            type : 'list',
            message : 'Would you like to add a team member?',
            choices : ['Yes','No'],
            name : 'addMember'
        }
    ).then(function(data){
        if (data.addMember === 'Yes'){
            addTeamMember();
        }
        else{
            console.log('final team ' ,teamMembers)
            renderTeam();
        }
    })
}

function addTeamMember(){
    inquirer.prompt(questions).then(function (data) {

        //switch case is based on employee's role
        //creates appropriate object and adds object to the teamMembers array
        //finally, it calls the function to prompt for a new team member
        switch (data.role) {
            case 'Engineer':
                const engineer = new Engineer(data.name, data.id, data.email, data.github);
                console.log("i'm an engineer ", engineer)
                teamMembers.push(engineer);
                console.log('current team members : ', teamMembers)
                newMemberPrompt();
                break;
            case "Intern":
                const intern = new Intern(data.name, data.id, data.email, data.school);
                console.log("i'm an intern ", intern)
                teamMembers.push(intern);
                console.log('current team members : ', teamMembers)
                newMemberPrompt();
                break;
    
            default:
                break;
        }
    })
}

function renderTeam(){
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
};
buildTeam();
// // Write code to use inquirer to gather information about the development team members,
// // and to create objects for each team member (using the correct classes as blueprints!)
// ​
// // After the user has input all employees desired, call the `render` function (required
// // above) and pass in an array containing all employee objects; the `render` function will
// // generate and return a block of HTML including templated divs for each employee!
// ​
// // After you have your html, you're now ready to create an HTML file using the HTML
// // returned from the `render` function. Now write it to a file named `team.html` in the
// // `output` folder. You can use the variable `outputPath` above target this location.
// // Hint: you may need to check if the `output` folder exists and create it if it
// // does not.
// ​
// // HINT: each employee type (manager, engineer, or intern) has slightly different
// // information; write your code to ask different questions via inquirer depending on
// // employee type.
// ​
// // HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// // and Intern classes should all extend from a class named Employee; see the directions
// // for further information. Be sure to test out each class and verify it generates an 
// // object with the correct structure and methods. This structure will be crucial in order
// // for the provided `render` function to work!```
