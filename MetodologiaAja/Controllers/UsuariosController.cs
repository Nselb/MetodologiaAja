using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MetodologiaAja.Data;
using MetodologiaAja.Models;

namespace MetodologiaAja.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly MetodologiaAjaContext _context;

        public UsuariosController(MetodologiaAjaContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuario()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(string id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(string id, Usuario usuario)
        {
            if (id != usuario.UsuarioID)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
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

        // POST: api/Usuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            if (ValidarCedula(usuario.UsuarioID))
            {
                _context.Usuarios.Add(usuario);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    if (UsuarioExists(usuario.UsuarioID))
                    {
                        return Conflict();
                    }
                    else
                    {
                        throw;
                    }
                }
                return CreatedAtAction("GetUsuario", new { id = usuario.UsuarioID }, usuario); 
            }
            return BadRequest();
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(string id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult<Usuario>> Login(Usuario usuario)
        {
            ActionResult<Usuario> us = await _context.Usuarios.Where(u => u.UsuarioPassword.Equals(usuario.UsuarioPassword) && u.UsuarioID.Equals(usuario.UsuarioID)).FirstOrDefaultAsync();
            if (us != null)
            {
                return us;
            }
            return BadRequest();
        }

        [HttpGet("Empresa/{empresa}")]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuariosByEmpresa(int empresa)
        {
            return await _context.Usuarios.Where(u => u.EmpresaID == empresa).ToListAsync();
        }

        private bool UsuarioExists(string id)
        {
            return _context.Usuarios.Any(e => e.UsuarioID == id);
        }

        private static bool ValidarCedula(string cedula)
        {
            if (cedula.Length == 10)
            {
                int suma = 0, impares = 0;
                for (int i = 0; i < cedula.Length - 1; i++)
                {
                    int digito = int.Parse(cedula[i].ToString());
                    if (i % 2 == 0)
                    {
                        impares += digito * 2 > 9 ? digito * 2 - 9 : digito * 2;
                    }
                    else
                    {
                        suma += digito;
                    }
                }
                suma += impares;
                return suma % 10 == 10 - int.Parse(cedula[9].ToString());
            }
            return false;
        }
    }
}
