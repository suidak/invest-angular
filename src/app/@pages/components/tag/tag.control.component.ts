import { AnimationEvent } from '@angular/animations';
import {
  forwardRef,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { tagAnimation } from '../../animations/tag-animations';
import { pgTagComponent } from './tag.component';
import { toBoolean } from '../util/convert';

@Component({
  selector: 'pg-tag-control',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => pgTagControl),
      multi: true
    }
  ],
  templateUrl: "./tag.control.component.html",
  styleUrls: ["./tag.scss"]
})
export class pgTagControl implements OnInit, ControlValueAccessor {

  onChange: (value: string[]) => void = () => null;
  onTouched: () => void = () => null;
  @Output() tagsChanges = new EventEmitter();
  @ViewChild('wrapper') wrapper: ElementRef;
  _tags = [];
  inputValue = '';
  _placeholder = '';
  email = false;
  @Input()
  set placeholder(value: string) {
    this._placeholder = value
  }

  @Input()
  set emailType(value: boolean) {
    this.email = value
  }

  handleClose(removedTag: any): void {
    this._tags = this._tags.filter(tag => tag !== removedTag);
    this.tagsChanges.emit(this._tags);
  }
  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 40;
    return isLongTag ? `${tag.slice(0, 40)}...` : tag;
  }
  handleInputConfirm(): void {
    if (this.inputValue) {
      if (this.email) {
        if (this.validateEmail(this.inputValue)) {
          this._tags.push(this.inputValue);
          this.tagsChanges.emit(this._tags);
        }
      } else {
        this._tags.push(this.inputValue);
      }
    }
    this.inputValue = '';
  }
  handleFocus(): void {
    this.wrapper.nativeElement.parentNode.parentNode.classList.add('focused');
  }
  handleFocusOut(): void {
    this.wrapper.nativeElement.parentNode.parentNode.classList.remove('focused');
  }
  handleInputBack(): void {
    if (!this.inputValue) {
      this._tags.splice(-1, 1);
    }
  }
  updateValue(value: string[]): void {
    this._tags = value;
  }
  writeValue(value: string[]): void {
    this.updateValue(value);
  }

  registerOnChange(fn: (_: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }


  ngOnInit(): void {
  }
}
