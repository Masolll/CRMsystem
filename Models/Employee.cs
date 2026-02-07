using crm.Models.CreateModels;

namespace crm.Models;

public class Employee
{
    public Guid Id { get; private set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Patronymic { get; set; }
    public string Password { get; set; }
    
    public string Login { get; set; }
    public string? Position { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    

    public Employee()
    {
        Id = Guid.NewGuid();
    }

    public Employee(EmployeeCreateModel employee)
    {
        Id = Guid.NewGuid();
        Login = employee.Login;
        Name = employee.Name;
        Surname = employee.Surname;
        Patronymic = employee.Patronymic;
        Position = employee.Position;
        Phone = employee.Phone;
        Email = employee.Email;
        Password = employee.Password;
    }
}