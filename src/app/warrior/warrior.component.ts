import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { CooldownBuilder } from '../app.component';
import { CooldownIconPaths, Cooldowns, Warrior } from '../warrior';

@Component({
  selector: 'app-warrior',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warrior.component.html',
  styleUrl: './warrior.component.scss'
})
export class WarriorComponent {
  @Input() warrior: any | undefined;
  fileContent: any;
  cooldowns: Cooldowns | undefined;
  procStr: string = "none";
  paths: CooldownIconPaths = new CooldownIconPaths();

  public getIcon(): void {
    console.log("cooldown paths: " , this.paths);
  }
  ngOnChanges(changes: SimpleChanges){
    this.cooldowns = changes['warrior'].currentValue.cooldowns;
    console.log(changes)
  }
  ngOnInit(): void {
    this.cooldowns = this.warrior?.cooldowns;
  }
  getCDs() {
    console.log(this.cooldowns);
  }

  // public onChange(fileList: FileList): void {
  //   let file = fileList[0];
  //   let fileReader: FileReader = new FileReader();
  //   let self = this;
    
  //   fileReader.onloadend = function(x) {
  //     self.fileContent = fileReader.result;
  //   }
  //   fileReader.readAsText(file);
  // }
}
