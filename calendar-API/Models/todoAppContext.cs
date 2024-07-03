using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace calendar_API.Models
{
    public partial class todoappContext : IdentityDbContext<AppUser>
    {
        public todoappContext()
        {
        }

        public todoappContext(DbContextOptions<todoappContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Priority> Priorities { get; set; } = null!;
        public virtual DbSet<TodoTask> TodoTasks { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                IConfigurationRoot configurationRoot = builder.Build();
                optionsBuilder.UseSqlServer(configurationRoot.GetConnectionString("DefaultConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // This is required for IdentityDbContext
            
            modelBuilder.Entity<Priority>(entity =>
            {
                entity.ToTable("Priority");

                entity.Property(e => e.PriorityId).ValueGeneratedNever();

                entity.Property(e => e.PriorityName).HasMaxLength(50);
            });

            modelBuilder.Entity<TodoTask>(entity =>
            {
                entity.HasKey(e => e.TaskId)
                    .HasName("PK_Task");

                entity.ToTable("TodoTask");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.EndTime).HasColumnType("time(0)");

                entity.Property(e => e.StartTime).HasColumnType("time(0)");

                entity.Property(e => e.Title).HasMaxLength(50);

                entity.HasOne(d => d.Priority)
                    .WithMany(p => p.TodoTasks)
                    .HasForeignKey(d => d.PriorityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TodoTask_Priority");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TodoTasks)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TodoTask_User");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
