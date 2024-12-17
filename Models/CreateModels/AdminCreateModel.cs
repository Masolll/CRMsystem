namespace crm.Models.CreateModels;

public class AdminCreateModel
{
    public string? NameCompany { get; set; }
    public string? Inn { get; set; }
    public string? NameAdmin { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }

    public AdminCreateModel()
    {
    }
    public AdminCreateModel(string? nameCompany, string? inn, string? nameAdmin, string? email, string? phone, 
        string login, string password)
    {
        NameCompany = nameCompany;
        Inn = inn;
        NameAdmin = nameAdmin;
        Email = email;
        Phone = phone;
        Login = login;
        Password = password;
    }
}