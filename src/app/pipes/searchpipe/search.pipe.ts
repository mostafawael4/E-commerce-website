import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../../interface/productsinterface/products';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(products: product[], userWord: string): product[] {

    if(!userWord)
    {
      return products;
    }
    return products.filter((product) => {
      return product.title.toLowerCase().includes(userWord.toLocaleLowerCase());
    });
  }
}
