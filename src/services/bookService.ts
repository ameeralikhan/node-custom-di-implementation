import * as Boom from '@hapi/boom';
import * as LocalStorage from 'node-localstorage';
import { container } from '../di/container/container';
import { Inject } from '../di/injectable/inject';
import { Injectable } from '../di/injectable/injectable';
import { IBookRequest } from '../interfaces';
import { BookRepository } from '../repository/book';
import { Validation } from '../validations';
import { bookRequest } from '../validations/schemas';
import { GoogleBookService } from './googleBookService';

@Injectable('BookService')
export class BookService {
  // tslint:disable-next-line: member-access
  tempDb;
  @Inject('Validation') private validation: Validation;
  @Inject('GoogleBookService') private googleBookService: GoogleBookService;
  @Inject('BookRepository') private bookRepository: BookRepository;

  constructor() {
    this.tempDb = new LocalStorage.LocalStorage('./temp-db');
  }
  public async getAll(): Promise<[]> {
    return this.bookRepository.getBooks();
  }

  public async create(payload: IBookRequest): Promise<any> {
    await this.validation.validate(payload, bookRequest);
    const book = await this.googleBookService.searchBook(payload.name);
    const dataToSave = {
      id: +new Date(),
      name: book.volumeInfo.title,
      author: book.volumeInfo.authors[0],
      description: book.volumeInfo.description,
      publishedDate: book.volumeInfo.publishedDate,
      publisher: book.volumeInfo.publisher,
    };
    this.bookRepository.saveBook(dataToSave);
    return dataToSave;
  }

  public async remove(id: number): Promise<any> {
    const book = this.bookRepository.getById(id);
    if (!book) {
      throw Boom.notFound('Book not found');
    }
    this.bookRepository.remove(id);
  }
}

container.resolve('BookService');
