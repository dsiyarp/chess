import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, pluck } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';

import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from 'src/app/interfaces/iusuario';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  form: FormGroup;
  loading = false;
  loadingEditar = false;
  submitted = false;
  user: IUsuario;
  avatar = false;
  srcBase64: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuario: UsuariosService
  ) {

    this.route.params.subscribe(params => {
      this.loading = true;

      this.usuario.getUsuario(params['id'])
        .subscribe((data: any) => {
          this.user = data;
          this.loading = false;

          this.form.controls['id'].setValue(this.user.id);
          this.form.controls['usuario'].setValue(this.user.usuario);
          this.form.controls['activo'].setValue(this.user.activo);
          this.form.controls['clave'].setValue(this.user.clave);
          this.form.controls['nombre'].setValue(this.user.nombre);
          this.form.controls['apellido'].setValue(this.user.apellido);
          this.form.controls['email'].setValue(this.user.email.toLowerCase());
          this.form.controls['direccion'].setValue(this.user.direccion);
          this.form.controls['telefono'].setValue(this.user.telefono);
          this.form.controls['imagen64'].setValue(this.user.imagen64);

          if(this.user.imagen64.length > 300){
            this.avatar = true;
            this.srcBase64 = `data:image/jpeg;base64,${ this.user.imagen64 }`;
          }

        });
    });

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [''],
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      activo: [false],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      nombre: [''],
      apellido: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      direccion: [''],
      telefono: [''],
      imagen64: ['']
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loadingEditar = true;

    this.usuario.putUsuario(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/'], { relativeTo: this.route });
        },
        error => {
          this.loadingEditar = false;
        });

  }

  base64(input): void {
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        //console.log(e.target.result);
        this.setImagen64(e.target.result.split(',')[1]);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  }

  onUploadImage(event) {
    if (event.target.files.length > 0) {
      const fileReader = new FileReader();
      let imageToUpload = event.target.files.item(0);
      this.imageToBase64(fileReader, imageToUpload)
        .subscribe(base64image => {
          //console.log(base64image);
          this.setImagen64(base64image.split(',')[1]);
        });
    }
  }

  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }

  setImagen64(base64) {
    this.form.controls['imagen64'].setValue(base64);
    this.avatar = true;
    this.srcBase64 = `data:image/jpeg;base64,${ base64 }`;
  }

}
