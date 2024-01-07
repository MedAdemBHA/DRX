using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using ReactApp1.Server.Controllers;

using System.Threading.Tasks;
using ReactApp1.Server.Model;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Model.ViewModels;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactApp1.Server.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly UtilisateurDdContext _context;

        public TestController(UtilisateurDdContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromForm] LoginModel model)
        {
            var utilisateur = _context.Utilisateurs
                .SingleOrDefault(u => u.id == model.id && u.Motpass == model.MotPasse);

            if (utilisateur == null)
            {
                return Unauthorized("Nom d'utilisateur ou mot de passe incorrect");
            }
            var x = from u in _context.Utilisateurs
                    join d in _context.Depertements
                    on u.DepartementId equals d.id
                    where u.id == utilisateur.id
                    select new
                    {
                        name = d.NomDep,
                        DepId = d.id

                    };

           

            var response = new
            {
                x.FirstOrDefault().name,
                x.FirstOrDefault().DepId,
                utilisateur.id,
                utilisateur.Motpass,
                utilisateur.Role
                
            };

            return Ok(response);
        }


        [HttpGet]
        [Route("Chefs")]
        public async Task<ActionResult<IEnumerable<Utilisateur>>> GetChefs()
        {

            try
            {

                var chef = await _context.Utilisateurs.ToListAsync();


                return Ok(chef);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }

        }





        [HttpPost]

        [Route("Registration/chef")]
        public async Task<ActionResult<Utilisateur>> RegisterChef([FromBody] Utilisateur utilisateur)
        {
            try
            {

                _context.Utilisateurs.Add(utilisateur);
                await _context.SaveChangesAsync();


                return StatusCode(201, utilisateur);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite lors de l'inscription : {ex.Message}");
            }
        }

        [HttpGet]
        [Route("ToutEmps")]
        public async Task<ActionResult> GetEmps()
        {

            try
            {




                var l = from m in _context.Employes
                        join p in _context.Notes
                        on m.id equals p.idEmp
                        where m.id == p.idEmp
                        select new
                        {
                            m.id,
                            m.Nom,
                            m.Prenom,

                            p.mois,
                            p.Anner,
                            p.note1,
                            p.note2,
                            p.note3

                        };


                return Ok(l);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }

        }


        [HttpPost]
        [Route("Registration/Employer")]
        public async Task<ActionResult<Employe>> RegisterEmp(Employe Emp)
        {
            try
            {

                _context.Employes.Add(Emp);
                await _context.SaveChangesAsync();


                return StatusCode(201, Emp);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite lors de l'inscription : {ex.Message}");
            }
        }


        [HttpGet]
        [Route("Departement")]
        public async Task<ActionResult<IEnumerable<Departement>>> GetDepartement()
        {

            try
            {

                var departements = await _context.Depertements
                    .Include(d => d.Utilisateurs)
                    .Include(d => d.Employes)
                    .ToListAsync();


                return Ok(departements);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }

        }


        [HttpPost]
        [Route("Registration/Departement")]
        public async Task<ActionResult> RegisterDepartment(Departement Depa)
        {
            try
            {

                _context.Depertements.Add(Depa);
                await _context.SaveChangesAsync();


                return StatusCode(201, Depa);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite lors de l'inscription : {ex.Message}");
            }
        }




        /////////////// Note

        [HttpGet]
        [Route("Note")]
        public async Task<ActionResult<IEnumerable<Note>>> GetNote(string id)
        {
            try
            {
                var l = from m in _context.Notes
                        where m.idEmp == id
                        select new
                        {
                            note1 = m.note1,
                            note2 = m.note2,
                            note3 = m.note3,
                            id = m.id,
                            anner = m.Anner,
                            mois = m.mois,
                            moyenne = (m.note1 + m.note2 + m.note3) / 3

                        };

                return Ok(l);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }

        }
        [HttpGet]
        [Route("Note/Mois&anner")]
        public async Task<ActionResult<IEnumerable<Note>>> GetNote(string id, string mois, string anner)
        {
            try
            {
                var l = from m in _context.Notes
                        where m.idEmp == id && m.mois == mois && m.Anner == anner
                        select new
                        {
                            note1 = m.note1,
                            note2 = m.note2,
                            note3 = m.note3,
                            id = m.id,
                            anner = m.Anner,
                            mois = m.mois,
                            moyenne = (m.note1 + m.note2 + m.note3) / 3
                        };


                return Ok(l);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }








        }

        [HttpPost]
        [Route("Registration/Note")]
        public async Task<ActionResult> RegisterNote(Note note)
        {
            try
            {

                _context.Notes.Add(note);
                await _context.SaveChangesAsync();


                return StatusCode(201, note);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite lors de l'inscription : {ex.Message}");
            }
        }
        [HttpGet]
        [Route("Emps/Chef/{id_chef}")]
        public async Task<ActionResult<IEnumerable<Employe>>> GetEmps(string id_chef)
        {

            try
            {


                var l = from m in _context.Employes


                        where m.UtilisateurId == id_chef
                        select new
                        {
                            m.id,
                            m.Nom,
                            m.Prenom,


                        };
                return Ok(l);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }

        }

    }
}
