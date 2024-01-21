import { Component } from '@angular/core';
import { SearchBoxComponent } from "../../shared/components/search-box/search-box.component";
import { SpotifyService } from '../../services/spotify.service';
import { Item as Tracks } from '../../interfaces/tracks.interface';
import { TracksCardlistComponent } from '../../tracks/components/cardlist/tracks-cardlist.component';
import { HistoryItem, HistoryType } from '../../interfaces/spotify.interfaces';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search-track',
  standalone: true,
  templateUrl: './search-track.component.html',
  styles: ``,
  imports: [SearchBoxComponent, TracksCardlistComponent]
})
export class SearchTrackComponent {

  tracks: Tracks[] = [];
  inputValue: string = '';

  constructor(private spotiService: SpotifyService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const term = params['term'];
      if (term) {
        this.inputValue = term;
        this.buscarCancion(term);
      }
    });
  }


  buscarCancion(entrada: string) {
    this.spotiService.getTracks(entrada).subscribe(
      resp => this.tracks = resp.tracks.items
    );

    const busq: HistoryItem = {
      query: entrada,
      type: HistoryType.Track,
      date: new Date(),
    }

    this.spotiService.organizeHistory(busq);
  }


}
