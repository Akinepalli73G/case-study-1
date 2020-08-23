import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router,ActivatedRoute} from "@angular/router";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public customerId :any;
  public buttonText='';
  enabled;
    constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService,private route: ActivatedRoute) { }
  
    addForm : FormGroup
    ngOnInit() {
      this.addForm = this.formBuilder.group({
        id:[],
        _id:['', Validators.required],
        name: ['', Validators.required],
        insurance: ['', Validators.required],
        value: ['', Validators.required],
        rate: ['', Validators.required],
        premiumrate: ['', Validators.required]
  
      })
      if(JSON.parse(localStorage.getItem("Level")) == "Level 1") {
        this.buttonText="Back"
        this.enabled=true;
        this.addForm.controls['name'].disable();
        this.addForm.controls['_id'].disable();
        this.addForm.controls['value'].disable();
        this.addForm.controls['insurance'].disable();
        this.addForm.controls['rate'].disable();
      }else{
       this.buttonText="Update"
       this.enabled=false;

      }
      if (this.route.snapshot.paramMap.get('id')) {
        this.customerId = this.route.snapshot.paramMap.get('id');
        this.apiService.editUser(this.customerId).subscribe(data => {
          this.addForm.setValue(data.data);
        })
      }
    }
  
    onSubmit() {
      if(!this.enabled){
        this.apiService.updateUser(this.addForm.value).subscribe(data=>{
          this.router.navigate(['customers']);
         })
      }else{
        this.router.navigate(['customers']);

      }

    
     
    }
    clacValPremiium(event){
      this.addForm.patchValue({
        premiumrate: event.target.value*this.addForm.value.rate})
    }
    clacPremiium(event){
      this.addForm.patchValue({
        premiumrate: event.target.value*this.addForm.value.value})
    }
}
