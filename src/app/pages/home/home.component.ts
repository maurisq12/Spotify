import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { CardlistComponent } from "../../shared/components/cardlist/cardlist.component";
import { Item } from '../../interfaces/spotify.interfaces';

@Component({
    selector: 'pages-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CardlistComponent]
})
export class HomeComponent {

  albums:Item[]  = [];


  constructor(private spotiService:SpotifyService){}

  ngOnInit() {
    console.log("Vamos a llamar al servicio");

    this.spotiService.getReleases().subscribe(
      respAlbums => {
        this.albums = respAlbums.albums.items;
        console.log(this.albums);
      }
    );
  }


}
