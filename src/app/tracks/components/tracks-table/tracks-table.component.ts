import { Component, Input } from '@angular/core';
import { Track as TopTracks } from '../../../interfaces/top-tracks.interface';
import {Item as ArtistTracks} from '../../../interfaces/tracks.interface'

@Component({
  selector: 'tracks-table',
  standalone: true,
  imports: [],
  templateUrl: './tracks-table.component.html',
  styles: ``
})
export class TracksTableComponent {

  @Input()
  tracks:(TopTracks[] | ArtistTracks[]) = [];


}
