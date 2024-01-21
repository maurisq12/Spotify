import { Component } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HistoryItem } from '../../../interfaces/spotify.interfaces';

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

  get history(): HistoryItem[]{
    return this.spotifyService.history;
  }

  esFechaHoy(fecha: Date): boolean {
    if (fecha instanceof Date) {
      return fecha.toDateString() === new Date().toDateString();
    }
    return false;
  }

  repetirBusqueda(term: string, tipo: string): void {
    this.router.navigate([`/${tipo.toLowerCase()}s/search`], {
      queryParams: { term: term },
      replaceUrl: true,
    });
  }




}
