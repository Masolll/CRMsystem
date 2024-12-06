namespace crm.Models;

public class Admin
{
    public Guid AdminId { get; private set; }
    public string AdminLogin { get; set; }
    public string AdminPassword { get; set; }

    public Admin()
    {
        AdminId = Guid.NewGuid();
    }
    public Admin(string login, string password)
    {
        AdminLogin = login;
        AdminPassword = password;
        AdminId = Guid.NewGuid();
    }
}