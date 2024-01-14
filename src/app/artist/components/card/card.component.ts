import { Component, Input } from '@angular/core';
import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';
import {  Item as  Artist} from '../../../interfaces/artist.interface';
import { CommonModule } from '@angular/common';



@Component({
    selector: 'artist-card',
    standalone: true,
    templateUrl: './card.component.html',
    imports: [LazyImageComponent, CommonModule]
})
export class CardComponent {


  @Input()
  public artist!: Artist;


  ngOnInit():void{
    if(!this.artist) throw new Error('No se cargó el artista');
  }


}
