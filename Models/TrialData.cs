using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using MotoPasja.Models.Blog;
using System.Globalization;
using Microsoft.AspNetCore.Identity;
using MotoPasja.Models.Identity;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace MotoPasja.Models
{
    public static class TrialData
    {
        public static BlogModel CreateBlog(IConfiguration configuration)
        {
            return (new BlogModel
            {
                AuthorId = "28a6b1e7-fe14-4f61-b54c-31cc352b6501",
                Title = "Motocyklem po Polsce i Europie",
                Contents = "Bycie motocyklistą wiąże się z dumnym posiadaniem wypasionych dwóch kółek, uciechą z jazdy oraz podrywaniem dziewczyn (lub chłopaków). Jednak oprócz tego pojawia się wiele, nieuświadomionych na początku, kwestii. Począwszy od tego, że po uciułaniu na wymarzoną maszynę masz o wiele chudszy portfel, kończąc na tym, że całkowicie zmienia się twój język i zaczynasz posługiwać się motocyklowym slangiem. Poznaj 10 smaczków z życia “prawdziwego” motocyklisty.",
                DateOfAddition = DateTime.Now,
                EditingDate = DateTime.Now,
                Images = new List<BlogImage>
                        {
                            new BlogImage
                            {
                                Src = "images/aaa.jpg"
                            }
                        },
                Posts = new List<PostModel>
                        {
                            new PostModel
                            {
                                AuthorId = "28a6b1e7-fe14-4f61-b54c-31cc352b6501",
                                Title = "Przyjaciele i obcy",
                                Contents = "Kiedy już stałeś się dumnym właścicielem dwóch kółek, nagle okazuje się, że masz bardzo wielu przyjaciół, którzy też palą się do jazdy… najchętniej twoją maszyną. Większość  z nich w ostateczności zadowoli się selfie na tle twojego motocykla, ale kilku będzie się zarzekało, że posiada wybitne umiejętności profesjonalnego motocyklisty, żeby przekonać cię do rundki po osiedlu. Nie pozwól na to! Na 100% wrócą z plastikami w ręku, przysięgając, że to nie była ich wina.",
                                DateOfAddition = DateTime.Now,
                                EditingDate = DateTime.Now,
                                Images = new List<PostImage>
                                {
                                    new PostImage
                                    {
                                        Src = "images/aaa.jpg"
                                    },
                                    new PostImage
                                    {
                                        Src = "images/aaa.jpg"
                                    },
                                    new PostImage
                                    {
                                        Src = "images/aaa.jpg"
                                    }
                                }
                            },
                            new PostModel
                            {
                                AuthorId = "28a6b1e7-fe14-4f61-b54c-31cc352b6501",
                                Title = "Przyjaciele i obcy",
                                Contents = "Kiedy już stałeś się dumnym właścicielem dwóch kółek, nagle okazuje się, że masz bardzo wielu przyjaciół, którzy też palą się do jazdy… najchętniej twoją maszyną. Większość  z nich w ostateczności zadowoli się selfie na tle twojego motocykla, ale kilku będzie się zarzekało, że posiada wybitne umiejętności profesjonalnego motocyklisty, żeby przekonać cię do rundki po osiedlu. Nie pozwól na to! Na 100% wrócą z plastikami w ręku, przysięgając, że to nie była ich wina.",
                                DateOfAddition = DateTime.Now,
                                EditingDate = DateTime.Now,
                                Images = new List<PostImage>
                                {
                                    new PostImage
                                    {
                                        Src = "images/aaa.jpg"
                                    },
                                    new PostImage
                                    {
                                        Src = "images/aaa.jpg"
                                    },
                                    new PostImage
                                    {
                                        Src = "images/aaa.jpg"
                                    }
                                }
                            }

                        }
            });
        }
        public static void EnsureBlogsAndPosts(IApplicationBuilder app, IConfiguration configuration)
        {
            ApplicationDbContext context = app.ApplicationServices
                .GetRequiredService<ApplicationDbContext>();

            context.Database.Migrate();
            if (!context.Blogs.Any())
            {
                context.Add(CreateBlog(configuration));
                context.Add(CreateBlog(configuration));
                context.Add(CreateBlog(configuration));
                context.Add(CreateBlog(configuration));
            }
            context.SaveChanges();
        }

        public static async void EnsureUsers(IApplicationBuilder app)
        {
            UserManager<AppUser> userManager = app.ApplicationServices
                .GetRequiredService<UserManager<AppUser>>();

            const string adminName = "admin";
            const string adminPassword = "Admin123!";

            AppUser admin = await userManager.FindByNameAsync(adminName);
            if (admin == null)
            {
                admin = new AppUser
                {
                    Avatar = File.ReadAllBytes($@"C:\Users\lukas\Pulpit\team.png"),
                    UserName = adminName
                };
                await userManager.CreateAsync(admin, adminPassword);
            }

            const string userName = "user";
            const string userPassword = "User123!";

            AppUser user = await userManager.FindByNameAsync(userName);
            if (user == null)
            {
                user = new AppUser
                {
                    Avatar = File.ReadAllBytes($@"C:\Users\lukas\Pulpit\team.png"),
                    UserName = userName
                };
                await userManager.CreateAsync(user, userPassword);
            }
        }
    }
}
