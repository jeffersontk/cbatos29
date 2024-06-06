declare module 'react-slick' {
  import { Component } from 'react';

  interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    [key: string]: any;
  }

  export default class Slider extends Component<Settings> {}
}
