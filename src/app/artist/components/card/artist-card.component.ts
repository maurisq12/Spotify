import { Component, Input } from '@angular/core';
import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';
import { Item as Artist } from '../../../interfaces/artist.interface';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'artist-card',
  standalone: true,
  templateUrl: './artist-card.component.html',
  imports: [LazyImageComponent, CommonModule]
})
export class ArtistCardComponent {

  constructor(private router: Router,
    private location: Location) { }

  @Input()
  public artist!: Artist;

  ngOnInit(): void {
    if (!this.artist) throw new Error('No se cargó el artista en el card');
  }

  redirectToArtistPage(): void {
    this.router.navigate(['/artists/details', this.artist.id]);
  }

  redirectToArtistSpotify(): void {
    window.open(this.artist.uri, '_blank');
    window.location.href = this.artist.uri;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.toLowerCase().includes(route);
  }

  navigateBack(): void {
    this.location.back();
  }
}

