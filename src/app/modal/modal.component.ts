import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() isActive: boolean = false;
  @Output() deactivated = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.deactivated.emit({isActive: false});
  }

}
