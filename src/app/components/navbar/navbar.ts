import { Component } from '@angular/core';

interface Itens {
  titulo: string;
  url: string;
  icone: string;
}

@Component({
  imports: [],
  selector: 'app-navbar',
  templateUrl: './navbar.html',
})
export class Navbar {
  public itens: Itens[] = [{ titulo: 'Home', url: '#Home', icone: 'bi bi-house' }];
}
