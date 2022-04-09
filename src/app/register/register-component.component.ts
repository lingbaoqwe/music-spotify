import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import RegisterUser from '../types/RegisterUser';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: '',
  };
  public warning: any;
  public success: boolean = false;
  public loading: boolean = false;


  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.registerUser.userName !== '') {
      if (this.registerUser.password !== '') {
        if (this.registerUser.password === this.registerUser.password2) {
          this.loading = true;
          this.auth.register(this.registerUser)
            .subscribe(
              () => {
                this.success = true;
                this.warning = "";
                this.loading = false;
              },
              (err) => {
                this.success = false;
                this.warning = err.error.message;
                this.loading = false;
              }
            );
        } else {
          this.warning = 'incorrect matching passwords';
        }
      } else {
        this.warning = 'passwords needed';
      }
    } else {
      this.warning = 'username needed';
    }
  }
}

