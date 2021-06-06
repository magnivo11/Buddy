import { Routes } from '@angular/router';

import { CreatePostComponent } from './posts-list/create-post/create-post.component';
//import { CreateScrapeComponent } from './scrapes-list/create-scrape/create-scrape.component';
import { EditPostComponent } from './posts-list/edit-post/edit-post.component';
import { DetailsPostComponent } from './posts-list/details-post/details-post.component';


import { CreateCommentComponent } from './comments-list/create-comment/create-comment.component';
import { EditCommentComponent } from './comments-list/edit-comment/edit-comment.component';
import { DetailsCommentComponent } from './comments-list/details-comment/details-comment.component';

import { CreateGardenComponent } from './gardens-list/create-garden/create-garden.component';
import { EditGardenComponent } from './gardens-list/edit-garden/edit-garden.component';
import { DetailsGardenComponent } from './gardens-list/details-garden/details-garden.component';

// import { CreateCategoryComponent } from './categories-list/create-category/create-category.component';
// import { EditCategoryComponent } from './categories-list/edit-category/edit-category.component';
// import { DetailsCategoryComponent } from './categories-list/details-category/details-category.component';

// import { CreateContactComponent } from './contacts-list/create-contact/create-contact.component';
// import { EditContactComponent } from './contacts-list/edit-contact/edit-contact.component';
// import { DetailsContactComponent } from './contacts-list/details-contact/details-contact.component';

// import { CreateScrapeComponent } from './scrapes-list/create-scrape/create-scrape.component';
// import { EditScrapeComponent } from './scrapes-list/edit-scrape/edit-scrape.component';
// import { DetailsScrapeComponent } from './scrapes-list/details-scrape/details-scrape.component';

import { CreateUserComponent } from './users-list/create-user/create-user.component';
import { EditUserComponent } from './users-list/edit-user/edit-user.component';
import { DetailsUserComponent } from './users-list/details-user/details-user.component';

import { CreatePlantComponent } from './‏‏plants-list/create-plant/create-plant.component';
import { EditPlantComponent } from './‏‏plants-list/edit-plant/edit-plant.component';
import { DetailsPlantComponent } from './‏‏plants-list/details-plant/details-plant.component';

import { CreateUserPlantComponent } from './‏‏‏userPlants-list/create-‏‏‏userPlants/create-userPlant.component';
import { EditUserPlantComponent } from './‏‏‏userPlants-list/edit-‏‏‏userPlants/edit-userPlant.component';
import { DetailsUserPlantComponent } from './‏‏‏userPlants-list/details-‏‏‏userPlants/details-userPlant.component';

export const TableListRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
     { path: 'CreatePost',      component: CreatePostComponent },

    //  { path: 'CreateScrape',      component: CreateScrapeComponent },
    //  { path: 'EditScrape',      component: EditScrapeComponent },
    //  { path: 'DetailsScrape',      component: DetailsScrapeComponent },

     { path: 'EditPost',      component: EditPostComponent },
     { path: 'DetailsPost',      component: DetailsPostComponent },
     { path: 'CreateComment',      component: CreateCommentComponent },
     { path: 'EditComment',      component: EditCommentComponent },
     { path: 'DetailsComment',      component: DetailsCommentComponent },
    //  { path: 'CreateCategory',      component: CreateCategoryComponent },
    //  { path: 'EditCategory',      component: EditCategoryComponent },
    //  { path: 'DetailsCategory',      component: DetailsCategoryComponent },

    //  { path: 'CreateContact',      component: CreateContactComponent },
    //  { path: 'EditContact',      component: EditContactComponent },
    //  { path: 'DetailsContact',      component: DetailsContactComponent },

     { path: 'CreateUser',      component: CreateUserComponent },
     { path: 'EditUser',      component: EditUserComponent },
     { path: 'DetailsUser',      component: DetailsUserComponent },

     { path: 'CreateGarden',      component: CreateGardenComponent },
     { path: 'EditGarden',      component: EditGardenComponent },
     { path: 'DetailsGarden',      component: DetailsGardenComponent },

     { path: 'CreatePlant',      component: CreatePlantComponent },
     { path: 'EditPlant',      component: EditPlantComponent },
     { path: 'DetailsPlant',      component: DetailsPlantComponent },

     { path: 'CreateUserPlant',      component: CreateUserPlantComponent },
     { path: 'EditUserPlant',      component: EditUserPlantComponent },
     { path: 'DetailsUserPlant',      component: DetailsUserPlantComponent },
    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'icons',          component: IconsComponent },
];
