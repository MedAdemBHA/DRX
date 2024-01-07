namespace ReactApp1.Server.Model
{
    public class Departement
    {
        public int id { get; set; }
        public string NomDep { get; set; } = null!;
        
        public virtual ICollection<Utilisateur>? Utilisateurs { get; set; } 
        public virtual ICollection<Employe>? Employes { get; set; } 
   
    
    //public string GetName(string id)
    //{  return Utilisateurs[id].nomDep; }
    
    }
}
