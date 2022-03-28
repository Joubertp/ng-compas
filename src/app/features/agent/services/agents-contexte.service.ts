import { Injectable } from '@angular/core'
import { Page } from '../../../shared/models/page.model'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { AgentView } from '../models/AgentView'

@Injectable({
  providedIn: 'root'
})
export class AgentsContexteService {


  private SERVICE_URL = "http://localhost:8080/agents/list"
  private pageAgent: BehaviorSubject<Page<AgentView>>
  private noPage: number
  private taillePage: number


  constructor(private http: HttpClient) {
    this.noPage = 0
    this.taillePage = 10
    const emptyPage = Page.emptyPage<AgentView>()
    this.pageAgent = new BehaviorSubject(emptyPage)
    this.refresh()
  }

  public setNoPage(noPage: number): void { this.noPage = noPage; this.refresh() }


  public refresh() {
    let urlParams = { page: "" + this.noPage, size: "" + this.taillePage }

    this.http.get<Page<AgentView>>(`${this.SERVICE_URL}`, { params: urlParams })
      .subscribe(
        data => this.pageAgent.next(data),
        error => {
          if (error.status == 404) this.pageAgent.next(Page.emptyPage<AgentView>())
          else console.error(`Error for ${this.SERVICE_URL} :`, error)
        })
  }


  public getObeservableAgentList(): Observable<Page<AgentView>> { return this.pageAgent.asObservable() }
}
