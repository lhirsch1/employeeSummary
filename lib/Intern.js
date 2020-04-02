//import Employee class
const Employee = require('./Employee');

//intern is subclass of employee
class Intern extends Employee{

    constructor(name, id, email, school){
        //gets name/id/email from superclass
        super(name, id, email);
        //intern specific information
        this.school = school
    }
    //get school is specific to employees who are also interns
    getSchool(){

        if(!this.schoool){
            console.log("No School entered");
        }
        else{
            return this.school;
        }
    }

     //override getrole from employee to return intern
    getRole(){
        return "Intern"
    }
   
}

module.exports = Intern;