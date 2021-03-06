
//Creating super class employee
//all other classes will inherit from Employee
class Employee{
    //contructor function
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    //class methods
    getName(){
        if(!this.name){
            console.log("No name entered")
        }
        else{
            return this.name;
        }
    
    }

    getId(){
        if(!this.id){
            console.log("No ID entered");
        }
        else{
            return this.id;
        }

    }

    getEmail(){
        if(!this.email){
            console.log("No email entered");
        }
        else{
            return this.email;
        }

    }

    getRole(){
        return "Employee";

    }
}
//exporting employee class
module.exports = Employee;