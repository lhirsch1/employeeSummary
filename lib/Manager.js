// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber
    }
    getOfficeNumber(){

        if(!this.officeNumber){
            console.log("No office number entered");
        }
        else{
            return this.officeNumber;
        }
    }

    getRole(){
        return "Manager"
    }
    //get role is over ridden to return manager

}

module.exports = Manager;