using Microsoft.AspNetCore.Mvc;
using crm.Data;
using crm.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System.Text.Json;
using System.Text.Unicode;
using System.Text.Encodings.Web;
using crm.Models.CreateModels;
using crm.Models.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace crm.Controllers;

public class EmployeeController : Controller
{
    private readonly ApplicationDbContext dbContext;

    public EmployeeController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    
    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpGet]
    [Authorize(Roles = "employee, admin")]
    public IActionResult Account(string employeeLogin)
    {
        var userClaims = HttpContext.User.Claims;
        var role = userClaims.FirstOrDefault(e => e.Type == ClaimTypes.Role).Value;
        var clientId = userClaims.FirstOrDefault(e => e.Type == ClaimTypes.Sid).Value;//id того кто входит, то есть админа или сотрудника
        
        if (role == "admin")//если входит админ то проверяю есть ли у него сотрудник с данным логином, если нет то отклоняю доступ
        {
            var admin = dbContext.Admins.FirstOrDefault(e => e.Id.ToString() == clientId);
            if (admin.EmployeesLogins.Contains(employeeLogin))
            {
                var employee = dbContext.Employees.FirstOrDefault(e => e.Login == employeeLogin);
                return View(employee);
            }
            return Redirect("/Employee/Login/");
        }
        
        var currentEmployee = dbContext.Employees.FirstOrDefault(e => e.Id.ToString() == clientId);//сотрудник который входит в аккаунт
        
        if(currentEmployee.Login != employeeLogin) //логин текущего пользователя в claim не 
            return Redirect($"/Employee/Login/");
        
        return View(currentEmployee);
    }
    
    [HttpGet]
    public string DbInfo()
    {
        //options нужно для изменения кодировки unicode(для понимания кириллицы), в данном случае диапазон равен всем знакам unicode
        var options = new JsonSerializerOptions
        {
            Encoder = JavaScriptEncoder.Create(UnicodeRanges.All),
            WriteIndented = true
        };
        return JsonSerializer.Serialize(dbContext.Employees.ToArray(), options);
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public IActionResult Create(EmployeeCreateModel employeeCreateModel)
    {
        var adminId = HttpContext.User.Claims.FirstOrDefault(e => e.Type == ClaimTypes.Sid).Value;  //извлекаю id из контейнера claims то есть id админа который зашел в систему
        var admin = dbContext.Admins.FirstOrDefault(e => e.Id.ToString() == adminId);  
        // var passwordHasher = new PasswordHasher<EmployeeCreateModel>();
        // employeeCreateModel.Password = passwordHasher.HashPassword(employeeCreateModel, employeeCreateModel.Password);
        var employee = new Employee(employeeCreateModel);
        dbContext.Employees.Add(employee);
        admin.EmployeesLogins.Add(employee.Login);   //добавляю теущему админу нового сотрудника
        dbContext.SaveChanges();
        return RedirectToAction("Account", "Admin", new { adminId = adminId });
    }

    [HttpPost]
    public async Task<IActionResult> Login(string login, string password)
    {
        var passwordHasher = new PasswordHasher<Employee>();
        var searchEmployee = dbContext.Employees.FirstOrDefault(e => e.Login == login);
        if(searchEmployee == null || searchEmployee.Password != password)
        //    || passwordHasher.VerifyHashedPassword(searchEmployee, searchEmployee.Password, password) != PasswordVerificationResult.Success)
        {
            return Redirect($"/Employee/Login");
        }

        //claims это список объектов claim которые хранят информацию о пользователе. Claim хранит пары ключ-значение
        var claims = new List<Claim> { 
            new Claim(ClaimTypes.Name, login),
            new Claim(ClaimTypes.Role, "employee"),
            new Claim(ClaimTypes.Sid, searchEmployee.Id.ToString())
        };
        //объект ClaimsIdentity это грубо говоря "личность". Конструктор принимает claims и тип авторизации в данном случае "cookie"
        var claimsIdentity = new ClaimsIdentity(claims, "Cookies");
        // claimsPrincipal это объект который может хранить несколько ClaimsIdentity
        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
        //настройка аунтификационных кук
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
        
        return RedirectToAction("Account", "Employee", new { employeeLogin = searchEmployee.Login });
    }

    [HttpDelete]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect("/");
    }
    
    [HttpPost]
    [Authorize(Roles = "admin")]
    public IActionResult Update(EmployeeCreateModel employee, Guid id)
    {
        var adminId = HttpContext.User.Claims.FirstOrDefault(e => e.Type == ClaimTypes.Sid).Value;
        var targetEmployee = dbContext.Employees.FirstOrDefault(e => e.Id == id);
        //так как я обновляю ниже логин сотрудника то его нужно обновить еще в списке у админа
        var currentAdmin = dbContext.Admins.FirstOrDefault(e => e.Id.ToString() == adminId);
        currentAdmin.EmployeesLogins = currentAdmin.EmployeesLogins.Where(e => e != targetEmployee.Login).ToList();
        currentAdmin.EmployeesLogins.Add(employee.Login);
        
        targetEmployee.Name = employee.Name;
        targetEmployee.Surname = employee.Surname;
        targetEmployee.Patronymic = employee.Patronymic;
        targetEmployee.Login = employee.Login;
        targetEmployee.Phone = employee.Phone;
        targetEmployee.Email = employee.Email;
        targetEmployee.Position = employee.Position;
        dbContext.SaveChanges();
        return RedirectToAction("Account", "Admin", new { adminId = adminId });
    }
}