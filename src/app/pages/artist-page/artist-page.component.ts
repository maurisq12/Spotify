import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item as Artist } from '../../interfaces/artist.interface';
import { ArtistCardComponent } from '../../artist/components/card/artist-card.component';
import { TracksTableComponent } from '../../tracks/components/tracks-table/tracks-table.component';
import { SpotifyService } from '../../services/spotify.service';
import { Track } from '../../interfaces/top-tracks.interface';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  templateUrl: './artist-page.component.html',
  styles: ``,
  imports: [ArtistCardComponent, TracksTableComponent]
})
export class ArtistPageComponent {

  artist?: Artist;
  artistID: string = "";
  tracks:Track[] = []; // Definir como string

  constructor(private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    console.log("Llegué al init de artist page");
    this.activatedRoute.paramMap.subscribe(params => {
      this.artistID = params.get('id') ?? ''; // Utilizar el operador de coalescencia nula
      if (this.artistID) {
        // Recuperar el objeto del artista desde el estado de la navegación
        const state = history.state;
        this.artist = state.artist;
      } else {
        console.log("No le llegó artista a la pag de artista");
      }
    });

    // Aquí deberías completar la lógica de la suscripción, ya que tu código actual está incompleto.
    this.spotifyService.getArtistTopTracks(this.artistID).subscribe(response => {
      this.tracks = response.tracks;
      // Manejar la respuesta de la solicitud de las mejores canciones del artista.
    });
  }
}
