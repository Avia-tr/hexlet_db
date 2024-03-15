import Employee from "./src/employee.js";

const EmployeeDb = {
  employees: [],
  getAllEmpls() {
    return this.employees.filter(employee => employee && employee.name)
      .sort((a, b) => a.name.localeCompare(b.name));
  },
  getEmplByName(name) {
    const employee = this.employees.find((employee) => employee.name === name);
    if (!employee) {
      throw new Error("Employee was not found");
    }
    return employee;
  },
  updateEmpl(employee, name, position, division) {
    employee.name = name;
    employee.position = position;
    employee.division = division;
  },
  deleteEmpl(employee) {
    const index = this.employees.indexOf(employee)
    if (index < 0) {
      throw new Error("Employee not found");
    }
    delete this.employees[index];
  },
  cloneEmpl(employee) {
    const { name, position, division } = { ...employee };
    const newEmployee = new Employee(name, position, division);
    return newEmployee;
  },
  getAllFilials() {
    const filials = [];
    for (const employee of this.employees) {
      const { division } = employee;
      if (!filials.includes(division)) {
        filials.push(division);
      }
    }
    return filials;
  },
  mergeDb(newDb) {
    newDb.employees.forEach((employee) => {
      if (!this.employees.some((emp) => Employee.compareEmpls(emp, employee))) {
        this.employees.push(employee);
      }
    });
  }
};


const dataBase1 = {
  __proto__: EmployeeDb,
  employees: [
    new Employee("Olga Nikolaeva", "Programmer", "Web"),
    new Employee("Ivan Ivanov", "Programmer", "Backend"),
    new Employee("Sergey Sulmenev", "Team Lead", "Backend"),
  ],
}

const dataBase2 = {
  __proto__: EmployeeDb,
  employees: [
    new Employee("Olga Nikolaeva", "Programmer", "Web"),
    new Employee("Ivan Ivanov", "Programmer", "Backend"),
    new Employee("Sergey Sulmenev", "Team Lead", "Backend"),
    new Employee("Oleg Novikov", "Product Owner", "Frontend"),
  ],
}

console.log('show all empls');
console.log(dataBase1.getAllEmpls());
console.log();
console.log();

console.log('show one employee');
const employee1 = dataBase2.getEmplByName("Ivan Ivanov");
console.log('capitalize and show all employees after that');
employee1.capitalizeName();
console.log(dataBase2.getAllEmpls());
console.log();
console.log();

console.log('show diffs');
const employee2 = dataBase1.getEmplByName("Ivan Ivanov");
console.log('are they the same? ', Employee.compareEmpls(employee1, employee2));
console.log();
console.log();

console.log('remove employee from dataBase1');
dataBase1.deleteEmpl(employee2);
console.log(dataBase1.getAllEmpls());
console.log();
console.log();

console.log('clone employee from dataBase2 and compare');
const employee3 = dataBase2.getEmplByName("Sergey Sulmenev");
const employee4 = dataBase2.cloneEmpl(employee3);
console.log('are they equal? ', Employee.compareEmpls(employee3, employee4));
console.log();
console.log();

console.log('merge dataBase1 and dataBase2');
dataBase1.mergeDb(dataBase2);
console.log(dataBase1.getAllEmpls());
console.log();
console.log();