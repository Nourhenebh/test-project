import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ListService} from './List.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private bodyText: string;
  members: Member[] = [];
  memberModel: Member;
  showNew: Boolean = false;
  submitType: string = 'Save';
  selectedRow: number;
  regs : any ;

  constructor(private svc:ListService ,private http : HttpClient)
  {

    this.memberModel = new Member();
    this.memberModel = Object.assign({}, this.members[this.selectedRow]);
    
    let obs = this.http.get('https://jsonplaceholder.typicode.com/users')
    obs.subscribe((response)=>{this.regs=response;
                              console.log(response);});
  }


  onNew() {
    this.memberModel = new Member();
    this.submitType = 'Save';
    this.showNew = true;
    }
  
  onEdit(index: number) {

    this.selectedRow = index;
    this.memberModel = Object.assign({}, this.regs[this.selectedRow]);
    this.submitType = 'Update';
    this.showNew = true;
    }
  
  onDelete(index: number) {
    this.regs.splice(index, 1);
    }

  onCancel() {
    this.showNew = false;
    }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
  }
}
  class Member {
  constructor(
  public name: string = '',
  public username: string = '',
  public email: string = '',
  public address: any = '',
  public phone: string = '',
  public website : string = '',
  public company: any = '',
  ) {}}