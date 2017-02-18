import { UploadItemComponent } from './components/right-sidebar/upload-item/upload-item.component';
import { DownloadItemComponent } from './components/right-sidebar/download-item/download-item.component';
import { FolderTreeEffects } from './core/folders/tree/tree.effects';
import { FolderTreeActions } from './core/folders/tree/tree.actions';
import { InvitationsService } from './core/invitations/invitations.service';
import { InvitationsEffects } from './core/invitations/invitations.effects';
import { InvitationsActions } from './core/invitations/invitations.actions';
import { UsersEffects } from './core/users/users.effects';
import { UsersActions } from './core/users/users.actions';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { reducers } from './app.reducers';
import { routing } from './app.routes';
import { CreateFolderWizardComponent } from './components/create-folder-wizard/create-folder-wizard.component';
import { FoldersBreadcrumbComponent } from './components/folders-breadcrumb/folders-breadcrumb.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { AuthenticationActions } from './core/authentication/authentication.actions';
import { AuthenticationEffects } from './core/authentication/authentication.effects';
import { AuthenticationService } from './core/authentication/authentication.service';
import { DownloaderActions } from './core/downloader/downloader.actions';
import { DownloaderEffects } from './core/downloader/downloader.effects';
import { DownloaderService } from './core/downloader/downloader.service';
import { FilesService } from './core/files/files.service';
import { FoldersActions } from './core/folders/folders.actions';
import { FoldersEffects } from './core/folders/folders.effects';
import { FoldersService } from './core/folders/folders.service';
import { UploaderActions } from './core/uploader/uploader.actions';
import { UploaderEffects } from './core/uploader/uploader.effects';
import { UploaderService } from './core/uploader/uploader.service';
import { UsersService } from './core/users/users.service';
import { FilesPageComponent } from './pages/files-page/files-page.component';
import { FilesPageGuard } from './pages/files-page/files-page.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginPageGuard } from './pages/login-page/login-page.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FilesizePipe } from './utils/file-size/filesize.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ClarityModule } from 'clarity-angular';
import { FileUploadModule } from 'ng2-file-upload';
import ArxivumHttpProvider from './utils/http/arxivum-http.service.provider';
import { UsersAdminPageComponent } from './pages/users-admin-page/users-admin-page.component';
import { InviteUserModalComponent } from './components/invite-user-modal/invite-user-modal.component';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    LoginComponent,
    FilesPageComponent,
    CreateFolderWizardComponent,
    FoldersBreadcrumbComponent,
    RightSidebarComponent,
    FilesizePipe,
    RegisterPageComponent,
    RegisterComponent,
    UsersAdminPageComponent,
    InviteUserModalComponent,
    TreeNodeComponent,
    DownloadItemComponent,
    UploadItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ClarityModule,
    FileUploadModule,
    routing,
    // Store
    StoreModule.provideStore(reducers),
    // Effects
    EffectsModule.run(AppEffects),
    EffectsModule.run(AuthenticationEffects),
    EffectsModule.run(FoldersEffects),
    EffectsModule.run(UploaderEffects),
    EffectsModule.run(DownloaderEffects),
    EffectsModule.run(UsersEffects),
    EffectsModule.run(InvitationsEffects),
    EffectsModule.run(FolderTreeEffects)
  ],
  providers: [
    AuthenticationService,
    UsersService,
    FoldersService,
    FilesService,
    LoginPageGuard,
    ArxivumHttpProvider,
    UploaderService,
    DownloaderService,
    InvitationsService,
    AuthenticationActions,
    FilesPageGuard,
    FoldersActions,
    UploaderActions,
    DownloaderActions,
    UsersActions,
    InvitationsActions,
    FolderTreeActions
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
