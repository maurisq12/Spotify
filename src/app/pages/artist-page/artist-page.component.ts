import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item as Artist } from '../../interfaces/artist.interface';
import { ArtistCardComponent } from '../../artist/components/card/artist-card.component';
import { TracksTableComponent } from '../../tracks/components/tracks-table/tracks-table.component';
import { SpotifyService } from '../../services/spotify.service';
import { Track } from '../../interfaces/top-tracks.interface';
import { TrackTableItem } from '../../interfaces/spotify.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  templateUrl: './artist-page.component.html',
  styles: ``,
  imports: [ArtistCardComponent, TracksTableComponent, CommonModule]
})
export class ArtistPageComponent {

  artist?: Artist;
  artistID: string = "";
  tracks: Track[] = []; // Definir como string
  tabla: TrackTableItem[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService) { }

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        this.artistID = params.get('id') ?? '';
        console.log("ME LLEGÓ: " + this.artistID + ".");
      });

      this.spotifyService.getArtistByID(this.artistID).subscribe(
        resp => {
          this.artist = resp;
          console.log("nombre de artista:"+this.artist);

          this.spotifyService.getArtistTopTracks(this.artistID).subscribe(response => {
            this.tracks = response.tracks;
            this.tabla = this.tracks.map(this.mapTrackToTableTrack);
          });
        },
        error => {
          console.error('Error al obtener el artista:', error);
        }
      );
    }


  mapTrackToTableTrack(track: Track): TrackTableItem {
    return {
      id:track.id,
      photo: track.album.images[0].url,
      album: track.album.name,
      name: track.name,
      preview: track.preview_url,
      albumID: track.album.id,
    };
  }


}
