using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MetodologiaAja.Data;
using MetodologiaAja.Models;
using static System.Net.Mime.MediaTypeNames;

namespace MetodologiaAja.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AplicacionesController : ControllerBase
    {
        private readonly MetodologiaAjaContext _context;

        public AplicacionesController(MetodologiaAjaContext context)
        {
            _context = context;
        }

        // GET: api/Aplicaciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aplicacion>>> GetAplicacion()
        {
            var lista = await _context.Aplicaciones.FromSqlRaw($"SELECT * FROM vw_Aplicaciones").ToListAsync();
            return lista;
        }

        // GET: api/Aplicaciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Aplicacion>> GetAplicacion(int id)
        {
            var aplicacion = await _context.Aplicaciones.FindAsync(id);

            if (aplicacion == null)
            {
                return NotFound();
            }

            return aplicacion;
        }

        [HttpGet("byEmpresa/{id}")]
        public async Task<ActionResult<IEnumerable<Aplicacion>>> GetAplicacionByEmpresa(int id)
        {
            var aplicaciones = await _context.Aplicaciones.FromSqlRaw($"SELECT * FROM vw_Aplicaciones WHERE EmpresaAsegura = (SELECT empresaName FROM Empresas WHERE empresaId = {id})").ToListAsync();
            if (aplicaciones == null)
            {
                return new List<Aplicacion>();
            }
            return aplicaciones;
        }

        [HttpPost("anularAplicacion/{id}")]
        public async Task<ActionResult<IEnumerable<Aplicacion>>> GetAnularAplicacion(int id)
        {
            var aplicaciones = await _context.Aplicaciones.FromSqlRaw($"EXEC AnularAplicacion {id}").ToListAsync();
            if (aplicaciones == null)
            {
                return new List<Aplicacion>();
            }
            return aplicaciones;
        }

        // PUT: api/Aplicaciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAplicacion(int id, Aplicacion aplicacion)
        {
            if (id != aplicacion.Id)
            {
                return BadRequest();
            }

            _context.Entry(aplicacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AplicacionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Aplicaciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Aplicacion>> PostAplicacion(Aplicacion aplicacion)
        {
            _context.Aplicaciones.Add(aplicacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAplicacion", new { id = aplicacion.Id }, aplicacion);
        }

        // DELETE: api/Aplicaciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAplicacion(int id)
        {
            var aplicacion = await _context.Aplicaciones.FindAsync(id);
            if (aplicacion == null)
            {
                return NotFound();
            }

            _context.Aplicaciones.Remove(aplicacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AplicacionExists(int id)
        {
            return _context.Aplicaciones.Any(e => e.Id == id);
        }
    }
}
