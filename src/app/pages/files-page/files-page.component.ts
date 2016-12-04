import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateFolderWizardComponent } from '../../wizards/create-folder-wizard/create-folder-wizard.component';
import { FoldersService } from '../../services/folders/folders.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'ax-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit {
  public childFiles: Observable<Array<any>>;
  public childFolders: Observable<Array<any>>;

  @ViewChild('wizard') wizard: CreateFolderWizardComponent;

  constructor(private foldersService: FoldersService, private route: ActivatedRoute) {};

  ngOnInit() {
    this.route.params.subscribe(params => {
      const observable = this.foldersService.getOne(params['id']);
      this.childFolders = observable.map(res => res.childFolders);
      this.childFiles = observable.map(res => res.files);
    });
  }

  wizardCreateFolderFinished (data) {
    const currentFolder = this.route.snapshot.params['id'];
    data.folder.parent = currentFolder;

    this.childFolders = this.foldersService
      .create(data.folder)
      .switchMap(res => this.foldersService.getOne(currentFolder))
      .map(res => res.childFolders)
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      });
  }
}
