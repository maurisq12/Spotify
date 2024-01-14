import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchArtistComponent } from './pages/search-artist/search-artist.component';

export const routes: Routes = [

{
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'artists',
    component: SearchArtistComponent
  },


];
