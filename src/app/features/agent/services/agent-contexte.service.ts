import { Injectable } from '@angular/core';
import { AgentProfile } from '../models/AgentProfile';
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpParams, HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AgentContexteService {

  private SERVICE_URL = "http://localhost:8080/agents/id"
  private agent: BehaviorSubject<AgentProfile> 

  constructor(private http: HttpClient) {
    console.log("new AgentProfile()",new AgentProfile())
    this.agent = new BehaviorSubject(new AgentProfile())
    this.refresh(1)
  }


  public refresh(id: number) {
    this.http.get<AgentProfile>(`${this.SERVICE_URL}/${id}`)
      .subscribe(
        data => {
          console.log("data : ",data)
          this.agent.next(data)},
        error => {
          console.error(`Error for ${this.SERVICE_URL} :`,error)
        })
  }


  public getObeservableAgent(): Observable<AgentProfile> {    return this.agent.asObservable()  }
}
