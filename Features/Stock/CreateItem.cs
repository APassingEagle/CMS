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
    public class CreateItem
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
            private readonly CMSContext _dbContext;
            private const int PageSize = 5;

            public CommandHandler(
                CMSContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                var costPrice = request.StockItem.CostPrice.ToString().Replace(".", ",");
                var retailPrice = request.StockItem.RetailPrice.ToString().Replace(".", ",");

                request.StockItem.CostPrice = Decimal.Parse(costPrice);
                request.StockItem.RetailPrice = Decimal.Parse(retailPrice);

                _dbContext.StockItems.Add(request.StockItem);
                await _dbContext.SaveChangesAsync();

                return new Response
                {
                    HasSucceeded = true,
                    Message = "Item created!"
                };
            }
        }
    }
}
