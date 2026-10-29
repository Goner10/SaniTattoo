/**
 * Artistas patrocinados. La página Pro Team renderiza esta lista:
 * para sumar un miembro, añade un objeto. No hace falta tocar el layout.
 *
 * @typedef {Object} ArtistWork
 * @property {string} src Ruta dentro de `public/`, sin barra inicial.
 * @property {string} alt
 * @property {number} width
 * @property {number} height
 *
 * @typedef {Object} Artist
 * @property {string} id
 * @property {string} proTeamId
 * @property {string} name
 * @property {string} instagram
 * @property {string} instagramUrl
 * @property {string[]} specialties
 * @property {string} studio
 * @property {string} description
 * @property {string} portrait
 * @property {string} portraitAlt
 * @property {number} portraitWidth
 * @property {number} portraitHeight
 * @property {ArtistWork[]} works
 */

/** @type {Artist[]} */
export const artists = [
  {
    id: "sergio",
    proTeamId: "#001",
    name: "Sergio",
    instagram: "@sofk_tattoo",
    instagramUrl: "https://www.instagram.com/sofk_tattoo/",
    specialties: ["Realismo", "Microrrealismo"],
    studio: "Crime Gallery",
    description:
      "Artista patrocinado por SanitattooSupply. Trabaja el realismo y el microrrealismo en Crime Gallery.",
    portrait: "images/pro-team/sergio.png",
    portraitAlt:
      "Retrato de Sergio, artista patrocinado por Sanitattoo, con los brazos cruzados.",
    portraitWidth: 876,
    portraitHeight: 1796,
    works: [
      {
        src: "images/pro-team/tattoo1-sofk.jpg",
        alt: "Tatuaje en el antebrazo: retrato realista de un rostro barbado con letras integradas en la composición.",
        width: 1080,
        height: 1177,
      },
      {
        src: "images/pro-team/tattoo2-sofk.jpg",
        alt: "Tatuaje en la pantorrilla: figura de un ángel en escala de grises con un halo de rayos.",
        width: 1080,
        height: 1440,
      },
      {
        src: "images/pro-team/tattoo3-sofk.jpg",
        alt: "Tatuaje de retrato en primer plano, con lettering y tramado de puntos.",
        width: 1080,
        height: 1140,
      },
    ],
  },
  {
    id: "jesus-arellano",
    proTeamId: "#002",
    name: "Jesús Arellano",
    instagram: "@jesusarellanotattoo",
    instagramUrl: "https://www.instagram.com/jesusarellanotattoo/",
    specialties: ["Realismo", "Surrealismo"],
    studio: "Nomad Tattoo Gallery",
    description:
      "Artista patrocinado por SanitattooSupply. Trabaja el realismo y el surrealismo en Nomad Tattoo Gallery.",
    portrait: "images/pro-team/jesus.png",
    portraitAlt:
      "Retrato de Jesús Arellano, artista patrocinado por Sanitattoo, con los brazos cruzados.",
    portraitWidth: 1125,
    portraitHeight: 1398,
    works: [
      {
        src: "images/pro-team/tattoo1-jesus.jpg",
        alt: "Tatuaje en el antebrazo: retrato realista de un rostro entre formas fluidas en blanco y negro.",
        width: 1080,
        height: 1440,
      },
      {
        src: "images/pro-team/tattoo2-jesus.jpg",
        alt: "Tatuaje en el antebrazo: retrato realista de un rostro, una mano sobre los labios y un borde de encaje.",
        width: 720,
        height: 960,
      },
      {
        src: "images/pro-team/tattoo3-jesus.jpg",
        alt: "Tatuaje en el brazo: un primate, un rostro con adornos y formas vegetales, en blanco y negro.",
        width: 1080,
        height: 1440,
      },
    ],
  },
];
