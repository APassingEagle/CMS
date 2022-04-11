using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Features.Models.Stock;
using MediatR;

namespace CMS.Features.Stock
{
    public class StockItemsController : Controller
    {
        private readonly CMSContext _context;
        private readonly IMediator _mediator;

        public StockItemsController(CMSContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        public async Task<IActionResult> FetchStock(Index.Query query)
        {
            var result = await _mediator.Send(query);
            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateItem.Command command)
        {
            var result = await _mediator.Send(command);
            return Json(result);
        }

        public async Task<IActionResult> View(int id)
        {
            var stockItem = await _context.StockItems
                .Include(x => x.StockImages)
                .Include(x => x.StockAccessories)
                .FirstOrDefaultAsync(m => m.Id == id);

            return Json(stockItem);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Update.Command command)
        {
            var result = await _mediator.Send(command);
            return Json(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var stockItem = await _context.StockItems
                .Include(x => x.StockImages)
                .Include(x => x.StockAccessories)
                .FirstOrDefaultAsync(x => x.Id == id);

            _context.StockItems.Remove(stockItem);

            await _context.SaveChangesAsync();
            return Json("Successfully deleted");
        }
    }
}
