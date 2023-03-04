import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

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
      username: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get('password').value;
        let confirmPassword = group.get('confirmPassword').value
        return password === confirmPassword ? null : {notSame: true}
      }
    })
  }

  get component() {
    return this.registerFormGroup.controls;
  }

  submitted: boolean = false;
  onSubmit(user: User) {
    this.submitted = true;
    // var c = this.component;
    // debugger;
    if (this.registerFormGroup.invalid)
      return;
  }
}
