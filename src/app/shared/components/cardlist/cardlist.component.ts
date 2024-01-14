import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";
import {  Item as Album } from '../../../interfaces/spotify.interfaces';

@Component({
    selector: 'shared-albums-cardlist',
    standalone: true,
    templateUrl: './cardlist.component.html',
    imports: [CardComponent]
})
export class CardlistComponent {


  @Input()
  public albums: Album[]=[];



}
