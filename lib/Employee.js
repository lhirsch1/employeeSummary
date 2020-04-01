// TODO: Write code to define and export the Employee class

class Employee{

    constructor(name, id, email){
        //validate data here if/throw



        this.name = name;
        this.id = id;
        this.email = email;
    }

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

module.exports = Employee;