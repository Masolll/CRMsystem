using Microsoft.AspNetCore.Mvc;
using crm.Data;
using crm.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace crm.Controllers;

public class AccountController : Controller
{
    private readonly ApplicationDbContext dbContext;

    public AccountController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Index(string masterLogin)
    {
        ViewData["masterLogin"] = masterLogin;
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Index()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect("/");
    }
}