using System;

namespace CMS.Features.Models.Stock
{
    public class StockImage
    {
        public Guid Id { get; set; }
        public int? StockItemId { get; set; }
        public string ImageName { get; set; }
        public byte[] ImageBinary { get; set; }

        public virtual StockItem StockItem { get; set; }
    }
}
