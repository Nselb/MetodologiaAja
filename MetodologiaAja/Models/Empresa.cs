using System.ComponentModel.DataAnnotations;

namespace MetodologiaAja.Models
{
    public class Empresa
    {
        [Key]
        public int EmpresaID { get; set; }
        public string EmpresaNombre { get; set; }
    }
}
