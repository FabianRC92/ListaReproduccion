import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { SharedModuleModule } from '../shared/shared-module.module';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePlaylistComponent } from './pages/create-playlist/create-playlist.component';

@NgModule({
  declarations: [HomeComponent, PlaylistComponent, CreatePlaylistComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
