import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';

import { PlayList } from '../types/playlist.type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  public listPlayList: PlayList[] = [];

  constructor(private playListService: PlaylistService) {}

  ngOnInit(): void {
    this.loadPlayList();
  }

  /**
   * call service for fill array of playlist
   */
  private loadPlayList() {
    this.playListService.getAllList().subscribe((data) => {
      if (data.listas.length > 0) {
        this.listPlayList = data.listas;
      }
    });
  }

  /**
   * call service for delete playlist
   * @param name palylist's name
   */
  public removePlayList(name: string) {
    this.playListService.removePlaylist(name).subscribe((data) => {
      console.log(data);
      this.loadPlayList();
    });
  }

  /**
   * show modal confirmation
   * @param name name of playlist
   */
  public confirmDelete(name: string): void {
    Swal.fire({
      title: 'Delete playlist',
      text: 'Are you sure to delete this playlist?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      showCancelButton: true,
      allowOutsideClick: false,
      cancelButtonColor:"#d33"
    }).then((result) => {
      if (result.isConfirmed) this.removePlayList(name);
    });
  }

  /**
   * event output for call function loadPlayList
   * @param e event true | false
   */
  public createdPlaylist(e: any) {
    if (e) this.loadPlayList();
  }
}
