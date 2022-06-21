using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities;

namespace Web.Bll.Services.Interfaces
{
    public interface IDebugService
    {
        Task<ResponceResult> SendQueryAsync(string SQL);
    }
}
