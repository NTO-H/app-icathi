import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  alumnoData = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com'
  };
}
