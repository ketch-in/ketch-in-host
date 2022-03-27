export interface StrokeType {
  color: string;
}

export class Stroke {
  private readonly $color: string

  get color () {
    return this.$color
  }

  constructor () {
    this.$color = '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
}
