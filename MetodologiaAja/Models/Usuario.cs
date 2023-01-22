using System.ComponentModel.DataAnnotations;

namespace MetodologiaAja.Models
{
    public class Usuario
    {
        [Key]
        public string UsuarioID { get; set; }
        public string UsuarioNombre { get; set; }
        public string UsuarioPassword { get; set; }
        public int EmpresaID { get; set; }
        public int UsuarioTipo { get; set; }
    }
}
