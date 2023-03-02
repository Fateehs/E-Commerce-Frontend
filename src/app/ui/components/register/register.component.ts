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
      name: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      userName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
      password: ["", [Validators.required]],
      verifyPassword: ["", [Validators.required]]
    })
  }

  onSubmit(data: any) {

  }
}
