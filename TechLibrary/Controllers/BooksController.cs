using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using TechLibrary.Domain;
using TechLibrary.Models;
using TechLibrary.Services;

namespace TechLibrary.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : Controller
    {
        private readonly ILogger<BooksController> _logger;
        private readonly IBookService _bookService;
        private readonly IMapper _mapper;

        public BooksController(ILogger<BooksController> logger, IBookService bookService, IMapper mapper)
        {
            _logger = logger;
            _bookService = bookService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Get all books");

            var books = await _bookService.GetBooksAsync();

            var bookResponse = _mapper.Map<List<BookResponse>>(books);

            return Ok(bookResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            _logger.LogInformation($"Get book by id {id}");

            var book = await _bookService.GetBookByIdAsync(id);

            var bookResponse = _mapper.Map<BookResponse>(book);

            return Ok(bookResponse);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateBook(BookResponse book)
        {
            _logger.LogInformation($"Updating book info {@book.BookId}");

            var updatedBook = await _bookService.UpdateBookAsync(book);

            var bookResponse = _mapper.Map<BookResponse>(updatedBook);

            return Ok(bookResponse);
        }


        [HttpPost]
        public async Task<IActionResult> AddBook(BookResponse book)
        {
            _logger.LogInformation($"Adding a new book record");

            var newBook = await _bookService.AddBookAsync(book);

            var bookResponse = _mapper.Map<BookResponse>(newBook);

            return Ok(bookResponse);
        }
    }
}
