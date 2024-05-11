import { MOCK_LIST_CREDITS } from '@/mocks'
import { describe, expect, it } from 'vitest'
import { getListCredits } from '.'

const MOCK_LIST_CREDITS_FORMATTED = [
  [
    'Production',
    {
      '2024': [
        {
          date: '2024-02-22',
          year: 2024,
          info: {
            adult: false,
            backdrop_path: '/aINel9503ompOlGKn4sIVMg09Un.jpg',
            genre_ids: [9648, 27, 53],
            id: 838209,
            original_language: 'ko',
            original_title: '파묘',
            overview:
              'Um thriller oculto sobre a história de Ji Gwan e um xamã que o acompanha, a quem é pedido que mude a tumba oferecendo uma grande quantia em dinheiro.',
            popularity: 202.367,
            poster_path: '/aJLOmEwCLJIznN96m3t9IMz12or.jpg',
            release_date: '2024-02-22',
            title: 'Exhuma',
            video: false,
            vote_average: 8.9,
            vote_count: 9,
            credit_id: '65e135bb07e281017cddfcfd',
            department: 'Production',
            job: 'Producer',
          },
        },
      ],
    },
  ],
  [
    'Acting',
    {
      '2015': [
        {
          date: '2015-03-15',
          year: 2015,
          info: {
            adult: false,
            backdrop_path: '/qvbYCarP35cK1a50lPXnguBNkyT.jpg',
            genre_ids: [99],
            id: 324314,
            original_language: 'en',
            original_title: 'Tab Hunter Confidential',
            overview: '',
            popularity: 11.049,
            poster_path: '/sMaiz54YoHfDDZiKtubQVG8mIuc.jpg',
            release_date: '2015-03-15',
            title: 'Tab Hunter Confidential',
            video: false,
            vote_average: 7.382,
            vote_count: 55,
            character: 'Self (archive footage)',
            credit_id: '61d8c7b1e93e95006ea2e219',
            order: 23,
          },
        },
      ],
      '2023': [
        {
          date: '2023-09-16',
          year: 2023,
          info: {
            adult: false,
            backdrop_path: '/eca3tlO1vtnua8LUK70ISDMYcwF.jpg',
            genre_ids: [99],
            id: 1146302,
            original_language: 'en',
            original_title: 'Sly',
            overview:
              'O amor pelo cinema foi o passaporte de saída da infância traumática. De jovem sem futuro a lenda de Hollywood, Sylvester Stallone conta sua história neste documentário.',
            popularity: 39.093,
            poster_path: '/1utWajLPvv1R9ZwkD98s2ZEngS.jpg',
            release_date: '2023-09-16',
            title: 'Sly',
            video: false,
            vote_average: 7.239,
            vote_count: 140,
            character: 'Self (archive footage) (uncredited)',
            credit_id: '65b5177912425c018348c4bd',
            order: 15,
          },
        },
      ],
    },
  ],
  [
    'Directing',
    {
      '2011': [
        {
          date: '2011-11-24',
          year: 2011,
          info: {
            adult: false,
            backdrop_path: '/dJhQJEGdeeB1k2nppChAoKbYJpN.jpg',
            genre_ids: [80, 28, 12],
            id: 82994,
            original_language: 'ko',
            original_title: '특수본',
            overview: '',
            popularity: 3.405,
            poster_path: '/2UcFiJVjyICwBQ5ahOesRgG23d7.jpg',
            release_date: '2011-11-24',
            title: '특수본',
            video: false,
            vote_average: 5.8,
            vote_count: 10,
            credit_id: '566298a3c3a3682bd0002b09',
            department: 'Directing',
            job: 'Assistant Director',
          },
        },
        {
          date: '2011-11-24',
          year: 2011,
          info: {
            adult: false,
            backdrop_path: '/dJhQJEGdeeB1k2nppChAoKbYJpN.jpg',
            genre_ids: [80, 28, 12],
            id: 82995,
            original_language: 'ko',
            original_title: '특수본',
            overview: '',
            popularity: 3.405,
            poster_path: '/2UcFiJVjyICwBQ5ahOesRgG23d7.jpg',
            release_date: '2011-11-24',
            title: '특수본',
            video: false,
            vote_average: 5.8,
            vote_count: 10,
            credit_id: '566298a3c3a3682bd0002b09',
            department: 'Directing',
            job: 'Assistant Director',
          },
        },
      ],
      '2015': [
        {
          date: '2015-11-05',
          year: 2015,
          info: {
            adult: false,
            backdrop_path: '/pnpgIdBIeOXcwQcbk71L1RFPv17.jpg',
            genre_ids: [9648, 53],
            id: 360551,
            original_language: 'ko',
            original_title: '검은 사제들',
            overview: 'Para salvar uma garota em perigo, um padre e um diácono se envolvem em um caso misterioso.',
            popularity: 13.111,
            poster_path: '/3zYZ5hZUNHwgObdqbDYlS8l24FE.jpg',
            release_date: '2015-11-05',
            title: 'The Priests',
            video: false,
            vote_average: 6.644,
            vote_count: 87,
            credit_id: '566294a09251412ad3002b84',
            department: 'Directing',
            job: 'Director',
          },
        },
      ],
    },
  ],
  [
    'Writing',
    {
      '2015': [
        {
          date: '2015-11-05',
          year: 2015,
          info: {
            adult: false,
            backdrop_path: '/pnpgIdBIeOXcwQcbk71L1RFPv17.jpg',
            genre_ids: [9648, 53],
            id: 360551,
            original_language: 'ko',
            original_title: '검은 사제들',
            overview: 'Para salvar uma garota em perigo, um padre e um diácono se envolvem em um caso misterioso.',
            popularity: 13.111,
            poster_path: '/3zYZ5hZUNHwgObdqbDYlS8l24FE.jpg',
            release_date: '2015-11-05',
            title: 'The Priests',
            video: false,
            vote_average: 6.644,
            vote_count: 87,
            credit_id: '566296d59251412ac6002b74',
            department: 'Writing',
            job: 'Screenplay',
          },
        },
      ],
      Produção: [
        {
          date: '-',
          year: NaN,
          info: {
            adult: false,
            backdrop_path: '/hu2det1jNSVcp0vG1WZmZNMLUBO.jpg',
            genre_ids: [27, 9648, 53],
            id: 438070,
            original_language: 'ko',
            original_title: '시간위의 집',
            overview: '',
            popularity: 3.606,
            poster_path: '/4eHBl3fUGxjOdeJISWe4xrxfDPT.jpg',
            title: 'House Of The Disappeared',
            video: false,
            vote_average: 7.3,
            vote_count: 30,
            credit_id: '58b97011c3a368668f0093eb',
            department: 'Writing',
            job: 'Writer',
          },
        },
        {
          date: '-',
          year: NaN,
          info: {
            adult: false,
            backdrop_path: '/hu2det1jNSVcp0vG1WZmZNMLUBO.jpg',
            genre_ids: [27, 9648, 53],
            id: 438071,
            original_language: 'ko',
            original_title: '시간위의 집',
            overview: '',
            popularity: 3.606,
            poster_path: '/4eHBl3fUGxjOdeJISWe4xrxfDPT.jpg',
            title: 'House Of The Disappeared',
            video: false,
            vote_average: 7.3,
            vote_count: 30,
            credit_id: '58b97011c3a368668f0093eb',
            department: 'Writing',
            job: 'Writer',
          },
        },
      ],
    },
  ],
]

describe('getListCredits', () => {
  it('deve retornar a lista de créditos formata por data', () => {
    const SUT = getListCredits(MOCK_LIST_CREDITS)
    const expected = MOCK_LIST_CREDITS_FORMATTED
    expect(SUT).toStrictEqual(expected)
  })

  it('deve retornar undefined se não passar listCredit', () => {
    // @ts-expect-error
    const SUT1 = getListCredits(undefined)
    const expected1 = undefined
    expect(SUT1).toStrictEqual(expected1)

    // @ts-expect-error
    const SUT2 = getListCredits(null)
    const expected2 = undefined
    expect(SUT2).toStrictEqual(expected2)

    // @ts-expect-error
    const SUT3 = getListCredits('')
    const expected3 = undefined
    expect(SUT3).toStrictEqual(expected3)

    const SUT4 = getListCredits([])
    const expected4 = undefined
    expect(SUT4).toStrictEqual(expected4)
  })
})
