import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filterName' })
export class FilterNamePipe implements PipeTransform {
  transform(name: any, searchText: any): any {
    if(searchText == null) return name;

    return name.filter(function(category){
      return category.client_nickname.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
