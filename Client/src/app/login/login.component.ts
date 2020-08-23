import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService : ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    if (this.loginForm.invalid) {
        return;
    }

  this.loading = true;
    this.apiService.loginUser(this.loginForm.value).subscribe(result=>{
      console.log(result);
      var res = result;
     // var level = res.level;
if(result.msg=="Invalid User"){
this.error="Invalid username or Password"
}else{
  localStorage.setItem("Level", JSON.stringify(res.lvl));
  localStorage.setItem("token", JSON.stringify(result.token));
  this.router.navigate(['dashboard']);
}

    })
}

}
