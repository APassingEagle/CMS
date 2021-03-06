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
	public class CreateAccessory
	{
		public class Command : IRequest<Response>
		{
            public StockAccessory StockAccessory { get; set; }
        }

		public class Response
		{
			public bool Success { get; set; }
		}

		public class QueryHandler : IRequestHandler<Command, Response>
		{
			private readonly CMSContext _dbContext;

			public QueryHandler(
				CMSContext dbContext)
			{
				_dbContext = dbContext;
			}

			public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
			{
				_dbContext.StockAccessories.Add(request.StockAccessory);
				await _dbContext.SaveChangesAsync();

				return new Response
				{
					Success = true
				};
			}
		}
	}
}
