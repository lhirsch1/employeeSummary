//import Employee class
const Employee = require('./Employee');

//manager is a subclass of employee
class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        //gets name/id/email from superclass
        super(name, id, email);
        this.officeNumber = officeNumber
    }
    //method specific to emps who are managers
    getOfficeNumber(){

        if(!this.officeNumber){
            console.log("No office number entered");
        }
        else{
            return this.officeNumber;
        }
    }
//get role is over ridden to return manager
    getRole(){
        return "Manager"
    }
    

}

module.exports = Manager;