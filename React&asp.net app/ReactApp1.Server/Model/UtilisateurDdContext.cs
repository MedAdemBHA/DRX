using Microsoft.EntityFrameworkCore;

namespace ReactApp1.Server.Model
{
    public class UtilisateurDdContext : DbContext
    {


        
          
        // Other DbSet properties for your entities, if any
        public UtilisateurDdContext(DbContextOptions<UtilisateurDdContext> options)
   : base(options)
        {
        }
        public virtual DbSet<Employe> Employes { get; set; }
        public virtual DbSet<Utilisateur> Utilisateurs { get; set; }
        public virtual DbSet<Departement> Depertements { get; set; }
        public virtual DbSet<Note> Notes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
      => optionsBuilder.UseSqlServer("Name=ConnectionStrings:DrxConnection");
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
       

        }


    }
}

