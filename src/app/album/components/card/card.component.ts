import { Component, Input } from '@angular/core';
import { Item as Album} from '../../../interfaces/artist-albums.interface';
import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';
import { CommonModule } from '@angular/common';
import {  Router, RouterModule } from '@angular/router';

@Component({
    selector: 'album-card',
    standalone: true,
    templateUrl: './card.component.html',
    imports: [LazyImageComponent, CommonModule, RouterModule]
})
export class CardComponent {

  constructor(private router:Router){}


  @Input()
  public album!: Album;


  ngOnInit():void{
    if(!this.album) throw new Error('No se cargó el album');
  }


}
