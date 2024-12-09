import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { ERol } from '../../../../shared/constants/rol.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(
        async (response) => {
          const { token } = response;

          if (token) {
            await this.authService.setToken(token);
            const rol = await this.authService.getRoleFromToken();

            if (rol) {
              console.log('Rol obtenido:', rol);
              alert(`Inicio de sesión exitoso con rol: ${rol}`);
              this.redirectByRole(rol as ERol);
            } else {
              alert('No se pudo determinar el rol.');
            }
          }

          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error('Error en inicio de sesión:', error);
          alert('Credenciales incorrectas');
        }
      );
    } else {
      alert('Por favor completa el formulario correctamente.');
    }
  }

  redirectByRole(rol: ERol) {
    switch (rol) {
      case ERol.ADMIN:
        this.router.navigate(['privado/']);
        break;
      case ERol.VALIDA_DOCENTE:
        this.router.navigate(['validador/docente']);
        break;
      case ERol.VALIDA_CURSO:
        this.router.navigate(['validador/cursos']);
        break;
      case ERol.VALIDA_PLANTEL:
        this.router.navigate(['validador/plantel']);
        break;
      case ERol.DOCENTE:
        this.router.navigate(['docente/']);
        break;
      case ERol.ALUMNO:
        this.router.navigate(['alumno/home']);
        break;
      case ERol.CONTROL_ESCOLAR:
        this.router.navigate(['control/']);
        break;
      case ERol.COORDINADOR_ACADEMICO:
        this.router.navigate(['academico/']);
        break;
      case ERol.PLANTEL:
        this.router.navigate(['plantel/home']);
        break;
      default:
        this.router.navigate(['/public/login']); // Ruta por defecto
    }
  }
}
