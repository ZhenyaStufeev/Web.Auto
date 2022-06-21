using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Web.Bll.Services.Interfaces
{
    public interface IApiService
    {
        Task<object> novaFindCitites(string cityKeyWord);
        Task<object> novaGetWarehouses(string refCity);
    }
}
