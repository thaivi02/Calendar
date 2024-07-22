using System.ComponentModel.DataAnnotations;

namespace calendar_API.DTOs;

public class ChangePasswordDto
{
    [Required]
    public string OldPassword { get; set; }
    [Required]
    public string NewPassword { get; set; }
    [Required]
    public string ConfirmPassword { get; set; }
}