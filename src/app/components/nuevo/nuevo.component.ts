import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, pluck } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';

import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})

export class NuevoComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  avatar = false;
  srcBase64: string;
  errorImagen = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuario: UsuariosService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
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

    this.loading = true;
    this.errorImagen = false;

    this.usuario.addUsuario(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/'], { relativeTo: this.route });
        },
        error => {
          console.log(error);
          this.loading = false;
          if(error.status === 413){
            this.errorImagen = true;
          }
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
