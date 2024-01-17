import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item as Artist } from '../../interfaces/artist.interface';
import { SpotifyService } from '../../services/spotify.service';
import { SpotiResult as Album } from '../../interfaces/albums.interface';
import { TracksTableComponent } from "../../tracks/components/tracks-table/tracks-table.component";

@Component({
    selector: 'app-album-page',
    standalone: true,
    templateUrl: './album-page.component.html',
    styles: ``,
    imports: [TracksTableComponent]
})
export class AlbumPageComponent {

  albumID:string="";
  artist?: Artist;
  album?:Album; // Definir como string

  constructor(private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    console.log("Llegué al init de album page");
    this.activatedRoute.paramMap.subscribe(params => {
      this.albumID = params.get('id') ?? '';
      if (this.artist) {
        // Recuperar el objeto del artista desde el estado de la navegación
        const state = history.state;
        this.artist = state.artist;
      } else {
        console.log("No le llegó artista a la pag de álbum");
      }
    });

    // Aquí deberías completar la lógica de la suscripción, ya que tu código actual está incompleto.
    this.spotifyService.getAlbum(this.albumID).subscribe(response => {
      this.album = response;
      // Manejar la respuesta de la solicitud de las mejores canciones del artista.
    });
  }



}
