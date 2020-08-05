import { Component, OnInit, OnDestroy } from '@angular/core';

import { IDataBook } from '../../../core/interfaces/books.interface';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { PageEvent } from '@angular/material/paginator';
import { BooksServices } from '../../../core/services/books.service';
import { MatDialog } from '@angular/material/dialog';
import { BooksConfirmDialogComponent } from '../books-confirm-dialog/books-confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';


@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})

export class BooksTableComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = [
    'id',
    'description',
    'authorId',
    'title',
    'price',
    'genres',
    'writingDate',
    'releaseDate',
    'menu',
  ];

  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private _booksService: BooksServices,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
  ) { }

  public get allBooks(): IDataBook[] {
    return this._booksService.allBooks;
  }

  public get metaData(): IMetaData {
    return this._booksService.meta;
  }

  public ngOnInit(): void {
    this._listenQueryParams();
    this._listenUrlParams();
  }

  public changeStateInPaginator(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    this._booksService.changeMeta({ page, limit });
  }

  public confirmDeleting(id: number): void {
    const dialogRef = this.dialog.open(BooksConfirmDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        if (this.allBooks.length === 1) {
          const page = this._booksService.meta.page - 1;
          const pages = this._booksService.meta.pages - 1;
          this._booksService.changeMeta({ page, pages });
        }
        this._booksService
          .deleteBook(id);
      });
  }

  public ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
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

  private _listenQueryParams(): void {
    this._activatedRoute.queryParams
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe(
        (queryParam: any) => {
          const page = queryParam['page'] || 1;
          const limit = queryParam['limit'] || 10;
          const title = queryParam['title'];
          const priceTo = queryParam['priceTo'];
          const priceFrom = queryParam['priceFrom'];
          const writingDate = this._getDateFromUrl(queryParam['writingDate']);
          const releaseDate = this._getDateFromUrl(queryParam['releaseDate']);

          if (+page !== this.metaData.page || +limit !== this.metaData.limit) {
            this._booksService.changeMeta(
              {
                page,
                limit,
                title,
                priceTo,
                priceFrom,
                writingDate,
                releaseDate,
              });
          }
        });
  }

  private _listenUrlParams(): void {
    this._booksService.allBooksChanged
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this._setUrlParams();
      });
  }

  private _getDateFromUrl(date: string): Date {
    if (date) {
      const arrDate = date.split('-');
      date = `${arrDate[1]}-${arrDate[0]}-${arrDate[2]}`;
      const msecDate = Date.parse(date);

      return new Date(msecDate);
    }
  }

}
