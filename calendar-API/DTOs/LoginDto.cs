﻿using System.ComponentModel.DataAnnotations;

namespace calendar_API.DTOs;

public class LoginDto
{
    [Required]
    public string UserName { get; set; } = null!;
    [Required]
    public string Password { get; set; } = null!;
}