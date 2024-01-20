import { Component, Input } from '@angular/core';
import { Item } from '../../../interfaces/spotify.interfaces';
import { LazyImageComponent } from "../lazy-image/lazy-image.component";
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'shared-album-card',
    standalone: true,
    templateUrl: './card.component.html',
    imports: [LazyImageComponent, RouterModule]
})
export class CardComponent {



  @Input()
  public album!: Item;


  ngOnInit():void{
    if(!this.album) throw new Error('No se cargó el album');
  }


}
