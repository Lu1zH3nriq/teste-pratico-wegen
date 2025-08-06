using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagerAPI.dbConfig;
using TaskManagerAPI.Models;
using BCrypt.Net;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly TaskDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(TaskDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    private IActionResult CustomResponse(int statusCode, string message, object? data)
    {
        return StatusCode(statusCode, new
        {
            status = statusCode,
            message,
            data
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        if (_context.Users.Any(u => u.Username == user.Username))
            return CustomResponse(400, "Usuário já existe.", null);

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return CustomResponse(201, "Usuário registrado com sucesso.", new
        {
            id = user.Id,
            username = user.Username
        });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] User loginData)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == loginData.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(loginData.PasswordHash, user.PasswordHash))
            return CustomResponse(401, "Credenciais inválidas.", null);

        var jwtKey = _config["Jwt:Key"];
        var jwtIssuer = _config["Jwt:Issuer"];
        var jwtAudience = _config["Jwt:Audience"];

        if (string.IsNullOrEmpty(jwtKey) || jwtKey.Length < 32)
            return CustomResponse(500, "JWT_KEY inválida ou muito curta. Verifique o appsettings.json.", null);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds);

        var tokenHandler = new JwtSecurityTokenHandler();
        var jwt = tokenHandler.WriteToken(token);

        return CustomResponse(200, "Login realizado com sucesso.", new
        {
            token = jwt,
            expires = token.ValidTo
        });
    }

    [HttpGet("all-users")]
    public IActionResult GetAllUsers()
    {
        var users = _context.Users.ToList();

        if (users.Count == 0)
            return CustomResponse(404, "Nenhum usuário encontrado.", null);

        return CustomResponse(200, "Lista de usuários obtida com sucesso.", users);
    }
}
