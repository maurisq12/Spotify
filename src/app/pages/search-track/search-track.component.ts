import { Component } from '@angular/core';
import { SearchBoxComponent } from "../../shared/components/search-box/search-box.component";
import { SpotifyService } from '../../services/spotify.service';
import { Item as Tracks } from '../../interfaces/tracks.interface';
import { TracksCardlistComponent } from '../../tracks/components/cardlist/tracks-cardlist.component';


@Component({
    selector: 'app-search-track',
    standalone: true,
    templateUrl: './search-track.component.html',
    styles: ``,
    imports: [SearchBoxComponent, TracksCardlistComponent]
})
export class SearchTrackComponent {

  tracks: Tracks[] = [];

  constructor(private spotiService: SpotifyService) { }



  buscarCancion(entrada: string) {
    this.spotiService.getTracks(entrada).subscribe(
      resp=> this.tracks=resp.tracks.items
    );
  }

}
