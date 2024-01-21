import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';
import { CommonModule } from '@angular/common';
import { Item as Tracks } from '../../../interfaces/tracks.interface';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'tracks-card',
  standalone: true,
  templateUrl: './tracks-card.component.html',
  imports: [LazyImageComponent, CommonModule, RouterModule]
})
export class TracksCardComponent {


  @Input()
  public track!: Tracks;

  @ViewChild('divPlay')
  divPlay!: ElementRef;

  @ViewChild('player')
  playerElement!: ElementRef;

  constructor(private sanitizer: DomSanitizer,
    private renderer: Renderer2) { }


  ngOnInit(): void {
    if (!this.track) throw new Error('No se cargó el track');
  }

  getSafeUrl(trackId: string): SafeResourceUrl {
    const url = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  playSong() {
    if (this.divPlay) {
      this.renderer.setStyle(this.divPlay.nativeElement, 'display', 'block');
    }
  }

  cerrarPlay() {
    if (this.divPlay) {
      this.renderer.setStyle(this.divPlay.nativeElement, 'display', 'none');
    }
  }


}
