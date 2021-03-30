import Vue from 'vue';
import Vuex from 'vuex';

import { dataService } from '../shared/data.Service';
import {
    ADD_BOOK,
    DELETE_BOOK,
    GET_BOOKS,
    UPDATE_BOOK,   
} from './mutation-types';

Vue.use(Vuex);

const state = () => ({
    books: [],
    filter: "",
});

const mutations = {
    [ADD_BOOK](state, book) {
        state.books.push(book); 
    },
    [UPDATE_BOOK](state, book) {
        const index = state.books.findIndex(h => h.id === book.bookId);
        state.books.splice(index, 1, book);
        state.books = [...state.books];
    },
    [GET_BOOKS](state, books) {
        state.books = books;
    },
    [DELETE_BOOK](state, bookId) {
        state.books = [...state.books.filter(p => p.id !== bookId)];
    },  
};


const actions = {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async addBookAction({ commit }, book) {
        const addedBook = await dataService.addBook(book);
        commit(ADD_BOOK, addedBook);
    },
    async deleteBookAction({ commit }, book) {
        const deletedBookId = await dataService.deleteBook(book);
        commit(DELETE_BOOK, deletedBookId);
    },
    async getBooksAction({ commit }) {
        const books = await dataService.getBooks();
        commit(GET_BOOKS, books);
    },
    async updateBookAction({ commit }, book) {
        const updatedBook = await dataService.updateBook(book);
        commit(UPDATE_BOOK, updatedBook);
    }, 
};

const getters = {
    getBookById: state => id => state.books.find(h => h.id === id),
    searchResult: (state) => search => {
        return search != '' ? state.books.filter(h => h.title.toLowerCase().includes(search.toLowerCase())
            || h.descr.toLowerCase().includes(search.toLowerCase())) : state.books;
    },    
};


export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    mutations,
    actions,
    getters,
});
