//Utilizamos isso para dizer as rotas disponíveis na aplicação

export interface GameParams{
  id: string;
  title: string;
  bannerUrl: string;
}

export declare global {
  namespace ReactNavigation{
    interface RootParamList {
      home: undefined; //Significa que não precisa de parâmetros
      game: GameParams;
    }
  }
}