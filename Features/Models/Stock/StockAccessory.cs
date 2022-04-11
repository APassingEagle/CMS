using System;

namespace CMS.Features.Models.Stock
{
    public class StockAccessory
    {
        public int Id { get; set; }
        public int StockItemId { get; set; }
        public string AccessoryName { get; set; }
        public string AccessoryDescription { get; set; }
        public DateTime? DateAdded { get; set; }

        public virtual StockItem StockItem { get; set; }
    }
}
