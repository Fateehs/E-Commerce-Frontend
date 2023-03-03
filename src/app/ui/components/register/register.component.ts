import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  registerFormGroup: FormGroup;
  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      nameSurname: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      userName: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
      password: ["", [Validators.required]],
      verifyPassword: ["", [Validators.required]]
    })
  }

  get component()  {
    return this.registerFormGroup.controls;
  }

  submitted: boolean = false;
  onSubmit(data: any) {
    this.submitted = true;
var c =    this.component;
debugger;
    if (this.registerFormGroup.invalid)
      return;
  }
}
