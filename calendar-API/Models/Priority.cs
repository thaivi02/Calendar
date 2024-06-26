using System;
using System.Collections.Generic;

namespace calendar_API.Models
{
    public partial class Priority
    {
        public Priority()
        {
            TodoTasks = new HashSet<TodoTask>();
        }

        public int PriorityId { get; set; }
        public string PriorityName { get; set; } = null!;

        public virtual ICollection<TodoTask> TodoTasks { get; set; }
    }
}
