import * as Boom from '@hapi/boom';
import * as LocalStorage from 'node-localstorage';
import { container } from '../di/container/container';
import { Injectable } from '../di/injectable/injectable';
import { IBookRequest } from '../interfaces';

@Injectable('BookRepository')
export class BookRepository {
    // tslint:disable-next-line: member-access
    tempDb;
    constructor() {
        this.tempDb = new LocalStorage.LocalStorage('./temp-db');
    }

    public getBooks() {
        const books = this.tempDb.getItem('books');
        let arr = [];
        if (books) {
            arr = JSON.parse(books);
        }
        return arr;
    }

    public getById(id: number): any {
        const books = this.getBooks();
        const book = books.find((x: any) => x.id === id);
        return book;
    }

    public remove(id: number): void {
        const books = this.getBooks();
        const book = books.find((x: any) => x.id === id);
        const index = books.indexOf(book);
        books.splice(index, 1);
        this.tempDb.setItem('books', JSON.stringify(books));
    }

    public saveBook(book: IBookRequest) {
        const books = this.tempDb.getItem('books');
        let arr = [];
        if (books) {
            arr = JSON.parse(books);
        }
        arr.push(book);
        this.tempDb.setItem('books', JSON.stringify(arr));
    }
}

container.resolve('BookRepository');
