import { Component, OnInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import Tab from './tab';

@Component({
  selector: 'sliding-tabs',
  templateUrl: './sliding-tabs.component.html',
  styleUrls: ['./sliding-tabs.component.css']
})

export class SlidingTabsComponent implements OnInit {
  @Output() tabChanged = new EventEmitter<string>();
  @Input('tabs') tabNames: string[];
  @Input() size: string = 'h1';
  @Input() selectedTabStyle: Object;
  @Input() unselectedTabStyle: Object;
  @Input() lineColor: string = 'black';
  tabs: Tab[];
  selectedTab: Tab;

  tabWidths: string[];
  tabMargins: string[];

  constructor(private el: ElementRef) {}

  ngOnInit() {    
    if (this.tabNames == null) {
      throw new Error('No value was bound to tabs');
    }
    this.tabWidths = new Array(this.tabNames.length);
    this.tabMargins = new Array(this.tabNames.length);
    this.tabs = new Array(this.tabNames.length);

    for (let i = 0; i < this.tabNames.length; i++) {
      this.tabs[i] = new Tab(this.tabNames[i]);
    }
    this.selectedTab = this.tabs[0];
  }

  calculateTabWidths() {
    for (let i = 0; i < this.tabNames.length; i++) {
      let tabWidth = document.getElementsByClassName('tab')[i].scrollWidth;
      let tabContainerWidth = document.getElementById('tabs-container').scrollWidth;
      this.tabWidths[i] = (100 * tabWidth / tabContainerWidth) + "%";
    }
  }

  calculateTabMargins() {
    this.tabMargins[0] = "0%";
    for (let i = 1; i < this.tabNames.length; i++) {
      let tabDistanceLeft = (<HTMLElement>document.getElementsByClassName('tab')[i]).offsetLeft;
      let tabsContainerDistanceLeft = document.getElementById('tabs-container').offsetLeft;
      let codeMargin = tabDistanceLeft - tabsContainerDistanceLeft;
      this.tabMargins[i] = codeMargin + "px";
    }
  }

  ngAfterViewInit() {
    this.calculateTabWidths();
    this.calculateTabMargins();
    

    let hrStyle: string = `
    .underline {
      height: .25rem;
      width: 0%;
      margin: 0;
      border: none;
      transition: .3s ease-in-out;
      position: relative;
    }
    `;
    this.createStyle(hrStyle);
    
    let tabUnderlineStyle: string = `
    .tabUnderline ~ .underline {
      margin-left: ${this.tabMargins[0]};
      width: ${this.tabWidths[0]};
    }
    `;
    this.createStyle(tabUnderlineStyle);
  }

  createStyle(style: string): void {
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(style));
    this.el.nativeElement.appendChild(styleElement);
  }

  tabClicked(tab: Tab) {
    this.calculateTabWidths();
    this.calculateTabMargins();
    this.selectedTab = tab;
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.selectedTab == this.tabs[i]) {
          var tabUnderlineStyle: string = `
          .tabUnderline ~ .underline {
            margin-left: ${this.tabMargins[i]};
            width: ${this.tabWidths[i]};
          }
          `;
        this.createStyle(tabUnderlineStyle);
      }
    }
    if (this.tabChanged != null) {
      this.tabChanged.emit(this.selectedTab.title);
    }
  }

  getStyleClass(tab: Tab) {
    let index = 0;
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.selectedTab == this.tabs[i]) {
        index = i + 1;
      }
    }
    let str = '{ "tabSelected tabUnderline" : ' + String(this.selectedTab == tab) + ' }';    
    return JSON.parse(str);
  }

}
