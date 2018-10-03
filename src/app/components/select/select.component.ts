import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ModalService} from '../../pages/_index/services/modal.service';
import {IModalAppointment} from '../../interfaces/iModalAppointment';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() options: any;
  @Input() icon?: string;
  @Input() list: Array<any>;
  @Input() listDisplayProperty: string;
  @Input() events$: Observable<Event>;

  public isDisabled: boolean;
  public value: string;
  public clearSelectionLabel: string;
  private selectedItem: any;
  public isListOpen: boolean;
  private onTouch: () => void;
  private onChange: (v: any) => void = () => {};

  constructor(private changeDetectorRef: ChangeDetectorRef, private modalService: ModalService) {
  }

  public writeValue(value: any): void {
    this.onChange(value);

    if (!value) {
      this.value = '';
      return;
    }

    if (this.listDisplayProperty) {
      this.value = value[this.listDisplayProperty];
    } else {
      this.value = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState(state: boolean): void {
    this.isDisabled = state;
    this.changeDetectorRef.markForCheck();
  }

  public setActiveItem(listItem: any): void {
    this.selectedItem = listItem;
    this.writeValue(listItem);
    this.onChange(listItem);
    this.toggleList(false);
  }

  public ngOnInit(): void {
    this.clearSelectionLabel = (this.modalService.modalAppointment.pageData as IModalAppointment).selectClear;
    this.events$.pipe(
      filter((e: Event): boolean => e.type === 'click')
    )
      .subscribe((e: Event) => {
        this.toggleList(false);
        this.changeDetectorRef.markForCheck();
      });
  }

  public toggleList(state?: boolean): void {
    state !== undefined ? this.isListOpen = state : this.isListOpen = !this.isListOpen;
  }

  public stopPropagation($event: Event): void {
    $event.stopPropagation();
  }
}
