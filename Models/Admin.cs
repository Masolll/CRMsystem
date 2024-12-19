using crm.Models.CreateModels;

namespace crm.Models;

public class Admin
{
    public Guid Id { get; private set; }
    public string? NameCompany { get; set; }
    public string? Inn { get; set; }
    public string? NameAdmin { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    
    public List<Guid> Employees { get; set; }

    public Admin()
    {
        Id = Guid.NewGuid();
    }
    public Admin(AdminCreateModel admin)
    {
        Id = Guid.NewGuid();
        NameCompany = admin.NameCompany;
        Inn = admin.Inn;
        NameAdmin = admin.NameAdmin;
        Email = admin.Email;
        Phone = admin.Phone;
        Login = admin.Login;
        Password = admin.Password;
        Employees = new List<Guid>();
    }
}