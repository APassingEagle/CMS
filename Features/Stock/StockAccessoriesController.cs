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
    public class StockAccessoriesController : Controller
    {
        private readonly CMSContext _context;
        private readonly IMediator _mediator;

        public StockAccessoriesController(CMSContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccessory(CreateAccessory.Command command)
        {
            var result = await _mediator.Send(command);
            return Json(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAccessory(int? id)
        {
            var accessory = await _context.StockAccessories
                .FirstOrDefaultAsync(x => x.Id == id);

            _context.StockAccessories.Remove(accessory);

            await _context.SaveChangesAsync();
            
            return Json("Success");
        }
    }
}
