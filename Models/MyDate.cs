using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace MotoPasja.Models
{
    public static class MyDate
    {
        public static string GetDate_ddmmrrrr_ggmm_Format()
        {
            return DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("de-DE"));
        }
    }
}
