import { Component, Input } from '@angular/core';
import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';
import { CommonModule } from '@angular/common';
import { Item as Tracks } from '../../../interfaces/tracks.interface';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'tracks-card',
    standalone: true,
    templateUrl: './tracks-card.component.html',
    imports: [LazyImageComponent, CommonModule, RouterModule]
})
export class TracksCardComponent {


  @Input()
  public track!: Tracks;


  ngOnInit():void{
    if(!this.track) throw new Error('No se cargó el track');
  }


}
