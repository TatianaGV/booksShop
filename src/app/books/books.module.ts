import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerModule } from '../libs/spinner/spinner.module';
import { GenresControlModule } from '../libs/genres-control/genres-control.module';

import { BooksRoutingModule } from './books-routing.module';
import { BooksPanelsComponent } from './views/panel/books-panels.view';
import { BooksTableComponent } from './components/table/table.component';
import { BooksFilterComponent } from './components/filter/filter.component';
import { BooksCreatePageComponent } from './views/create-page/books-create-page.view';
import { BooksEditPageComponent } from './views/edit-page/books-edit-page.view';
import { BooksFormComponent } from './components/form/books-form.component';
import { BooksConfirmDialogComponent } from './components/confirm-dialog/books-confirm-dialog.component';
import { BooksServices } from './services/books.service';
import { FilterContainer } from './container/filter';
import { TableContainer } from './container/table';
import { CreatePageComponent } from './container/create-page/create-page.container';
import { EditPageComponent } from './container/edit-page/edit-page.container';


@NgModule({
  declarations: [
    BooksPanelsComponent,
    BooksTableComponent,
    BooksFilterComponent,
    BooksCreatePageComponent,
    BooksEditPageComponent,
    BooksFormComponent,
    BooksConfirmDialogComponent,
    FilterContainer,
    TableContainer,
    CreatePageComponent,
    EditPageComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    SpinnerModule,
    GenresControlModule,
  ],
  providers: [
    BooksServices,
  ],
})
export class BooksModule { }
