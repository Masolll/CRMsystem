namespace crm.Models;

public class Admin
{
    public Guid Id { get; private set; }
    public string Login { get; set; }
    public string Password { get; set; }

    public Admin()
    {
        Id = Guid.NewGuid();
    }
    public Admin(string login, string password)
    {
        Login = login;
        Password = password;
        Id = Guid.NewGuid();
    }
}