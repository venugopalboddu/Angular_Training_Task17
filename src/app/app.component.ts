import { Component, OnInit, Injectable } from '@angular/core';
import { DetailsService } from './details.service';
import { Observable, of } from "rxjs";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    submitted = false;
constructor(private fb: FormBuilder, private s: DetailsService) {}
form = this.fb.group({
    id: [],
    fname: ['', Validators.required],
    lname: ['', Validators.required] 
  })
  fakeValidateUserData() {
    return of({
      userDate1: 1,
      userData2: 2
    
    });
  }


  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }
  get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
        return;
    }
    this.s.po(this.form.value).subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'My Report',
        text: JSON.stringify(res)
      });
    });
    this.form.reset();
    this.submitted = false;
  }

  dynamicDownloadJson() {
    this.submitted = true;

    if (this.form.invalid) {
        return;
    }
    this.s.po(this.form.value).subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'My Report.json',
        text: JSON.stringify(res)
      });
    });
    this.form.reset();
    this.submitted = false;
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

}

