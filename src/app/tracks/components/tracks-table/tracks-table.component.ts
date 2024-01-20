import { Component, Input } from '@angular/core';
import { TrackTableItem as Track } from '../../../interfaces/spotify.interfaces';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'tracks-table',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tracks-table.component.html',
  styles: `
  `
})
export class TracksTableComponent {

  constructor(private sanitizer: DomSanitizer) { }

  getSafeUrl(trackId: string): SafeResourceUrl {
    const url = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  @Input()
  trackList:Track[] = [];


}
