import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from './../../../auth/shared/auth-service/auth.service';

@Directive({
  selector: '[userRole]'
})
export class AdminOnlyDirective {
  private _context: NgIfContext = new NgIfContext();
  private _thenTemplateRef: TemplateRef<NgIfContext>|null = null;
  private _elseTemplateRef: TemplateRef<NgIfContext>|null = null;
  private _thenViewRef: EmbeddedViewRef<NgIfContext>|null = null;
  private _elseViewRef: EmbeddedViewRef<NgIfContext>|null = null;

  constructor(private authService: AuthService,private _viewContainer: ViewContainerRef, templateRef: TemplateRef<NgIfContext>) {
    this._thenTemplateRef = templateRef;
  }

  @Input()
  set userRole(condition: any) {

    this.authService.user.subscribe(user => {
      this._context.$implicit = this._context.userRole = user.logged;
      this._updateView();
    });

  }

  @Input()
  set userRoleThen(templateRef: TemplateRef<NgIfContext>) {
    this._thenTemplateRef = templateRef;
    this._thenViewRef = null;  // clear previous view if any.
    this._updateView();
  }

  @Input()
  set userRoleElse(templateRef: TemplateRef<NgIfContext>) {
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null;  // clear previous view if any.
    this._updateView();
  }

  private _updateView() {
    if (this._context.$implicit) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef =
              this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef =
              this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
        }
      }
    }
  }
}

/**
 * @stable
 */
export class NgIfContext {
  public $implicit: any = null;
  public userRole: any = null;
}
