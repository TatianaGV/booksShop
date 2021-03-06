import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IAuthorFilter } from '../../../core/interfaces';

@Component({
  selector: 'app-authors-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class AuthorsFilterComponent implements OnInit {

  public filterForm: FormGroup;
  public queryParams: IAuthorFilter;

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._initForm();
    this._getParamsFromUrl();
  }

  public submit(): void {
    if (this.filterForm.invalid) {
      return;
    }

    if (this.filterForm.value.firstName === '') {
      this.filterForm.value.firstName = null;
    }

    if (this.filterForm.value.lastName === '') {
      this.filterForm.value.lastName = null;
    }

    this.queryParams = {
      first_name: this.filterForm.value.firstName,
      last_name: this.filterForm.value.lastName,
    };
  }

  private _initForm(): void {
    this.filterForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.minLength(3),
      ]),
      lastName: new FormControl(null, [
        Validators.minLength(3),
      ]),
    });
  }

  private _getParamsFromUrl(): void {
    const params: IAuthorFilter = {};

    const firstName = this._activatedRoute.snapshot.queryParamMap.get('first_name');
    if (firstName) {
      params.first_name = firstName;
    }

    const lastName = this._activatedRoute.snapshot.queryParamMap.get('last_name');
    if (lastName) {
      params.last_name = lastName;
    }

    this._fillFilterFieldFromUrl(params);
  }

  private _fillFilterFieldFromUrl(params: IAuthorFilter): void {
    this.filterForm.patchValue({
      firstName: params.first_name,
      lastName: params.last_name,
    });
  }

}
