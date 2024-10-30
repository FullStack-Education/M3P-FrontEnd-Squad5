import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'a[appPreventDefault]',
  standalone: true,
})
export class PreventDefaultDirective {
  @HostListener('click', ['$event'])
  handleClick(event: Event): void {
    event.preventDefault();
  }
}
