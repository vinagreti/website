import { NgModule } from '@angular/core';
import { TextareaResizeDirective } from './textarea-resize.directive';

@NgModule({
	declarations: [
		TextareaResizeDirective
	],
	exports: [
		TextareaResizeDirective
	]
})
export class TextareaResizeModule { }