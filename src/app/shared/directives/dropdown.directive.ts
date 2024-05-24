import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropDown]'
})
export class DropdownDiretive {
    @HostBinding('class.open') isOpen: boolean = false;
    @HostListener('document:click', ['$event']) toggleOpen(event:Event) {
        this.isOpen = this.elementRef.nativeElement.contains(event.target) ? 
                        !this.isOpen : false;
    }
    constructor(private elementRef: ElementRef) {}
}