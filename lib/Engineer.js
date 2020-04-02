//import Employee class
const Employee = require('./Employee');

//Engineer is subclass of employee
class Engineer extends Employee{

    constructor(name, id, email, github){
         //gets name/id/email from superclass employee
        super(name, id, email);
        //engineer specific info
        this.github = github;
    }
    //getGithub is specific to emps who are engineers
    getGithub(){

        if(!this.github){
            console.log("No GitHub username entered");
        }
        else{
            return this.github;
        }
    }
    //override getrole to return engineer
    getRole(){
        return "Engineer"
    }
    
}


module.exports = Engineer;