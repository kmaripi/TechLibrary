import * as axios from 'axios';
import { API } from './config';

const getBooks = async function () {
    try {
        const response = await axios.get(`${API}/books`);
        const books = response.data;
        return books;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getBook = async function (id) {
    try {
        const response = await axios.get(`${API}/books/${id}`);
        const book = parseItem(response, 200);
        return book;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const updateBook = async function (book) {
    try {
        const response = await axios.put(`${API}/books`, book);
        const updatedBook = parseItem(response, 200);
        return updatedBook;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const addBook = async function (book) {
    try {
        const response = await axios.post(`${API}/books`, book);
        const addedBook = parseItem(response, 201);
        return addedBook;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteBook = async function (book) {
    try {
        const response = await axios.delete(`${API}/books/${book.id}`);
        parseItem(response, 200);
        return book.id;
    } catch (error) {
        console.error(error);
        return null;
    }
};

//const parseList = response => {
//    if (response.status !== 200) throw Error(response.message);
//    if (!response.data) return [];
//    let list = response.data;
//    if (typeof list !== 'object') {
//        list = [];
//    }
//    return list;
//};

export const parseItem = (response, code) => {
    if (response.status !== code) throw Error(response.message);
    let item = response.data;
    if (typeof item !== 'object') {
        item = undefined;
    }
    return item;
};

export const dataService = {
    getBooks,
    getBook,
    updateBook,
    addBook,
    deleteBook
}

