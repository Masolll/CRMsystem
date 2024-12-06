using Microsoft.AspNetCore.Mvc;
using crm.Data;
using crm.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;

namespace crm.Controllers;

public class AdminController : Controller
{
    private readonly ApplicationDbContext dbContext;
    public AdminController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    
    [HttpPost]
    public IActionResult Index(string adminLogin, string adminPassword)
    {
        dbContext.Admins.Add(new Admin(adminLogin, adminPassword)); //НАДО ХЭШИРОВАТЬ ПАРОЛЬ!!!
        dbContext.SaveChanges();
        return Ok("все супер пупер! лес гоу!");
    }

    [HttpGet]
    [Authorize(Roles = "admin")]
    public IActionResult Index(string adminLogin)
    {
        ViewData["adminLogin"] = adminLogin;
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Login(string adminLogin, string adminPassword)
    {
        var searchAdmin = dbContext.Admins.FirstOrDefault(e => e.AdminLogin == adminLogin);
        if(searchAdmin == null || searchAdmin.AdminPassword != adminPassword)
        {
            return BadRequest("Неверный логин или пароль");
        }

        //claims это список объектов claim которые хранят информацию о пользователе. Claim хранит пары ключ-значение
        var claims = new List<Claim> { new Claim(ClaimTypes.Name, adminLogin), new Claim(ClaimTypes.Role, "admin") };
        //объект ClaimsIdentity это грубо говоря "личность". Конструктор принимает claims и тип авторизации в данном случае "cookie"
        var claimsIdentity = new ClaimsIdentity(claims, "Cookies");
        // claimsPrincipal это объект который может хранить несколько ClaimsIdentity
        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
        //настройка аунтификационных кук
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
        
        return RedirectToAction("index", "admin", new { adminLogin });
    }

    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect("/");
    }
}