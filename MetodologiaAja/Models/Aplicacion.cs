using System.ComponentModel.DataAnnotations;

namespace MetodologiaAja.Models
{
    public class Aplicacion
    {
        [Key]
        public int Id { get; set; }
        public string? EmpresaAsegura { get; set; }
        public string? EmpresaPaga { get; set; }
        public string? Desde { get; set; }
        public string? Hasta { get; set; }
        public string? TipoTransporte { get; set; }
        public string? Perteneciente { get; set; }
        public DateTime? FechaEmbarque { get; set; }
        public string? EmbarcadoPor { get; set; }
        public DateTime? FechaLlegada { get; set; }
        public string? NotaPedido { get; set; }
        public long OrdenDeCompra { get; set; }
        public string? Marca { get; set; }
        public int Numero { get; set; }
        public double PesoBruto { get; set; }
        public int Bultos { get; set; }
        public double MontoTotal { get; set; }
        public double OtrosGastos { get; set; }
        public double SumaAsegurada { get; set; }
        public double ValorPrima { get; set; }
        public int Cobertura { get; set; }
        public int Deducible { get; set; }
        public string? DescripcionContenido { get; set; }
        public string? Observaciones { get; set; }
        public string Estado { get; set; }
    }
}
