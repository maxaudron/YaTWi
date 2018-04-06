import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filterUid' })
export class FilterUidPipe implements PipeTransform {
  transform(uid: any, searchUid: any): any {
    if(searchUid == null) return uid;

    return uid.filter(function(category){
      return category.client_unique_identifier.toLowerCase().indexOf(searchUid.toLowerCase()) > -1;
    })
  }
}
