using System;
using System.Collections.Generic;

namespace calendar_API.Models
{
    public partial class TodoTask
    {
        public int TaskId { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int PriorityId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string UserId { get; set; } = null!;
        public virtual Priority Priority { get; set; } = null!;
        public virtual AppUser User { get; set; } = null!;
    }
}
