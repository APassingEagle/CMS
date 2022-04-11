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
	public class CreateImage
	{
		public class Command : IRequest<Response>
		{
            public StockImage Image { get; set; }
        }

		public class Response
		{
			public bool HasSucceeded { get; set; }
            public string Message { get; set; }
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
				request.Image.Id = Guid.NewGuid();
				
				_dbContext.StockImages.Add(request.Image);
				await _dbContext.SaveChangesAsync();

				return new Response
				{
					HasSucceeded = true,
                    Message = "Image saved!"
				};
			}
		}
	}
}
