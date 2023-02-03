using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MetodologiaAja.Models;

namespace MetodologiaAja.Data
{
    public class MetodologiaAjaContext : DbContext
    {
        public MetodologiaAjaContext (DbContextOptions<MetodologiaAjaContext> options)
            : base(options)
        {
        }

        public DbSet<Empresa> Empresas { get; set; } = default!;

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Aplicacion> Aplicaciones { get; set; }
    }
}
