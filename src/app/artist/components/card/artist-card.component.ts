import { Component, Input } from '@angular/core';
import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';
import { Item as Artist } from '../../../interfaces/artist.interface';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'artist-card',
  standalone: true,
  templateUrl: './artist-card.component.html',
  imports: [LazyImageComponent, CommonModule]
})
export class ArtistCardComponent {

  constructor(private router: Router) { }

  @Input()
  public artist!: Artist;

  ngOnInit(): void {
    if (!this.artist) throw new Error('No se cargó el artista en el card');
  }

  redirectToArtistPage(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        artist: this.artist
      }
    };
    this.router.navigate(['/artists/details', this.artist.id], navigationExtras);
  }
}

