import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item as Artist } from '../../interfaces/artist.interface';
import { SpotifyService } from '../../services/spotify.service';
import { SpotiResult as Album, Item } from '../../interfaces/albums.interface';
import { TracksTableComponent } from "../../tracks/components/tracks-table/tracks-table.component";
import { TrackTableItem } from '../../interfaces/spotify.interfaces';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
    selector: 'app-album-page',
    standalone: true,
    templateUrl: './album-page.component.html',
    styles: ``,
    imports: [TracksTableComponent, CommonModule]
})
export class AlbumPageComponent {

  albumID: string = "";
  artist?: Artist;
  album?: Album;
  tabla: TrackTableItem[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private location: Location
  ) { }

  ngOnInit(): void {
    console.log("Llegué al init de album page");
    this.activatedRoute.paramMap.subscribe(params => {
      this.albumID = params.get('id') || '';
      const state = history.state;
      this.artist = state.artist;
    });

    // Realiza la suscripción a getAlbum dentro del bloque de activación de la ruta
    this.spotifyService.getAlbum(this.albumID).subscribe(
      (response: Album) => {
        this.album = response;
        // Mapea los tracks después de recibir la respuesta
        this.tabla = this.album.tracks.items.map(this.mapTrackToTableTrack.bind(this));
        console.log("La tabla: " + JSON.stringify(this.tabla));
      },
      error => {
        console.error("Error al obtener el álbum:", error);
      }
    );
  }

  mapTrackToTableTrack(track: Item): TrackTableItem {
    return {
      id: track.id,
      photo: this.album?.images[0]?.url || '', // Asegúrate de usar el operador de navegación segura
      album: this.album?.name || '',
      name: track.name,
      preview: track.preview_url || '',
      albumID: this.album?.id || '',
    };
  }

  navigateBack(): void {
    this.location.back();
  }


}
