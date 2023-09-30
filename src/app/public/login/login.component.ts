import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup<any> = this.formBuilder.group({
    username: ['arben.rama@glue-labs.com', [Validators.required, Validators.email]],
    password: ['RNCjnaN%D#sTLs%vr$TcDXtK', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private tokenService: TokenService, private router: Router) { }

  login() {
    console.log('CHIAMO IL LOGIN');
    const form = this.loginForm.value;
    console.log('Valore', this.loginForm.value);
    this.tokenService.login(form.email, form.password).subscribe(
      (r) => {
        console.log('Chiamata HTTP risponde', r);
        this.router.navigate(['/private'])
      }
    )

  }
}
