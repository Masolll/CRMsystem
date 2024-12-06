using Microsoft.AspNetCore.Mvc;
using crm.Data;
using crm.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;

namespace crm.Controllers;

public class MasterController : Controller
{
    private readonly ApplicationDbContext dbContext;

    public MasterController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost]
    public IActionResult Index(string masterLogin, string masterPassword)
    {
        dbContext.Masters.Add(new Master(masterLogin, masterPassword)); //НАДО ХЭШИРОВАТЬ ПАРОЛЬ!!!
        dbContext.SaveChanges();
        return Ok("все супер пупер! лес гоу!");
    }

    [HttpGet]
    [Authorize(Roles = "master, admin")]
    public IActionResult Index(string masterLogin)
    {
        ViewData["masterLogin"] = masterLogin;
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Login(string masterLogin, string masterPassword)
    {
        var searchMaster = dbContext.Masters.FirstOrDefault(e => e.MasterLogin == masterLogin);
        if(searchMaster == null || searchMaster.MasterPassword != masterPassword)
        {
            return BadRequest("Неверный логин или пароль");
        }

        //claims это список объектов claim которые хранят информацию о пользователе. Claim хранит пары ключ-значение
        var claims = new List<Claim> { new Claim(ClaimTypes.Name, masterLogin), new Claim(ClaimTypes.Role, "master") };
        //объект ClaimsIdentity это грубо говоря "личность". Конструктор принимает claims и тип авторизации в данном случае "cookie"
        var claimsIdentity = new ClaimsIdentity(claims, "Cookies");
        // claimsPrincipal это объект который может хранить несколько ClaimsIdentity
        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
        //настройка аунтификационных кук
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
        
        return RedirectToAction("index", "master", new { masterLogin });
    }

    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect("/");
    }
}