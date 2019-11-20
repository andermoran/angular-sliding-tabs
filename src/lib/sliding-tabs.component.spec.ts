import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { SlidingTabsComponent } from './sliding-tabs.component';



describe('SlidingTabsComponent', () => {
  let component: SlidingTabsComponent;
  let component2: SlidingTabsComponent;
  let fixture: ComponentFixture<SlidingTabsComponent>;
  let fixture2: ComponentFixture<SlidingTabsComponent>;

  let tabNamesInput: string[] = ['Featured', 'Popular', 'Newest'];
  let sizeInput: string = '24px';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidingTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidingTabsComponent);
    component = fixture.componentInstance;

    spyOn(component.tabChanged, 'emit');
    component.tabNames = tabNamesInput;
    component.size = sizeInput;

    fixture.detectChanges();
  });
  
  it(`Create 3 tabs: ${tabNamesInput}`, () => {
    expect(component).toBeTruthy();
  });

  it('Emit an event whenever a tab is clicked', () => {
    for (let i = 0; i < tabNamesInput.length; i++) {
      let button = fixture.nativeElement.querySelectorAll('button')[i];
      console.log(`clicking the ${tabNamesInput[i]} tab`);
      
      button.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(component.tabChanged.emit).toHaveBeenCalledWith(tabNamesInput[i]);
      expect(component.tabChanged.emit).toHaveBeenCalledTimes(i+1);
    }
    fixture.detectChanges();
  });
});