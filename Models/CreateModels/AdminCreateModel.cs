namespace crm.Models.CreateModels;

public class AdminCreateModel
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Patronymic { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    
    public string? NameCompany { get; set; }
    public string? Inn { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    

    public AdminCreateModel()
    {
    }
    public AdminCreateModel(string? nameCompany, string? inn, string name, string surname, string patronymic, string? email, string? phone, 
        string login, string password)
    {
        Name = name;
        Surname = surname;
        Patronymic = patronymic;
        NameCompany = nameCompany;
        Inn = inn;
        Email = email;
        Phone = phone;
        Login = login;
        Password = password;
    }
}