﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MotoPasja.Models;

namespace MotoPasja.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MotoPasja.Models.Blog.BlogImage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Alt");

                    b.Property<int>("BlogModelId");

                    b.Property<string>("Src");

                    b.HasKey("Id");

                    b.HasIndex("BlogModelId");

                    b.ToTable("BlogImage");
                });

            modelBuilder.Entity("MotoPasja.Models.Blog.BlogModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AuthorId");

                    b.Property<float>("AverageRating");

                    b.Property<string>("Contents");

                    b.Property<DateTime>("DateOfAddition");

                    b.Property<DateTime>("EditingDate");

                    b.Property<byte[]>("Miniature");

                    b.Property<int>("NumberOfRatings");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Blogs");
                });

            modelBuilder.Entity("MotoPasja.Models.Blog.PostImage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Alt");

                    b.Property<int>("PostModelId");

                    b.Property<string>("Src");

                    b.HasKey("Id");

                    b.HasIndex("PostModelId");

                    b.ToTable("PostImage");
                });

            modelBuilder.Entity("MotoPasja.Models.Blog.PostModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AuthorId");

                    b.Property<int>("BlogModelId");

                    b.Property<string>("Contents");

                    b.Property<DateTime>("DateOfAddition");

                    b.Property<DateTime>("EditingDate");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("BlogModelId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("MotoPasja.Models.Blog.RatingBlogModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author");

                    b.Property<int>("BlogModelId");

                    b.Property<string>("DateOfAddition");

                    b.Property<string>("EditingDate");

                    b.Property<float>("Rating");

                    b.HasKey("Id");

                    b.HasIndex("BlogModelId");

                    b.ToTable("RatingBlogModel");
                });

            modelBuilder.Entity("MotoPasja.Models.Blog.BlogImage", b =>
                {
                    b.HasOne("MotoPasja.Models.Blog.BlogModel")
                        .WithMany("Images")
                        .HasForeignKey("BlogModelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MotoPasja.Models.Blog.PostImage", b =>
                {
                    b.HasOne("MotoPasja.Models.Blog.PostModel")
                        .WithMany("Images")
                        .HasForeignKey("PostModelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MotoPasja.Models.Blog.PostModel", b =>
                {
                    b.HasOne("MotoPasja.Models.Blog.BlogModel")
                        .WithMany("Posts")
                        .HasForeignKey("BlogModelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MotoPasja.Models.Blog.RatingBlogModel", b =>
                {
                    b.HasOne("MotoPasja.Models.Blog.BlogModel")
                        .WithMany("Ratings")
                        .HasForeignKey("BlogModelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
