using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Model.ViewModels
{
    public class UtilNote
    {
       
       public ICollection<Note> Notes { get; set;}
       
    }
}
