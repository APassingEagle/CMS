using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Make { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Model { get; set; }
        public int? ModelYear { get; set; }
        public int? CurrentKilometerReading { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Colour { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Vin { get; set; }
        public decimal? RetailPrice { get; set; }
        public decimal? CostPrice { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }

        public virtual ICollection<StockAccessory> StockAccessories { get; set; }
        public virtual ICollection<StockImage> StockImages { get; set; }
    }
}
