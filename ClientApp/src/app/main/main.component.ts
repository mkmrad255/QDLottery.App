import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { loadModules } from 'esri-loader';
import { loadCss } from 'esri-loader';

@Component({
  selector: 'main-comp',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isExpanded = true;
  closeResult = '';
  @ViewChild("map", { static: true }) private mapViewEl: ElementRef;
  constructor(private modalService: NgbModal) { }
  ngOnInit() {
    loadCss();
    loadModules(['esri/views/MapView', 'esri/WebMap'])
      .then(([MapView, WebMap]) => {
        // then we load a web map from an id
        var webmap = new WebMap({
          portalItem: { // autocasts as new PortalItem()
            id: 'f2e9b762544945f390ca4ac3671cfa72'
          }
        });
        // and we show that map in a container w/ id #viewDiv
        var view = new MapView({
          map: webmap,
          container: 'map'
        });
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  }
  onReset() {

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
}
