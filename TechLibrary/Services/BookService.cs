using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TechLibrary.Data;
using TechLibrary.Domain;
using TechLibrary.Models;

namespace TechLibrary.Services
{
    public interface IBookService
    {
        Task<List<Book>> GetBooksAsync();
        Task<Book> GetBookByIdAsync(int bookid);
        Task<Book> UpdateBookAsync(BookResponse book);
        Task<Book> AddBookAsync(BookResponse book);
    }

    public class BookService : IBookService
    {
        private readonly DataContext _dataContext;

        public BookService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Book>> GetBooksAsync()
        {
            var queryable = _dataContext.Books.AsQueryable();

            return await queryable.ToListAsync();
        }

        public async Task<Book> GetBookByIdAsync(int bookid)
        {
            return await _dataContext.Books.SingleOrDefaultAsync(x => x.BookId == bookid);
        }

        public async Task<Book> UpdateBookAsync(BookResponse book)
        {
            Book updateBook = new Book()
            {
                BookId = book.BookId,
                ISBN = book.ISBN,
                LongDescr = book.Descr,
                PublishedDate = book.PublishedDate,
                ThumbnailUrl = book.ThumbnailUrl,
                Title = book.Title,
                ShortDescr = book.Descr
            };
            _dataContext.Update(updateBook);
            await _dataContext.SaveChangesAsync();
            return await _dataContext.Books.SingleOrDefaultAsync(x => x.BookId == book.BookId);
        }

        public async Task<Book> AddBookAsync(BookResponse book)
        {
            Book addBook = new Book()
            {
                ISBN = book.ISBN,
                LongDescr = book.Descr,
                PublishedDate = book.PublishedDate,
                ThumbnailUrl = book.ThumbnailUrl,
                Title = book.Title,
                ShortDescr = book.Descr
            };

            await _dataContext.AddAsync(addBook);
            await _dataContext.SaveChangesAsync();
            return await _dataContext.Books.OrderByDescending(h => h.BookId).SingleOrDefaultAsync();
        }
    }
}
