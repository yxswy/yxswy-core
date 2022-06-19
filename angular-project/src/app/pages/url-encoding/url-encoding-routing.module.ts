import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlEncodingComponent } from './url-encoding.component';

const routes: Routes = [
  { path: '', component: UrlEncodingComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrlEncodingRoutingModule { }
