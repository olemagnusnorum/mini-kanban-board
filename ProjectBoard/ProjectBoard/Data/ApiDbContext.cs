using System;
using Microsoft.EntityFrameworkCore;
using ProjectBoard.Models;

namespace ProjectBoard.Data
{
    //this talks to the database

    public class ApiDbContext : DbContext
    {

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {


        }

        //DbSet is a table
        public DbSet<Project> Projects { get; set; }
    }
}
