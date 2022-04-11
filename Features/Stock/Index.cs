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
    public class Index
    {
        public class Query : IRequest<Response>
        {
            public int CurrentPage { get; set; }
            public string SearchText { get; set; }
        }

        public class Response
        {
            public IList<StockItem> Items { get; set; }
            public int PageCount { get; set; }
            public int CurrentPage { get; set; }
            public string SearchText { get; internal set; }
        }

        public class QueryHandler : IRequestHandler<Query, Response>
        {
            private readonly CMSContext _dbContext;
            private const int PageSize = 3;

            public QueryHandler(
                CMSContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var stockItems = await _dbContext.StockItems.AsNoTracking()
                                    .Include(x => x.StockImages)
                                    .Include(x => x.StockAccessories)
                                    .ToListAsync(cancellationToken);

                if (!string.IsNullOrEmpty(request.SearchText))
                {
                    stockItems = stockItems.Where(x =>
                                            x.Make.ToLower().Contains(request.SearchText.ToLower()) ||
                                            x.Model.ToLower().Contains(request.SearchText.ToLower())
                                        )
                                  .ToList();
                }



                var pageCount = (int)Math.Ceiling(decimal.Divide(stockItems.Count, PageSize));
                var filteredStockItems = stockItems.ApplyPageFilter(request.CurrentPage, PageSize).ToList();

                var currentPage = request.CurrentPage;
                if (request.CurrentPage == pageCount)
                {
                    currentPage = request.CurrentPage == 0 ? 0 : request.CurrentPage - 1;
                }

                return new Response
                {
                    Items = filteredStockItems,
                    PageCount = pageCount,
                    CurrentPage = currentPage,
                    SearchText = request.SearchText
                };
            }
        }
    }
}
