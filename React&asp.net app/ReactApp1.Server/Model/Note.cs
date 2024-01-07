using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Model
{
    public class Note
    {
        public int id { get; set; }
        [Range(0, 6, ErrorMessage = "The value of 'Note 1' must be between 0 and 6.")]
        public int note1 { get; set; }
        [Range(0, 6, ErrorMessage = "The value of 'Note 2' must be between 0and 6.")]
        public int note2 { get; set; }
        [Range(0, 6, ErrorMessage = "The value of 'Note 3' must be between 0 and 6.")]
        public int note3 { get; set; }
        [Range(1, 12, ErrorMessage = "The value of 'mois' must be between 1 and 12.")]

        public string mois { get; set; }

        public string Anner { get; set; }
        public string? idEmp { get; set; }


    }


}
