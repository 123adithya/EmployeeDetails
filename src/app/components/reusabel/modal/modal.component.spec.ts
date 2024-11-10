import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    (Window as any).bootstrap = {
      Modal: class {
        show() {}
        hide() {}
      },
    };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title and message correctly', () => {
    component.title = 'Test Title';
    component.message = 'Test Message';
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.modal-title')).nativeElement;
    const message = fixture.debugElement.query(By.css('.modal-body p')).nativeElement;

    expect(title.textContent).toBe('Test Title');
    expect(message.textContent).toBe('Test Message');
  });

  it('should emit ok event and close the modal on OK button click', () => {
    spyOn(component.ok, 'emit');
    spyOn(component, 'close').and.callThrough();

    const okButton = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    okButton.click();

    expect(component.ok.emit).toHaveBeenCalled();
    expect(component.close).toHaveBeenCalled();
  });

  it('should emit cancel event and close the modal on Cancel button click', () => {
    spyOn(component.cancel, 'emit');
    spyOn(component, 'close').and.callThrough();

    const cancelButton = fixture.debugElement.query(By.css('.btn-secondary')).nativeElement;
    cancelButton.click();

    expect(component.cancel.emit).toHaveBeenCalled();
    expect(component.close).toHaveBeenCalled();
  });
});