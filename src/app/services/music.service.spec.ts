import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Music } from '../interfaces/music';
import { MusicService } from './music.service';

describe('MusicService', () => {
  let service: MusicService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicService],
    });
    service = TestBed.inject(MusicService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call listarMusicas() and return music list', () => {
    const mockMusicList: Music[] = [
      { id: '1', author: 'Artist 1', song: 'Song 1' },
      { id: '2', author: 'Artist 2', song: 'Song 2' },
    ];

    service.listarMusicas().subscribe((musicas) => {
      expect(musicas).toEqual(mockMusicList);
    });

    const req = httpMock.expectOne(
      (request) => request.method === 'GET' && request.url.endsWith('/musics')
    );
    req.flush(mockMusicList);
  });

  it('should call cadastrarMusica() and return created music', () => {
    const newMusic: Music = { author: 'New Artist', song: 'New Song' };

    service.cadastrarMusica(newMusic).subscribe((musica) => {
      expect(musica).toEqual(newMusic);
    });

    const req = httpMock.expectOne(
      (request) => request.method === 'POST' && request.url.endsWith('/musics')
    );
    req.flush(newMusic);
  });

  it('should call editarMusica() and return edited music', () => {
    const editedMusic: Music = {
      id: '1',
      author: 'Edited Artist',
      song: 'Edited Song',
    };

    service.editarMusica(editedMusic).subscribe((musica) => {
      expect(musica).toEqual(editedMusic);
    });

    const req = httpMock.expectOne(
      (request) =>
        request.method === 'PUT' &&
        request.url.endsWith(`/musics/${editedMusic.id}`)
    );
    req.flush(editedMusic);
  });

  it('should call deletarMusica()', () => {
    const musicId = '1';

    service.deletarMusica(musicId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(
      (request) =>
        request.method === 'DELETE' &&
        request.url.endsWith(`/musics/${musicId}`)
    );
    req.flush(null);
  });
});
