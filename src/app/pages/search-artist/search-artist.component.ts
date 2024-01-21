import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Item as Artista } from '../../interfaces/artist.interface';
import { Item as Album } from '../../interfaces/artist-albums.interface';


import { SearchBoxComponent } from "../../shared/components/search-box/search-box.component";
import { CommonModule } from '@angular/common';
import { ArtistCardComponent } from "../../artist/components/card/artist-card.component";
import { CardlistComponent } from "../../album/components/cardlist/cardlist.component";
import { HistoryItem, HistoryType } from '../../interfaces/spotify.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pages-search-artist',
  standalone: true,
  templateUrl: './search-artist.component.html',
  styleUrl: './search-artist.component.css',
  imports: [SearchBoxComponent, CommonModule, CardlistComponent, ArtistCardComponent]
})
export class SearchArtistComponent  {

  artists: Artista[] = [];
  artistAlbums: Album[] = [];
  artistID: string = "";
  inputValue: string = '';


  constructor(private spotiService: SpotifyService,
    private route: ActivatedRoute,
    ) { }


    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const term = params['term'];
        if (term) {
          this.inputValue = term;
          this.buscarArtista(term);
        }
      });
    }


  buscarArtista(artista: string) {
    this.spotiService.getArtist(artista).subscribe(
      respAlbums => {
        this.artists = respAlbums.artists.items;
        console.log(this.artists);
        this.artistID = respAlbums.artists.items[0].id;

        this.spotiService.getArtistAlbums(this.artistID).subscribe(
          respAlbums => {
            this.artistAlbums = respAlbums.items;
            console.log(this.artistAlbums);
          }
        );
      }
    );

    const busq: HistoryItem = {
      query: artista,
      type: HistoryType.Artist,
      date: new Date(),
    }

    this.spotiService.organizeHistory(busq);
  }


}
