using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBoard.Data;
using ProjectBoard.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {

        private ApiDbContext _dbcontext; //to talk to the database

        public ProjectsController(ApiDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }


        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _dbcontext.Projects.ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var project = await _dbcontext.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound("No record found");
            }
            else
            {
                return Ok(project);
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Project project)
        {
            await _dbcontext.Projects.AddAsync(project);
            await _dbcontext.SaveChangesAsync();
            //return StatusCode(StatusCodes.Status201Created);
            return Created($"api/projects/{project.Id}", project);

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Project projectObject)
        {
            var project = await _dbcontext.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound("No record found");
            }
            else
            {
                project.Name = projectObject.Name;
                project.Description = projectObject.Description;
                project.Stage = projectObject.Stage;
                await _dbcontext.SaveChangesAsync();
                return Ok(project);
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var project = await _dbcontext.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound("No record found");
            }
            else
            {
                _dbcontext.Projects.Remove(project);
                await _dbcontext.SaveChangesAsync();
                return Ok("Record deleted sucessfully");
            }
        }
    }
}
