export interface PokemonAbility {
    main: string | undefined;
    secondary: string | undefined;
  }
  
  export interface PokemonStats {
    hp: string | undefined;
    attack: string | undefined;
    defense: string | undefined;
  }
  
  export interface Pokemon {
    name: string | undefined;
    img: string | undefined;
    type: string | undefined;
    abilities: PokemonAbility;
    stats: PokemonStats;
  }
  
  export interface PokemonListItem {
    name: string;
    url:  string;
  }
  
  export type PokemonListResults = PokemonListItem[];
