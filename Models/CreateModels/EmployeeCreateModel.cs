namespace crm.Models.CreateModels;

public class EmployeeCreateModel
{
    public string Login { get; set; }
    public string? Name { get; set; }
    public string? Position { get; set; }
    public string? Info { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string Password { get; set; }

    public EmployeeCreateModel()
    {
    }
    
    public EmployeeCreateModel(string login, string? name, string? position, string? info, string? phone, string? email, string password)
    {
        Login = login;
        Name = name;
        Position = position;
        Info = info;
        Phone = phone;
        Email = email;
        Password = password;
    }
}