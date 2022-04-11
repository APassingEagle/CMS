using AutoMapper;
using CMS.Data;
using CMS.Extensions;
using CMS.Features.Models.Stock;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CMS.Features.Stock
{
    public class Update
    {
        public class Command : IRequest<Response>
        {
            public StockItem StockItem { get; set; }
        }

        public class Response
        {
            public bool HasSucceeded { get; set; }
            public string Message { get; set; }
        }

        public class CommandHandler : IRequestHandler<Command, Response>
        {
            private readonly IMapper _mapper;
            private readonly CMSContext _dbContext;
            private const int PageSize = 5;

            public CommandHandler(
                IMapper mapper,
                CMSContext dbContext)
            {
                _mapper = mapper;
                _dbContext = dbContext;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                //var record = await _dbContext.StockItems.FindAsync(request.StockItem.Id);
                var record = await _dbContext.StockItems.FirstOrDefaultAsync(x=>x.Id == request.StockItem.Id, cancellationToken);

                record.DateUpdated = DateTime.UtcNow;

                record.Make = request.StockItem.Make;
                record.ModelYear = request.StockItem.ModelYear;
                record.Model = request.StockItem.Model;
                record.CurrentKilometerReading = request.StockItem.CurrentKilometerReading;
                record.Colour = request.StockItem.Colour;
                record.Vin = request.StockItem.Vin;
                record.CostPrice = request.StockItem.CostPrice;
                record.RetailPrice = request.StockItem.RetailPrice;

                //_mapper.Map(request.StockItem, record);

                try
                {
                    var entries = await _dbContext.SaveChangesAsync(cancellationToken);
                }
                catch (DbUpdateException exception)
                {
                    return new Response
                    {
                        Message = exception.GetBaseException().Message
                    };
                }

                return new Response
                {
                    HasSucceeded = true,
                    Message = "Item updated!"
                };
            }
        }
    }
}
