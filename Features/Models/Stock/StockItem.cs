using System;
using System.Collections.Generic;

namespace CMS.Features.Models.Stock
{
    public class StockItem
    {
        public StockItem()
        {
            StockAccessories = new HashSet<StockAccessory>();
            StockImages = new HashSet<StockImage>();
        }

        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int? ModelYear { get; set; }
        public int? CurrentKilometerReading { get; set; }
        public string Colour { get; set; }
        public string Vin { get; set; }
        public double? RetailPrice { get; set; }
        public double? CostPrice { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }

        public virtual ICollection<StockAccessory> StockAccessories { get; set; }
        public virtual ICollection<StockImage> StockImages { get; set; }

    }
}
