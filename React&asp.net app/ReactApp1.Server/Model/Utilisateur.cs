using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp1.Server.Model
{
    public class Utilisateur
    {
        public string id { get; set; } = null!;
        public string Nom { get; set; } = null!;
        public string Prenom { get; set; } = null!;
        public string Motpass { get; set; } = null!;
        public string Role {  get; set; } = null!;
        public int DepartementId { get; set; } 
       // public virtual Departement? Departement { get; set; } = null;



    }
}
