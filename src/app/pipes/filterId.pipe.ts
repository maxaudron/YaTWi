import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filterId' })
export class FilterIdPipe implements PipeTransform {
  transform(name: any, searchText: any): any {
    if(searchText == null) return name;

    return name.filter(function(category){
      return category.cldbid.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
