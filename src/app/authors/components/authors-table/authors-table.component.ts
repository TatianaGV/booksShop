import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { IDataAuthor } from '../../../core/interfaces/authors.interface';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { AuthorsServices } from '../../../core/services/authors.service';
import { AuthorsConfirmDialogComponent } from '../authors-confirm-dialog/authors-confirm-dialog.component';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
})
export class AuthorsTableComponent implements OnInit {

  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'menu',
  ];

  constructor(
    private _authorsService: AuthorsServices,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
  ) { }

  public get allAuthors(): IDataAuthor[] {
    return this._authorsService.allAuthors;
  }

  public get metaData(): IMetaData {
    return this._authorsService.meta;
  }

  public ngOnInit(): void {
    this._activatedRoute.queryParams
      .subscribe(
        (queryParam: any) => {
          const page = queryParam['page'] || 1;
          const limit = queryParam['limit'] || 10;
          if (+page !== this.metaData.page || +limit !== this.metaData.limit) {
            this._authorsService.changeMeta({ page, limit });
          }
        });

    this._authorsService.allAuthorsChanged
      .subscribe(() => {
        this._setUrlParams();
      });
  }

  public changeStateInPaginator(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    this._authorsService.changeMeta({ page, limit });
  }

  public confirmDeleting(id: number): void {
    const dialogRef = this.dialog.open(AuthorsConfirmDialogComponent);
    dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (this.allAuthors.length === 1) {
            const page = this._authorsService.meta.page - 1;
            const pages = this._authorsService.meta.pages - 1;
            this._authorsService.changeMeta({ page, pages });
          }
          this._authorsService
            .deleteAuthor(id);
        }
      });
  }

  private _setUrlParams(): void {
    const params = {
      page: this.metaData.page,
      limit: this.metaData.limit,
    };
    this._route.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

}
