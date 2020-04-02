// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Engineer extends Employee{

    constructor(name, id, email, github){
        super(name, id, email);
        this.github = github;
    }

    getGithub(){

        if(!this.github){
            console.log("No GitHub username entered");
        }
        else{
            return this.github;
        }
    }

    getRole(){
        return "Engineer"
    }
    //override getrole to return engineer
}


module.exports = Engineer;