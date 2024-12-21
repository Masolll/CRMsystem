using crm.Models.CreateModels;

namespace crm.Models;

public class Admin
{
    public Guid Id { get; private set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Patronymic { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    
    public string? NameCompany { get; set; }
    public string? Inn { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    
    
    public List<string> EmployeesLogins { get; set; }
    public List<Guid> Records { get; set; }

    public Admin()
    {
        Id = Guid.NewGuid();
    }
    public Admin(AdminCreateModel admin)
    {
        Id = Guid.NewGuid();
        Name = admin.Name;
        Surname = admin.Surname;
        Patronymic = admin.Patronymic;
        NameCompany = admin.NameCompany;
        Inn = admin.Inn;
        Email = admin.Email;
        Phone = admin.Phone;
        Login = admin.Login;
        Password = admin.Password;
        EmployeesLogins = new List<string>();
        Records = new List<Guid>();
    }
}