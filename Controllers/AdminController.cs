using Microsoft.AspNetCore.Mvc;
using crm.Data;
using crm.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;
using System.Text.Unicode;
using System.Text.Encodings.Web;
using crm.Models.CreateModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;

namespace crm.Controllers;

public class AdminController : Controller
{
    private readonly ApplicationDbContext dbContext;
    public AdminController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpGet]
    [Authorize(Roles = "admin")]
    public IActionResult Account(string adminId)
    {
        if (HttpContext.User.Claims.FirstOrDefault(e => e.Type == ClaimTypes.Sid).Value != adminId)
            return Redirect($"/Admin/Login");
        return View();
    }

    [HttpGet]
    public IActionResult Registration()
    {
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
        var passwordHasher = new PasswordHasher<AdminCreateModel>();
        admin.Password = passwordHasher.HashPassword(admin, admin.Password);
        dbContext.Admins.Add(new Admin(admin));
        dbContext.SaveChanges();
        return Redirect("/admin/login");
    }

    [HttpPost]
    public IActionResult Login(string login, string password)
    {
        var searchAdmin = dbContext.Admins.FirstOrDefault(e => e.Login == login);
        var passwordHasher = new PasswordHasher<Admin>();//Здесь тип Admin а при создании хэша я использую объект AdminCreateModel
        if(searchAdmin == null 
           || passwordHasher.VerifyHashedPassword(searchAdmin, searchAdmin.Password, password) != PasswordVerificationResult.Success)
        {
            return BadRequest("Неверный логин или пароль");
        }

        //claims это список объектов claim которые хранят информацию о пользователе. Claim хранит пары ключ-значение
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, login),
            new Claim(ClaimTypes.Role, "admin"),
            new Claim(ClaimTypes.Sid, searchAdmin.Id.ToString())
        };
        //объект ClaimsIdentity это грубо говоря "личность". Конструктор принимает claims и тип авторизации в данном случае "cookie"
        var claimsIdentity = new ClaimsIdentity(claims, "Cookies");
        // claimsPrincipal это объект который может хранить несколько ClaimsIdentity
        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
        //настройка аунтификационных кук
        HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
        
        return RedirectToAction("Account", "admin", new { adminId = searchAdmin.Id });
    }

    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect("/");
    }
}