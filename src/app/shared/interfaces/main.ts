/**
 * Main Carousel Item
 *
 * @export
 * @interface MainCarousel
 */
export interface MainCarousel {
  imagePath: string;
  title?: string;
  subTitle?: string;
  aniPos?: string;
}

/**
 * Sub Page Visual Item
 *
 * @export
 * @interface SubVisual
 */
export interface SubVisual {
  title: string;
  imgUrl: string;
  theme?: 'light' | 'dark';
}

/**
 * Sub page Visual List
 *
 * @export
 * @interface SubVisualList
 */
export interface SubVisualList {
  [key: string]: SubVisual;
}
