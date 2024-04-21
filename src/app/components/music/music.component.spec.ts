import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Music } from 'src/app/interfaces/music';
import { MusicService } from 'src/app/services/music.service';
import { MusicComponent } from './music.component';

describe('MusicComponent', () => {
  let component: MusicComponent;
  let fixture: ComponentFixture<MusicComponent>;
  let musicService: jasmine.SpyObj<MusicService>;

  beforeEach(() => {
    const musicServiceSpy = jasmine.createSpyObj('MusicService', [
      'listarMusicas',
      'cadastrarMusica',
      'editarMusica',
      'deletarMusica',
    ]);

    TestBed.configureTestingModule({
      declarations: [MusicComponent],
      imports: [FormsModule],
      providers: [{ provide: MusicService, useValue: musicServiceSpy }],
    });

    musicService = TestBed.inject(MusicService) as jasmine.SpyObj<MusicService>;
    fixture = TestBed.createComponent(MusicComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listarMusicas on initialization', () => {
    musicService.listarMusicas.and.returnValue(of([]));
    fixture.detectChanges();
    expect(musicService.listarMusicas).toHaveBeenCalled();
  });

  it('should call salvarMusica and reset form when author and song are provided', () => {
    const musicForm = { reset: jasmine.createSpy('reset') };
    component.author = 'John Doe';
    component.song = 'Test Song';
    musicService.cadastrarMusica.and.returnValue(of());
    component.salvarMusica(musicForm as any);
    expect(musicService.cadastrarMusica).toHaveBeenCalledWith({
      author: 'John Doe',
      song: 'Test Song',
    });
    expect(musicForm.reset).toHaveBeenCalled();
  });

  it('should call editarMusica when id is provided', () => {
    const musicForm = { reset: jasmine.createSpy('reset') };
    component.id = '1';
    component.author = 'John Doe';
    component.song = 'Test Song';
    musicService.editarMusica.and.returnValue(of());
    component.salvarMusica(musicForm as any);
    expect(musicService.editarMusica).toHaveBeenCalledWith({
      id: '1',
      author: 'John Doe',
      song: 'Test Song',
    });
    expect(musicForm.reset).toHaveBeenCalled();
  });

  it('should not call salvarMusica or editarMusica when author or song is missing', () => {
    const musicForm = { reset: jasmine.createSpy('reset') };
    component.author = '';
    component.song = 'Test Song';
    component.salvarMusica(musicForm as any);
    expect(musicService.cadastrarMusica).not.toHaveBeenCalled();
    expect(musicService.editarMusica).not.toHaveBeenCalled();
    expect(musicForm.reset).not.toHaveBeenCalled();
  });

  it('should call deletarMusica', () => {
    musicService.deletarMusica.and.returnValue(of());
    component.removerMusica('1');
    expect(musicService.deletarMusica).toHaveBeenCalledWith('1');
  });

  it('should fill fields correctly', () => {
    const music: Music = { id: '1', author: 'John Doe', song: 'Test Song' };
    component.preencherCampos(music);
    expect(component.id).toBe('1');
    expect(component.author).toBe('John Doe');
    expect(component.song).toBe('Test Song');
  });
});
