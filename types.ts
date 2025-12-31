export interface Moment {
  id: string;
  title: string;
  description: string;
  icon: 'heart' | 'star' | 'music' | 'sun';
}

export interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}
