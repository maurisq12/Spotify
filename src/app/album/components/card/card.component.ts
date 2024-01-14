import { Component, Input } from '@angular/core';
import { Item as Album} from '../../../interfaces/albums.interface';
import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'album-card',
    standalone: true,
    templateUrl: './card.component.html',
    imports: [LazyImageComponent, CommonModule]
})
export class CardComponent {


  @Input()
  public album!: Album;


  ngOnInit():void{
    if(!this.album) throw new Error('No se cargó el album');
  }


}
