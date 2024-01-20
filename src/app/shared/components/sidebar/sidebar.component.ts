import { Component } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private spotifyService:SpotifyService,
    private router:Router){
  }

  get history(): string[]{
    return this.spotifyService.history;
  }

  buscarHistory(busq:string){
    console.log("LLAMASTE A UN HISTORY BUTTON");
    const tipo:string = busq.split(':')[0];
    const entrada:string = busq.split(':')[1]
    if (tipo === 'artist'){
      return this.router.navigate([`/artists/search`]);
    }
    else{
      return this.router.navigate([`/tracks/search`] );
    }
  }



}
