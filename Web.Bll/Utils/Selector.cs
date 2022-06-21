using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Bll.Utils
{
    public class Selector
    {
        //public int beginCount { get; private set; }
        //public int count { get; private set; }
        //public int totalPages { get; private set; }
        private int CurrentlyPage { get; set; }
        private int TotalItems { get; set; }
        private int Range { get; set; }

        public Selector(int currentPage, int totalItems, int rangeItems)
        {
            this.CurrentlyPage = currentPage;
            this.TotalItems = totalItems;
            this.Range = rangeItems;
        }

        public SelectedInfo CalculateSelector()
        {
            SelectedInfo selectedInfo = new();
            int usePage = CurrentlyPage <= 0 ? 1 : CurrentlyPage;

            selectedInfo.BeginCount = (usePage * Range) - Range;
            selectedInfo.ItemsCount = Range;

            double drange = Range;
            double dpageCount = TotalItems / drange;
            int ipageCount = TotalItems / Range;

            if (dpageCount - ipageCount > 0.0)
            {
                ipageCount++;
            }
            selectedInfo.TotalPages = ipageCount;
            return selectedInfo;
        }
    }

    public class SelectedInfo
    {
        public int BeginCount { get; set; }
        public int ItemsCount { get; set; }
        public int TotalPages { get; set; }
    }
}
