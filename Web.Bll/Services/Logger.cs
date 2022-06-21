using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Services;
using Web.Bll.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Diagnostics;

namespace Web.Bll.Utils
{
    public class Logger : ILogger
    {
        private string Latest_log_file_path { get; set; }
        private string Old_log_files_path_dir { get; set; }
        private string Log_dir { get; set; }
        public bool IsEnabledSignalR { get; set; }
        public Logger(string log_dir, bool IsEnableDefaultSignalR)
        {
            SetOfInstancePaths(log_dir, IsEnableDefaultSignalR);
        }
        public Logger(string log_dir)
        {
            SetOfInstancePaths(log_dir);
        }
        public Logger(bool IsEnableDefaultSignalR)
        {
            SetOfInstancePaths("", IsEnableDefaultSignalR);
        }
        public Logger()
        {
            SetOfInstancePaths();
        }
        private void SetOfInstancePaths(string env_dir = "", bool IsEnabledSignalRSender = true)
        {
            IsEnabledSignalR = IsEnabledSignalRSender;

            if (env_dir.Length == 0)
                Log_dir = Directory.GetCurrentDirectory() + @"\logs";
            else
                Log_dir = env_dir;

            Latest_log_file_path = Log_dir + @"\latest_log.txt";
            Old_log_files_path_dir = Log_dir + @"\old_logs";

            Directory.CreateDirectory(Old_log_files_path_dir);
            if (File.Exists(Latest_log_file_path))
            {
                File.Move(Latest_log_file_path, (Old_log_files_path_dir + "\\" + DateTime.Now.ToString("MM-dd-yyyy HH-mm-ss") + "_save_log.txt"));
            }
        }

        private readonly object key = new();
        public virtual async void LogAsync(string log_data)
        {
            string debug_info = log_data + "\n\n";
            string signalr_debug_error = "error: [SignalRContext] Object reference not set to an instance of an object.";
            await Task.Run(() =>
            {
                lock (key)
                {
                    if (IsEnabledSignalR)
                    {
                        if (SignalRHost.SignalRContext != null)
                        {
                            SignalRHost.SignalRContext.Clients.All.SendAsync("debug", debug_info);
                        }
                        else
                        {
                            Debug.WriteLine(signalr_debug_error);
                            debug_info += (signalr_debug_error + "\n\n");
                        }
                    }
                    try
                    {
                        File.AppendAllText(Latest_log_file_path, debug_info);
                    }
                    catch (Exception ex)
                    {
                        Debug.WriteLine(ex.Message);
                    }
                }
            });
        }
    }
}
