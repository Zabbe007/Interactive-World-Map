import { Routes } from '@angular/router';
import { WorldMap } from './world-map/world-map';

export const routes: Routes = [
  {
  path: '',
  redirectTo: 'world-map',
  pathMatch: 'full'
},
{
  path: 'world-map',
  component: WorldMap
}
];
