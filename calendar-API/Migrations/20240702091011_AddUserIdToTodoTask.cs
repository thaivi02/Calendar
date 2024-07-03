using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace calendar_API.Migrations
{
    public partial class AddUserIdToTodoTask : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "TodoTask",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_TodoTask_UserId",
                table: "TodoTask",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoTask_User",
                table: "TodoTask",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoTask_User",
                table: "TodoTask");

            migrationBuilder.DropIndex(
                name: "IX_TodoTask_UserId",
                table: "TodoTask");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TodoTask");
        }
    }
}
