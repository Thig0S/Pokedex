import { Component, signal } from '@angular/core';

interface Itens {
  titulo: string;
  url: string;
  icone: string;
}

@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  public itens: Itens[] = [{ titulo: 'Home', url: '#Home', icone: 'bi bi-house' }];

  protected readonly menuAberto = signal(false);

  protected alterarMenu() {
    this.menuAberto.update((aberto) => !aberto);
  }

  protected fecharMenu() {
    this.menuAberto.set(false);
  }
}
