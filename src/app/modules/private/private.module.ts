import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoInstructoresComponent } from './pages/listado-instructores/listado-instructores.component';
import { ListadoInstructoresCursosComponent } from './pages/listado-instructores-cursos/listado-instructores-cursos.component';
import { FormularioInstructorComponent } from './pages/formulario-instructor/formulario-instructor.component';
import { ValidacionDeInstructorComponent } from './pages/validacion-de-instructor/validacion-de-instructor.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ListadoCursosComponent } from './pages/cursos/listado-cursos.component';
import { InstructoresCursosComponent } from './pages/instructores-cursos/instructores-cursos.component';


@NgModule({
  declarations: [
    PrivateComponent,
    HomeComponent,
    HeaderComponent,
    ListadoInstructoresComponent,
    ListadoInstructoresCursosComponent,
    FormularioInstructorComponent,
    ValidacionDeInstructorComponent,

    ListadoCursosComponent,
    InstructoresCursosComponent,
    ListadoPlantelesComponent,
    FrmPlantelComponent,
    UsuariosComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    FormsModule,
    CommonModule,RouterModule,
    PrivateRoutingModule,
    FormsModule,
     HttpClientModule, // Agregar HttpClientModule aquí
  ]
})
export class PrivateModule { }
