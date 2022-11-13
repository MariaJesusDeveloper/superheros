import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[toUpperCase]'
})
export class InputUpperCaseDirective {

  constructor() { }

  @HostListener('input', ['$event'])  
  onInput(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

}