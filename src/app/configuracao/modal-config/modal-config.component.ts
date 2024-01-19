import { Component, Input } from '@angular/core';
import { ConfigService } from '../config.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfigTable } from '../model/config-table.model';

// Modal for adding and editing configs
@Component({
  selector: 'app-modal-config',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-config.component.html',
  styleUrl: './modal-config.component.css'
})
export class ModalConfigComponent {
  configForm!: FormGroup;

  @Input() config!: ConfigTable;
  @Input() indexEdit!: number;
  @Input() title = 'Modal';

  constructor(
    public activeModal: NgbActiveModal,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.configForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
    if (this.indexEdit >= 0) {
      this.configForm.setValue({
        name: this.config.name,
        type: this.config.type
      });
      this.configForm.get('type')?.disable();
    }
  }

  // Method to save or edit config
  save() {
    let configSave: ConfigTable = {
      name: this.configForm.get('name')?.value,
      type: this.configForm.get('type')?.value
    };
    if (this.indexEdit >= 0) {
      this.configService.editConfig(this.indexEdit, configSave);
    } else {
      this.configService.addConfig(configSave);
    }
    this.activeModal.dismiss();
  }
}
