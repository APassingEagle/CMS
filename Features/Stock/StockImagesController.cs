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
    public class StockImagesController : Controller
    {
        private readonly CMSContext _context;
        private readonly IMediator _mediator;

        public StockImagesController(CMSContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateImage(CreateImage.Command command)
        {
            var result = await _mediator.Send(command);
            return Json(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteImage(Guid? id)
        {
            var image = await _context.StockImages
                .FirstOrDefaultAsync(m => m.Id == id);

            _context.StockImages.Remove(image);
            await _context.SaveChangesAsync();

            return Json("Success");
        }
    }
}
