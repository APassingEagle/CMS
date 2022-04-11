using System.Collections.Generic;
using System.Linq;

namespace CMS.Extensions
{
	public static class ListExtensions
	{
		public static List<T> ApplyPageFilter<T>(this List<T> source, int currentPage, int pageSize)
		{
			var skipCount = currentPage * pageSize;

			// This 'if' is to determine whether you've deleted the last item in the last page
			// If you have, then load the previous page's content
			if (skipCount == source.Count)
            {
				var newSkipCount = (currentPage - 1) * pageSize;
				return source != null && source.Any() ?
					source.Skip(newSkipCount)
					  .Take(pageSize)
					  .ToList<T>() : Enumerable.Empty<T>().ToList();
			}
			else
            {
				return source != null && source.Any() ?
					source.Skip(skipCount)
					  .Take(pageSize)
					  .ToList<T>() : Enumerable.Empty<T>().ToList();
			}
		}
	}
}