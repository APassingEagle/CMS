using System.Collections.Generic;
using System.Linq;

namespace CMS.Extensions
{
	public static class ListExtensions
	{
		public static List<T> ApplyPageFilter<T>(this List<T> source, int currentPage, int pageSize)
		{
			var skipCount = currentPage * pageSize;
			return source != null && source.Any() ?
				source.Skip(skipCount)
					  .Take(pageSize)
					  .ToList<T>() : Enumerable.Empty<T>().ToList();
		}
	}
}