import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Item as Album} from '../../../interfaces/albums.interface';

@Component({
    selector: 'album-cardlist',
    standalone: true,
    templateUrl: './cardlist.component.html',
    imports: [CardComponent]
})
export class CardlistComponent {


  @Input()
  public albums: Album[]=[];



}
