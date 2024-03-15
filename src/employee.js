class Employee {
  constructor(name, position, filial) {
    this.name = name;
    this.position = position;
    this.filial = filial;
  }

  capitalizeName() {
    // if name consists of multiple words, capitalize each word
    this.name = this.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  lowerCaseFilial() {
    this.filial = this.filial.toLowerCase();
  }

  static compareEmpls(employeeA, employeeB) {
    // compare by all fields
    return (
      employeeA.name?.toLowerCase() === employeeB.name?.toLowerCase() &&
      employeeA.position?.toLowerCase() === employeeB.position?.toLowerCase() &&
      employeeA.division?.toLowerCase() === employeeB.division?.toLowerCase()
    );
  }
}

export default Employee;