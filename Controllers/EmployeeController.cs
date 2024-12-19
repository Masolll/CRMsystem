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
    public IActionResult Account(string employeeId)
    {
        Guid employeeGuid;
        var isTrueEmployee = Guid.TryParse(employeeId, out employeeGuid);
        
        if (!isTrueEmployee)
            return Redirect($"/Employee/Login/");
        
        var userClaims = HttpContext.User.Claims;
        var role = userClaims.FirstOrDefault(e => e.Type == ClaimTypes.Role).Value;
        var clientId = userClaims.FirstOrDefault(e => e.Type == ClaimTypes.Sid).Value;
        if (role == "admin")//если входит админ то проверяю есть ли у него сотрудник с данным логином, если нет то отклоняю доступ
        {
            var admin = dbContext.Admins.FirstOrDefault(e => e.Id.ToString() == clientId);
            
            if (admin.Employees.Contains(employeeGuid))
                return View();
            
            return Redirect("/Employee/login");
        }

        if (dbContext.Employees.FirstOrDefault(e => e.Id == employeeGuid) == null) //значит такого сотрудника вообще нет
            return Redirect("/Employee/Login/");
        if(clientId == employeeId) //id текущего пользователя в claim такой же как и переданный в адресе id
            return View();
        return Redirect($"/Employee/Login/");
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
        var passwordHasher = new PasswordHasher<EmployeeCreateModel>();
        employeeCreateModel.Password = passwordHasher.HashPassword(employeeCreateModel, employeeCreateModel.Password);
        var employee = new Employee(employeeCreateModel);
        dbContext.Employees.Add(employee);
        admin.Employees.Add(employee.Id);   //добавляю теущему админу нового сотрудника
        dbContext.SaveChanges();
        return Ok("все супер пупер! лес гоу!");
    }

    [HttpPost]
    public async Task<IActionResult> Login(string login, string password)
    {
        var passwordHasher = new PasswordHasher<Employee>();
        var searchEmployee = dbContext.Employees.FirstOrDefault(e => e.Login == login);
        if(searchEmployee == null 
           || passwordHasher.VerifyHashedPassword(searchEmployee, searchEmployee.Password, password) != PasswordVerificationResult.Success)
        {
            return BadRequest("Неверный логин или пароль");
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
        
        return RedirectToAction("Account", "Employee", new { employeeId = searchEmployee.Id });
    }

    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect("/");
    }
}