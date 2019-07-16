import { Component, OnInit, Input } from '@angular/core';
import { BridgeService } from '../bridge.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Input() name: string
  @Input() mood: string

  public errorForm = false
  public successMsg = false
  public isLoading = true
  public isEmpty = false

  public entries: any = []

  constructor(
    private bridge: BridgeService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  save = () => {

    this.successMsg = false

    if (this.name && this.mood) {
      this.errorForm = false

      let data = {
        name: this.name,
        mood: this.mood
      }

      this.bridge.addEntry(data).subscribe(
        (res: any) => {
          this.successMsg = true
          this.name = null
          this.mood = null
        },
        (err: any) => {
          console.log(err)
        },
        () => {
          this.loadData()
        }
      )
    }
    else {
      this.errorForm = true
    }
  }

  loadData = () => {
    this.bridge.getAllEntries().subscribe(
      (data: any) => {
        this.entries = data.data.reverse()
        this.isLoading = false
        console.log(data)
      },
      (err: any) => {
        console.log(err)
      },
      () => {
        if (this.entries.length === 0) {
          this.isEmpty = true
        }
      }
    )
  }
}
