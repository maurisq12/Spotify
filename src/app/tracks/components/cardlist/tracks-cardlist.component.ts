import { Component, Input } from '@angular/core';
import { TracksCardComponent } from "../card/tracks-card.component";
import { Item as Tracks } from '../../../interfaces/tracks.interface';

@Component({
    selector: 'tracks-cardlist',
    standalone: true,
    templateUrl: './tracks-cardlist.component.html',
    imports: [TracksCardComponent]
})
export class TracksCardlistComponent {


  @Input()
  public tracks: Tracks[]=[];



}
