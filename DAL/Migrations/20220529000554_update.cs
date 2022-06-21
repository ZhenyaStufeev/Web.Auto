using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.DropTable(
                name: "SectionBlocks");

            migrationBuilder.DropTable(
                name: "SectionNavigations");

            migrationBuilder.DropTable(
                name: "TextParams");

            migrationBuilder.DropTable(
                name: "Langs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Langs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Key = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    LangInterpretations = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Position = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Langs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TextParams",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LangId = table.Column<int>(type: "int", nullable: true),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TextParams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TextParams_Langs_LangId",
                        column: x => x.LangId,
                        principalTable: "Langs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SectionBlocks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Position = table.Column<int>(type: "int", nullable: false),
                    SectionType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextParamId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SectionBlocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SectionBlocks_TextParams_TextParamId",
                        column: x => x.TextParamId,
                        principalTable: "TextParams",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SectionNavigations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Position = table.Column<int>(type: "int", nullable: false),
                    TextParamId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SectionNavigations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SectionNavigations_TextParams_TextParamId",
                        column: x => x.TextParamId,
                        principalTable: "TextParams",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SectionBlockId = table.Column<int>(type: "int", nullable: true),
                    SectionNavigationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sections_SectionBlocks_SectionBlockId",
                        column: x => x.SectionBlockId,
                        principalTable: "SectionBlocks",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Sections_SectionNavigations_SectionNavigationId",
                        column: x => x.SectionNavigationId,
                        principalTable: "SectionNavigations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Langs_Key",
                table: "Langs",
                column: "Key",
                unique: true,
                filter: "[Key] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_SectionBlocks_TextParamId",
                table: "SectionBlocks",
                column: "TextParamId");

            migrationBuilder.CreateIndex(
                name: "IX_SectionNavigations_TextParamId",
                table: "SectionNavigations",
                column: "TextParamId");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_SectionBlockId",
                table: "Sections",
                column: "SectionBlockId");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_SectionNavigationId",
                table: "Sections",
                column: "SectionNavigationId");

            migrationBuilder.CreateIndex(
                name: "IX_TextParams_LangId",
                table: "TextParams",
                column: "LangId");
        }
    }
}
