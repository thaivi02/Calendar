using Microsoft.AspNetCore.Identity;

namespace calendar_API.Models;

public class AppUser : IdentityUser
{
    public string FullName { get; set; } = null!;
}