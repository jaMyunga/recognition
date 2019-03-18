import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisionPage } from './vision/vision.page';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: '', redirectTo: 'vision', pathMatch: 'full' },//default pge
  { path: 'home', component: HomePage },
  { path: 'vision',  component: VisionPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
