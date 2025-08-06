using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.dbConfig;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly TaskDbContext _context;

        public HealthController(TaskDbContext context)
        {
            _context = context;
        }

        [HttpGet("db-status")]
        public async Task<IActionResult> CheckDbConnection()
        {
            try
            {
                var isConnected = await _context.Database.CanConnectAsync();
                return isConnected
                    ? Ok("Conexão bem-sucedida com o banco de dados!")
                    : StatusCode(500, "Não foi possível conectar ao banco.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro: {ex.Message}");
            }
        }
    }
}
