
using Microsoft.AspNetCore.Identity;
using System;
    using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
    using System.Web;

namespace ReactApp1.Server.Model
{
   
        public class Employe
        {

            public string id { get; set; } = null!;
            public string Nom { get; set; } = null!;
             public string Prenom { get; set; } = null!;

     
             public int DepartementId { get; set; } 
             public string UtilisateurId { get; set; } = null!;
       


        //  public virtual Departement? Departement { get; set; }
    }
   

   

    

}
