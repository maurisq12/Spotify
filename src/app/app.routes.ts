import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchArtistComponent } from './pages/search-artist/search-artist.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { SearchTrackComponent } from './pages/search-track/search-track.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';


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
    children: [
      {
        path: "search",
        component: SearchArtistComponent,
      },
      {
        path: "details/:id",
        component: ArtistPageComponent,
      },
      {
        path: '**',
        component: SearchArtistComponent
      },]
  },
  {
    path: 'tracks/search',
    component: SearchTrackComponent
  },
  {
    path: 'album/:id',
    component: AlbumPageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: '**',
    component: HomeComponent
  },





];
