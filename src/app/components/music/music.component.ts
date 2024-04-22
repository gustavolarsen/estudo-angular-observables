import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Music } from 'src/app/interfaces/music';
import { MusicService } from 'src/app/services/music.service';
import { AlertMessageComponent } from 'src/app/shared/alert-message/alert-message.component';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent {
  @ViewChild(AlertMessageComponent) alertMessage!: AlertMessageComponent;
  private musicService: MusicService;
  public musicas$ = new Observable<Music[]>();

  id: string = '';
  author: string = '';
  song: string = '';

  constructor(musicService: MusicService) {
    this.musicService = musicService;
    this.obterMusicas();
  }

  obterMusicas() {
    this.musicas$ = this.musicService.listarMusicas();
  }

  salvarMusica(musicForm: NgForm) {
    if (this.author && this.song) {
      if (this.id) {
        this.musicService
          .editarMusica({
            id: this.id,
            author: this.author,
            song: this.song,
          })
          .subscribe(() => this.obterMusicas());
      } else {
        this.musicService
          .cadastrarMusica({
            author: this.author,
            song: this.song,
          })
          .subscribe(() => this.obterMusicas());
      }
      musicForm.reset();
    } else {
      this.alertMessage.showBootstrapAlert();
    }
  }

  removerMusica(id: string) {
    this.musicService.deletarMusica(id).subscribe(() => this.obterMusicas());
  }

  preencherCampos(musica: Music) {
    this.id = musica.id!.toString();
    this.song = musica.song;
    this.author = musica.author;
  }
}
