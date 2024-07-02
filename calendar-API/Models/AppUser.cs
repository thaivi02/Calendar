using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace calendar_API.Models;

public class AppUser : IdentityUser
{
    [StringLength(100)]
    [MaxLength(100)]
    [Required]
    public string FullName { get; set; } = null!;
}