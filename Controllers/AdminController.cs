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

namespace crm.Controllers;

public class AdminController : Controller
{
    private readonly ApplicationDbContext dbContext;
    public AdminController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    
    [HttpGet]
    [Authorize(Roles = "admin")]
    public IActionResult Index(string login)
    {
        ViewData["adminLogin"] = login;
        return View();
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
        return JsonSerializer.Serialize(dbContext.Admins.ToArray(), options);
    }
    
    [HttpPost]
    public IActionResult Create(AdminCreateModel admin)
    {
        dbContext.Admins.Add(new Admin(admin)); //НАДО ХЭШИРОВАТЬ ПАРОЛЬ!!!
        dbContext.SaveChanges();
        return Ok("все супер пупер! лес гоу!");
    }

    [HttpPost]
    public async Task<IActionResult> Login(string login, string password)
    {
        var searchAdmin = dbContext.Admins.FirstOrDefault(e => e.Login == login);
        if(searchAdmin == null || searchAdmin.Password != password)
        {
            return BadRequest("Неверный логин или пароль");
        }

        //claims это список объектов claim которые хранят информацию о пользователе. Claim хранит пары ключ-значение
        var claims = new List<Claim> { new Claim(ClaimTypes.Name, login), new Claim(ClaimTypes.Role, "admin") };
        //объект ClaimsIdentity это грубо говоря "личность". Конструктор принимает claims и тип авторизации в данном случае "cookie"
        var claimsIdentity = new ClaimsIdentity(claims, "Cookies");
        // claimsPrincipal это объект который может хранить несколько ClaimsIdentity
        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
        //настройка аунтификационных кук
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
        
        return RedirectToAction("index", "admin", new { login = login });
    }

    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect("/");
    }
}