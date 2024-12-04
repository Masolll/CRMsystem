using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using crm.Models;
using crm.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace crm.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly ApplicationDbContext dbContext;

    public HomeController(ILogger<HomeController> logger, ApplicationDbContext dbContext)
    {
        _logger = logger;
        this.dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Index(string masterLogin, string masterPassword)
    {
        var searchMaster = dbContext.Masters.FirstOrDefault(e => e.MasterLogin == masterLogin);
        if(searchMaster == null || searchMaster.MasterPassword != masterPassword)
        {
            return BadRequest("Неверный логин или пароль");
        }

        var claims = new List<Claim> { new Claim(ClaimTypes.Name, masterLogin) };
        // создаем объект ClaimsIdentity
        ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Cookies");
        // установка аутентификационных куки
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

        return RedirectToAction("index", "account", new { masterLogin });
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
