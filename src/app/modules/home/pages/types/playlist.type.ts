export type PlayList = {
  descripcion: string;
  id: number;
  location: string | null;
  nombreLista: string;
  songs: Songs[];
};

export type Songs = {
  album: string;
  anno: number;
  artista: string;
  genero: string;
  id: number;
  titulo: string;
};
