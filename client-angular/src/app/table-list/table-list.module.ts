import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './table-list.component';
// import { CategoriesListComponent } from './categories-list/categories-list.component';
import { UsersListComponent } from './users-list/users-list.component';
// import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { PostsListComponent } from './posts-list/posts-list.component';
// import { ScrapesListComponent } from './scrapes-list/scrapes-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

import { TableListRoutes } from './table-list.routing';
import { CreatePostComponent } from './posts-list/create-post/create-post.component';
import { EditPostComponent } from './posts-list/edit-post/edit-post.component';
import { DetailsPostComponent } from './posts-list/details-post/details-post.component';

import { CommentsListComponent } from './comments-list/comments-list.component';
import { CreateCommentComponent } from './comments-list/create-comment/create-comment.component';
import { EditCommentComponent } from './comments-list/edit-comment/edit-comment.component';
import { DetailsCommentComponent } from './comments-list/details-comment/details-comment.component';

// import { EditCategoryComponent } from './categories-list/edit-category/edit-category.component';
// import { CreateCategoryComponent } from './categories-list/create-category/create-category.component';
// import { DetailsCategoryComponent } from './categories-list/details-category/details-category.component';

// import { DetailsContactComponent } from './contacts-list/details-contact/details-contact.component';
// import { EditContactComponent } from './contacts-list/edit-contact/edit-contact.component';
// import { CreateContactComponent } from './contacts-list/create-contact/create-contact.component';

// import { CreateScrapeComponent } from './scrapes-list/create-scrape/create-scrape.component';
// import { EditScrapeComponent } from './scrapes-list/edit-scrape/edit-scrape.component';
// import { DetailsScrapeComponent } from './scrapes-list/details-scrape/details-scrape.component';
import { CreateUserComponent } from './users-list/create-user/create-user.component';
import { EditUserComponent } from './users-list/edit-user/edit-user.component';
import { DetailsUserComponent } from './users-list/details-user/details-user.component';

import { GardensListComponent } from './gardens-list/gardens-list.component';
import { CreateGardenComponent } from './gardens-list/create-garden/create-garden.component';
import { EditGardenComponent } from './gardens-list/edit-garden/edit-garden.component';
import { DetailsGardenComponent } from './gardens-list/details-garden/details-garden.component';

import { PlantsListComponent } from './‏‏plants-list/plants-list.component';
import { CreatePlantComponent } from './‏‏plants-list/create-plant/create-plant.component';
import { EditPlantComponent } from './‏‏plants-list/edit-plant/edit-plant.component';
import { DetailsPlantComponent } from './‏‏plants-list/details-plant/details-plant.component';

import { UserPlantsListComponent } from './‏‏‏userPlants-list/‏‏‏userPlants-list.component';
import { CreateUserPlantComponent } from './‏‏‏userPlants-list/create-‏‏‏userPlants/create-userPlant.component';
import { EditUserPlantComponent } from './‏‏‏userPlants-list/edit-‏‏‏userPlants/edit-userPlant.component';
import { DetailsUserPlantComponent } from './‏‏‏userPlants-list/details-‏‏‏userPlants/details-userPlant.component';

@NgModule({
  declarations: [
    TableListComponent,
    PostsListComponent,
    UsersListComponent,
    PostsListComponent,
    CreatePostComponent,
    EditPostComponent,
    DetailsPostComponent,
    CommentsListComponent,
    CreateCommentComponent,
    EditCommentComponent,
    DetailsCommentComponent,
    CreateUserComponent,
    EditUserComponent,
    DetailsUserComponent,
    GardensListComponent,
    CreateGardenComponent,
    EditGardenComponent,
    DetailsGardenComponent,
    PlantsListComponent,
    CreatePlantComponent,
    EditPlantComponent,
    DetailsPlantComponent,
    UserPlantsListComponent,
    CreateUserPlantComponent,
    EditUserPlantComponent,
    DetailsUserPlantComponent,
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(TableListRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ]
})
export class TableListModule { } 
