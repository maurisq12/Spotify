import { Component, Input } from '@angular/core';
import { Item } from '../../../interfaces/spotify.interfaces';
import { LazyImageComponent } from "../lazy-image/lazy-image.component";

@Component({
    selector: 'shared-album-card',
    standalone: true,
    templateUrl: './card.component.html',
    imports: [LazyImageComponent]
})
export class CardComponent {


  @Input()
  public album!: Item;


  ngOnInit():void{
    if(!this.album) throw new Error('No se cargó el album');
  }


}
