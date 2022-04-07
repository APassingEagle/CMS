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
		public class Query : IRequest<Response>
		{
            public StockAccessory StockAccessory { get; set; }
        }

		public class Response
		{
			public bool Success { get; set; }
		}

		public class QueryHandler : IRequestHandler<Query, Response>
		{
			private readonly CMSContext _dbContext;
			private const int PageSize = 5;

			public QueryHandler(
				CMSContext dbContext)
			{
				_dbContext = dbContext;
			}

			public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
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
