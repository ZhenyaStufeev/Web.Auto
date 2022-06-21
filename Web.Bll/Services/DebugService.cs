using DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities;
using Web.Bll.Services.Interfaces;

namespace Web.Bll.Services
{
    public class DebugService : IDebugService
    {
        readonly ApplicationContext context;
        public DebugService(ApplicationContext db)
        {
            this.context = db;
        }

        readonly object key = new();
        public async Task<ResponceResult> SendQueryAsync(string SQL)
        {
            return await Task.Run(() =>
            {
                lock (key)
                {
                    ResponceResult result = new() { Succeeded = true };
                    try
                    {
                        using var command = context.Database.GetDbConnection().CreateCommand();
                        command.CommandText = SQL;
                        context.Database.OpenConnection();
                        using var reader = command.ExecuteReader();
                        DataTable schemaTable = reader.GetSchemaTable();
                        dynamic return_result = new { schema_names = new List<object>(), rows = new List<object>() };
                        foreach (DataRow row in schemaTable.Rows)
                        {
                            foreach (DataColumn column in schemaTable.Columns)
                            {
                                if (column.ColumnName == "ColumnName")
                                {
                                    return_result.schema_names.Add(row[column]);
                                }
                            }
                        }
                        while (reader.Read())
                        {
                            List<object> current_field = new();
                            for (int i = 0; i < reader.FieldCount; ++i)
                            {
                                current_field.Add(reader[i]);
                            }
                            return_result.rows.Add(current_field);
                        }
                        result.Result.Add(return_result);
                    }
                    catch (Exception ex)
                    {
                        result.Errors.Add(ex.Message);
                        result.Succeeded = false;
                    }
                    return result;
                }
            });

        }
    }
}
