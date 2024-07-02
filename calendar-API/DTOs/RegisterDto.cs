using System.ComponentModel.DataAnnotations;

namespace calendar_API.DTOs;

public class RegisterDto
{
    [Required] 
    public string FullName { get; set; } = null!;
    [Required] 
    public string UserName { get; set; } = null!;
    [Required] 
    public string Password { get; set; } = null!;
    [Required] 
    public string ConfirmPassword { get; set; } = null!;
}