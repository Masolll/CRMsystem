

using crm.Models.CreateModels;

namespace crm.Models;

public class Employee
{
    public Guid Id { get; private set; }
    public string Login { get; private set; }
    public string? Name { get; set; }
    public string? Position { get; set; }
    public string? Info { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string Password { get; set; }

    public Employee()
    {
        Id = Guid.NewGuid();
    }

    public Employee(EmployeeCreateModel employee)
    {
        Id = Guid.NewGuid();
        Login = employee.Login;
        Name = employee.Name;
        Position = employee.Position;
        Info = employee.Info;
        Phone = employee.Phone;
        Email = employee.Email;
        Password = employee.Password;
    }
}