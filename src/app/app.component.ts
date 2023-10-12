import {Component, computed, effect, Signal, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Drink} from './drink.enum';

const EMPTY_WATER_URL: string = 'https://cdn-icons-png.flaticon.com/512/3100/3100553.png';
const FILLED_WATER_URL: string = 'https://cdn-icons-png.flaticon.com/512/3100/3100566.png';
const EMPTY_COFFEE_URL: string = 'https://cdn-icons-png.flaticon.com/512/924/924412.png';
const FILLED_COFFEE_URL: string = 'https://cdn-icons-png.flaticon.com/512/924/924514.png';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Drink = Drink;
  indexes: number[] = [0, 1, 2, 3, 4];
  quantity: WritableSignal<number> = signal(2);
  type: WritableSignal<Drink> = signal(Drink.Water);
  emptyImageUrl: Signal<string> = computed((): string => this.type() === Drink.Water ? EMPTY_WATER_URL : EMPTY_COFFEE_URL);
  filledImageUrl: Signal<string> = computed((): string => this.type() === Drink.Water ? FILLED_WATER_URL : FILLED_COFFEE_URL);
  message: Signal<string> = computed((): string => `J'ai bu ${this.quantity()} ${this.type() === Drink.Water ? 'verre(s) d\'eau' : 'tasse(s) de café'}`);

  constructor() {
    effect(() => console.log('emptyImageUrl changed:', this.emptyImageUrl()));
    effect(() => console.log('filledImageUrl changed:', this.filledImageUrl()));
    effect(() => console.log('message changed:', this.message()));
  }

  decrement():  void {
    this.quantity.update((quantity: number): number => quantity ? quantity - 1 : 0);
  }

  increment(): void {
    this.quantity.update((quantity: number): number => quantity < this.indexes.length ? quantity + 1 : this.indexes.length);
  }
}
