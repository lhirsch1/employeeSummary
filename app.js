//importing classes and libraries
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

//gets filepath for output folder where html file will be generated
const OUTPUT_DIR = path.resolve(__dirname, 'output')
//generates team html file
const outputPath = path.join(OUTPUT_DIR, 'team.html');



const render = require('./lib/htmlRenderer');

//add emps and manager to office
//add office to company

let teamMembers = [];

//question array for inquirer
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
        //validation for id number
        validate : answer =>{
            //first checks against regex to make sure only numeric characters are entered
           const valid = answer.match(
                `^[0-9]*$` );
                if (valid){
                    //if the input passes the regex test, it is checked against the other employee's IDs to make sure that it is unique
                   for(i=0;i<teamMembers.length;i++){
                       if(answer === teamMembers[i].id){
                           return 'Please enter a unique id'
                       }
                   }
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
            //validation checks against regex to make sure email is formatted correctly. string @ string . string
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

//start function is ran on load
function start(){
    //asks user which branch they would like to edit
    inquirer.prompt({
        //first question asks branch
        type: 'list',
        message : 'Which branch would you like to edit?',
        choices : ['New York', 'Seattle', 'Minneapolis'],
        name : 'branch'
    }).then(function(data){
        //gets branch name from previous question
        var branchName = data.branch;
        //asks if user would like to view or edit current team. 
        //as of right now, only edit is functional. view will be updated once the database connection is made. 
        inquirer.prompt({
            type : 'list',
            message: `Would you like to view or edit the team members of the ${branchName} branch?`,
            choices : ['View','Edit'],
            name : 'editChoice'
        }).then(function(data){
            if(data.editChoice === 'View'){
                //view functionality will be updated once database integration is complete
                console.log('view functionality will be updated once database integration is complete');
            }
            else{
                //calls function to add manager
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
        //calls function
        newMemberPrompt();
    })

}

//this function asks the user if they would like to add another team member
function newMemberPrompt(){
    //user prompts
    inquirer.prompt(
        {
            type : 'list',
            message : 'Would you like to add a team member?',
            choices : ['Yes','No'],
            name : 'addMember'
        }
    ).then(function(data){
        //adds new member
        if (data.addMember === 'Yes'){
            addTeamMember();
        }
        //if the user says that they do not want to add another team member, renderTeam function is called
        else{
            renderTeam();
        }
    })
}

//this function is used to create engineers and interns
function addTeamMember(){
    //questions array is passed into inquirer
    inquirer.prompt(questions).then(function (data) {
        //switch case is based on employee's role
        //creates appropriate object and adds object to the teamMembers array
        //finally, it calls the function to prompt for a new team member
        switch (data.role) {
            case 'Engineer':
                const engineer = new Engineer(data.name, data.id, data.email, data.github);
                teamMembers.push(engineer);
                newMemberPrompt();
                break;
            case 'Intern':
                const intern = new Intern(data.name, data.id, data.email, data.school);
                teamMembers.push(intern);
                newMemberPrompt();
                break;
    
            default:
                break;
        }
    })
}

//renderteam is called and html is generated
function renderTeam(){
    fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
    console.log('output dir :',OUTPUT_DIR)
};
start();

