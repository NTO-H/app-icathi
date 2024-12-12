import { Component, OnInit } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { environment } from '../../../../../environments/environment.prod'; // Ajusta la ruta según tu estructura  

interface Modulo {  
  id: number;  
  nombre: string;  
  clave?: string;  
  duracion_horas: number;  
  descripcion: string;  
  nivel: string;  
  costo?: number;  
  requisitos?: string;  
  area_id?: number;  
  especialidad_id?: number;  
  tipo_curso_id?: number;  
  vigencia_inicio?: string;  
  fecha_publicacion?: string;  
  ultima_actualizacion?: string;  
  validado?: boolean | null;  
  observaciones?: string;  
  estado?: string; // 'pendiente', 'validado', 'rechazado'  
}  

@Component({  
  selector: 'app-validador-cursos',  
  templateUrl: './validador-cursos.component.html',  
  styleUrls: ['./validador-cursos.component.scss']  
})  
export class ValidadorCursosComponent implements OnInit {  
  modulos: Modulo[] = [];  
  cursoDetalleSeleccionado: Modulo | null = null;  
  mostrarDetalleModal: boolean = false;  
  private apiUrl = `${environment.api}`;  

  constructor(private http: HttpClient) { }  

  ngOnInit(): void {  
    this.cargarModulos();  
  }  

  cargarModulos(): void {  
    this.http.get<Modulo[]>(`${this.apiUrl}/cursos`).subscribe({  
      next: (data) => {  
        this.modulos = data;  
      },  
      error: (err) => {  
        console.error('Error al cargar los cursos:', err);  
      },  
    });  
  }  

  obtenerCursosPendientes(): Modulo[] {  
    return this.modulos.filter(curso => curso.validado == null);  
  }  

  obtenerCursosValidados(): Modulo[] {  
    return this.modulos.filter(curso => curso.validado === true);  
  }  

  obtenerCursosRechazados(): Modulo[] {  
    return this.modulos.filter(curso => curso.validado === false);  
  }  

  validarCurso(curso: Modulo): void {  
    const updatedCurso = { ...curso, validado: true };  
    this.http.put(`${this.apiUrl}/cursos/${curso.id}`, updatedCurso).subscribe({  
      next: () => {  
        // Actualiza el estado local  
        const index = this.modulos.findIndex(m => m.id === curso.id);  
        if (index !== -1) {  
          this.modulos[index].validado = true;  
        }  
        console.log('Curso validado correctamente');  
      },  
      error: (err) => {  
        console.error('Error al validar el curso:', err);  
      },  
    });  
  }  

  eliminarCurso(id: number): void {  
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {  
      this.http.delete(`${this.apiUrl}/cursos/${id}`).subscribe({  
        next: () => {  
          this.modulos = this.modulos.filter(m => m.id !== id);  
          console.log('Curso eliminado correctamente');  
        },  
        error: (err) => {  
          console.error('Error al eliminar el curso:', err);  
        },  
      });  
    }  
  }  

  verDetalles(curso: Modulo): void {  
    this.cursoDetalleSeleccionado = curso;  
    this.mostrarDetalleModal = true;  
  }  

  cerrarDetalleModal(): void {  
    this.mostrarDetalleModal = false;  
    this.cursoDetalleSeleccionado = null;  
  }  
  
}  