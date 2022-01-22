import * as Boom from '@hapi/boom';
import axios, { AxiosResponse } from 'axios';
import { Injectable } from '../di/injectable/injectable';

@Injectable('GoogleBookService')
export class GoogleBookService {
  public async searchBook(name: string): Promise<any> {
    const response: AxiosResponse = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${name}`,
    );
    if (response.data && response.data.items && response.data.items.length) {
      const book = response.data.items.find(
        (x: any) => x.volumeInfo.title.toUpperCase() === name.toUpperCase(),
      );
      if (book) {
        return book;
      }
    }
    throw Boom.notFound(`No book found by name: ${name}`);
  }
}
