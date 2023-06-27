import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaylistService } from '../../services/playlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styles: [],
})
export class CreatePlaylistComponent implements OnInit {
  public registerForm!: FormGroup;
  public errorMessage: string = '';

  @Output() createdPlaylist = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private playListService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group<any>({
      nombreLista: ['', Validators.required],
      descripcion: ['', Validators.required],
      canciones: this.fb.array([], Validators.required),
      location: null,
    });
  }

  get canciones() {
    return this.registerForm.controls['canciones'] as FormArray;
  }

  get arraySongs() {
    return (this.registerForm.get('canciones') as FormArray).controls;
  }

  /**
   * add new formgroup to formarry
   */
  public addSongs(): void {
    this.canciones.push(this.newSong());
  }

  /**
   * create a formgroup
   * @returns formgroup
   */
  private newSong(): FormGroup {
    return this.fb.group({
      album: ['', Validators.required],
      anno: ['', Validators.required],
      artista: ['', Validators.required],
      genero: ['', Validators.required],
      titulo: ['', Validators.required],
    });
  }

  /**
   * call service for create a playlist
   */
  public addPlayList(): void {
    if (this.registerForm.valid) {
      this.playListService.addPlaylist(this.registerForm.value).subscribe({
        next: () => {
          this.clearForm();
          this.createdPlaylist.emit(true);
        },
        error: (res: string) => {
          this.errorMessage = res;
          this.createdPlaylist.emit(false);
        },
      });
    }
  }

  /**
   * remove an element from formarray
   */
  public removeSong() {
    const control = <FormArray>this.registerForm.get('canciones');
    control.removeAt(control.length - 1);
  }

  /**
   * clear all forms
   */
  private clearForm(): void {
    this.registerForm.reset();
    const control = <FormArray>this.registerForm.get('canciones');
    control.clear();
  }

  /**
   * show tooltip alert
   */
  public showInfo(): void {
    Swal.fire('All fields are required');
  }
}
