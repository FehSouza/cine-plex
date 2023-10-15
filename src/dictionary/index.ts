interface colorDictionaryProps {
  [key: string]: string
}

export const COLOR_DICTIONARY = {
  L: '#00b150',
  10: '#00cdff',
  12: '#ffcc00',
  14: '#ff6600',
  16: '#fe0000',
  18: '#000000',
  G: '#00b150',
  PG: '#00cdff',
  'PG-13': '#ff6600',
  R: '#fe0000',
  'NC-17': '#000000',
  NR: '#000000',
} as colorDictionaryProps

export const DICTIONARY_CREW_DEPARTMENT = {
  Acting: 'Atuação',
  Art: 'Arte',
  Camera: 'Câmera',
  'Costume & Make-Up': 'Figurino e maquiagem',
  Crew: 'Equipe técnica',
  Directing: 'Diretor(a)',
  Editing: 'Edição',
  Lighting: 'Iluminação',
  Production: 'Produção',
  Sound: 'Sonoplastia',
  'Visual Effects': 'Efeitos Visuais',
  Writing: 'Roteirização',
}

export const DICTIONARY_TEAM = {
  elenco: 'cast',
  'equipe-tecnica': 'crew',
  'elenco-e-equipe-tecnica': 'all',
}

export const DICTIONARY_GENDER = {
  1: 'Feminino',
  2: 'Masculino',
}
