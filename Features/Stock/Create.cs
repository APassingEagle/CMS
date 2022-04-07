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
	public class Create
	{
		public class Command : IRequest<Response>
		{
            public StockItem StockItem { get; set; }
        }

		public class Response
		{
			public bool Success { get; set; }
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
				var stockItems = await _dbContext.StockItems.ToListAsync();

				_dbContext.StockItems.Add(request.StockItem);
				await _dbContext.SaveChangesAsync();

				return new Response
				{
					Success = true
				};
			}
		}
	}
}
