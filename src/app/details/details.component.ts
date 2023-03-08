import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Technology } from '../model/technology';
import { SnackbarService } from '../services/snackbar.service';
import { TechnologyService } from '../services/technology.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  form: FormGroup = new FormGroup({});
  technology!: Technology;
  id? : string;
  title! : string;
  submitted = false;
  update = false;
  categories = ['Techniques', 'Tools', 'Platforms', 'Languages & Frameworks'];
  rings = ['Hold', 'Assess', 'Trial', 'Adopt'];  

  constructor(
    private fb : FormBuilder, 
    private route : ActivatedRoute,
    private router : Router,
    private apiService : TechnologyService,
    private snackBar : SnackbarService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.update = !this.id;

    this.form = this.fb.group({
      name : ['', Validators.required],
      category : ['', Validators.required],
      ring : [''],
      descTech : ['', Validators.required],
      descRing : [''],
      published : ['']
    });

    this.title = "Technologie hinzufügen";
    if (this.id) {
      this.title = "Technologie ändern";
      this.getTechnology(this.id);
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    if (this.update) {
      this.createTechnology();
    } else {
      this.updateTechnology();
    }
  }

  private getTechnology(id : any) {
    this.apiService.getTechnology(id).subscribe(( data: Technology ) => {
      this.form.patchValue(data);
    })
  }

  private createTechnology() {
    this.apiService.createTechnology(this.form.value).subscribe(( data: any ) => {
      this.snackBar.openSnackBar('Technology created successfully!');
      this.router.navigate(['']);
    })
  }

  private updateTechnology() {
    this.apiService.updateTechnology(this.id, this.form.value).subscribe(( data: any ) => {
      this.snackBar.openSnackBar(this.form.value.name + ' was updated successfully!');
      this.router.navigate(['']);
    })
  }

  return() { this.router.navigate(['']) }
}
