import { Item as Track } from './../../../interfaces/albums.interface';
import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Item as Album } from '../../../interfaces/spotify.interfaces';
import { LazyImageComponent } from "../lazy-image/lazy-image.component";
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpotifyService } from '../../../services/spotify.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-album-card',
  standalone: true,
  templateUrl: './card.component.html',
  imports: [LazyImageComponent, RouterModule, CommonModule]
})
export class CardComponent {

  @ViewChild('divPlay')
  divPlay!: ElementRef;

  constructor(private sanitizer: DomSanitizer,
    private spotifyService: SpotifyService,
    private renderer: Renderer2) { }

  tracks: Track[] = [];
  randomTrack: Track | undefined;

  @Input()
  public album!: Album;


  ngOnInit(): void {
    if (!this.album) throw new Error('No se cargó el album');

    this.spotifyService.getAlbum(this.album.id).subscribe(
      tracks => this.tracks = tracks.tracks.items
    );
  }

  getSafeUrl(trackId: string): SafeResourceUrl {
    const url = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  playRandomSong() {
    const numeroAleatorio = Math.floor(Math.random() * this.tracks.length);
    this.randomTrack = this.tracks[numeroAleatorio];
    console.log(this.randomTrack)
    if (this.divPlay) {
      this.renderer.setStyle(this.divPlay.nativeElement, 'display', 'block');
    }
  }

  cerrarPlay(){
    if (this.divPlay) {
      this.renderer.setStyle(this.divPlay.nativeElement, 'display', 'none');
    }
  }






}
