import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';
import { ImageEditorStoreService } from '../custom-store/image-editor-store/image-editor-store.service';

@Directive({
  selector: '[appImageTooltip]',
  standalone: true
})
export class ImageTooltipDirective {
  @Input() imageName?: string;
  private tooltipElement?: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private store: ImageEditorStoreService
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.tooltipElement = this.renderer.createElement('span');
    const text = this.renderer.createText(`Nom de l'image : ${this.imageName}`);
    this.renderer.appendChild(this.tooltipElement, text);

    const filters = this.getAppliedFilters();
    if (filters.length) {
      const filterText = this.renderer.createText(` | Filtres appliqués : ${filters.join(', ')}`);
      this.renderer.appendChild(this.tooltipElement, filterText);
    }

    this.renderer.setStyle(this.tooltipElement, 'background-color', '#333');
    this.renderer.setStyle(this.tooltipElement, 'color', 'white');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px');

    this.renderer.appendChild(this.el.nativeElement.nextSibling, this.tooltipElement);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeChild(this.el.nativeElement.nextSibling, this.tooltipElement);
  }

  private getAppliedFilters(): string[] {
    const state = this.store.currentState;
    return state.appliedFilters || [];
  }
}
