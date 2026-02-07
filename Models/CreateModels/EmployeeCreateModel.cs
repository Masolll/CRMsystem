namespace crm.Models.CreateModels;

public class EmployeeCreateModel
{
    public string Login { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Patronymic { get; set; }
    
    public string? Position { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    

    public EmployeeCreateModel(){}
    
    public EmployeeCreateModel(string login, string name, string surname, string patronymic, string? position, string? phone, string? email, string password)
    {
        Surname = surname;
        Patronymic = patronymic;
        Login = login;
        Name = name;
        Position = position;
        Phone = phone;
        Email = email;
        Password = password;
    }
}