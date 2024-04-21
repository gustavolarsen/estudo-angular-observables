import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Music } from '../interfaces/music';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private http: HttpClient;
  private url = `${environment.api}/musics`;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  listarMusicas() {
    return this.http.get<Music[]>(this.url);
  }

  cadastrarMusica(musica: Music) {
    return this.http.post<Music>(this.url, musica);
  }

  editarMusica(musica: Music) {
    return this.http.put<Music>(`${this.url}/${musica.id}`, musica);
  }

  deletarMusica(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
