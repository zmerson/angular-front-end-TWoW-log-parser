import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WarriorComponent } from './warrior/warrior.component';
import { CooldownIconPaths, CooldownStrings, Cooldowns, Procs, Warrior } from './warrior';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

export interface CooldownBuilder {
  cooldownName?: string;
  warriors?: Map<string, number>;
}  

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [HttpClientModule],
  imports: [HttpClientModule, RouterOutlet, CommonModule, WarriorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent {

  public constructor(private http: HttpClient) { 
    
  }

  cooldownList = ["Death Wish","Recklessness","Retaliation","Shield Wall","Last Stand",
                  "Kiss of the Spider","Slayer's Crest","Badge of the Swarmguard","Earthstrike",
                  "Diamond Flask","Berserking","Stoneform","War Stomp","Bloodlust (received)", "Gri'lek's Charm of Might"]
  bossStrings = ["Sapphiron", "Thaddius", "Loatheb", "Anub'Rekhan", "Maexxna", "Patchwerk", "Grobbulus", "Gluth", "C'thun"]
  title = 'wowlogapp';
  notWarrior = "Mage" || "Hunter" || "Rogue" || "Warlock" || "Druid" || "Shaman" || "Paladin" || "Priest"
  
  // ✅ list of stuff to do
  
  procStr: string = "none";
  enrageStr: string = "none"
  flurryStr: string = "none"
  extraAttacksStr: string = "none"
  fileContent: any; // ✅
  classDetectionStr: string = "none" // ✅
  warriors: string[] = [];  // ✅
  warriorsArray: Warrior[] = [];  // ✅
  logPath: string = '../assets/log.txt'; // ✅
  cooldowns: any; // ✅
  deaths: any;
  warriorCoolDownStr: string = "none"; // ✅
  inputFile = true;
  newInput = false;

  ngOnInit(): void {
    this.readFile()
    // .then( () => this.parseWarrior())
  }

  public logContent(){
    console.log(this.fileContent);
    console.log("Warrior List", this.warriors);
    console.log("Cooldown List", this.cooldowns);
    console.log("PROCS -- ", this.procStr);
    console.log("Deaths -- ", this.deaths);
  }
  public async readFile(): Promise<void> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'text/plain');
    let options = {
      headers: headers,
      responseType: "'text'"
    }

    this.http.request('GET', this.logPath, {responseType: 'text'})
        .subscribe((data: any) => {
        console.log(data)  
        // text = data;
        this.fileContent = data;
        console.log('file content\n' + this.fileContent)
        this.parseWarrior();
        })

  }
  readTextBox(): void {
    const textBox = document.getElementById('text-box') as HTMLTextAreaElement;
    this.fileContent = textBox.value;
    console.log('set file with textbox', this.fileContent)
    this.parseWarrior();
  }
  public async parseWarrior(): Promise<void> {

    if (this.fileContent) {
      // if (this.fileContent.includes("Warrior")) {
        let warriorIndex = this.fileContent.indexOf("Warrior");
        let cdIndex = this.fileContent.indexOf("Cooldown Summary");
        let classDetectionIndex = this.fileContent.indexOf("Class Detection");

        // console.log(this.fileContent.indexOf("Mage" || "Hunter" || "Rogue" || "Warlock" || "Druid" || "Shaman" || "Paladin" || "Priest" ))
        let str = this.fileContent.substring(cdIndex, this.fileContent.length-1)

        this.warriorCoolDownStr = str.substring(str.indexOf("Warrior"), str.indexOf("Mage" || "Hunter" || "Rogue" || "Warlock" || "Druid" || "Shaman" || "Paladin" || "Priest" ))

        this.procStr = str.substring(str.indexOf("Proc Summary"), str.length-1)
        this.enrageStr = this.procStr.substring(str.indexOf("Enrage"), str.indexOf("Flurry"))
        this.flurryStr = this.procStr.substring(this.procStr.indexOf("Flurry"), this.procStr.indexOf("Nature"))
        const extraAttackIndex = this.procStr.indexOf("Extra Attacks")
        console.log("index of extra attack " + extraAttackIndex);
        const procStrEnd = this.procStr.indexOf("Annihilator");
        this.procStr = this.procStr.substring(0, procStrEnd)
        console.log(" proc str \n" + this.procStr)
        this.extraAttacksStr = this.procStr.substring(extraAttackIndex, this.procStr.length-1)
        this.getExtraAttacks(this.extraAttacksStr)

        this.getDeaths();
        this.classDetectionStr = this.fileContent.substring(classDetectionIndex, classDetectionIndex + 5000)
        //console.log(this.classDetectionStr)
        this.warriors = this.getWarriorNames(this.classDetectionStr);
        //console.log(this.warriors);
        const cooldownUsage = this.getCooldownsUsage();
        this.warriors.forEach( (warrior) => {
          let procs: Procs = this.getProcs(warrior);
          let warriorObj: Warrior = {
            name: warrior,
            cooldowns: this.getCDforWar(warrior, cooldownUsage), //? cooldownUsage[warrior] : {deathWish: 0,recklessness: 0,retaliation: 0,shieldWall: 0,lastStand: 0,kissOfTheSpider: 0,slayersCrest: 0,badgeOfTheSwarmguard: 0,earthstrike: 0,diamondFlask: 0,berserking: 0,stoneform: 0,warStomp: 0,bloodLust: 0},
            procs: this.getProcs(warrior)
          }
          //console.log('warrior obj\n', warriorObj)
          this.warriorsArray.push(warriorObj);
        })
   
    }
    else{
      console.log('no file content')
    }
    this.newInput = false;
  }
  // private setCDS(warrior: string, cd: any, procs?: any): any {
  //   ///console.log('in set cds using ', cd)
  //       // let war: Warrior = {name: warrior, cooldowns: cd }
  //       let war = cd;
  //       return war
  // }
  getCDforWar(warrior: string, cooldownUsage: CooldownBuilder[] | null): any {
    
    let cds: Cooldowns = new Cooldowns();
    cooldownUsage?.forEach( (cd) => {
      if (cd.warriors?.has(warrior) && cd.cooldownName != undefined) {
        let name = cd.cooldownName as keyof Cooldowns;
        let usage = (cd.warriors.get(warrior))
        console.log('name: ' + name + ' usage: ' + usage)
        if (name && usage){
          cds[name] = usage;
        }
      } 
    })
    return cds;
  }
  parseProcString(): string {
    let str = "none"

    return str;
  }
  getProcs(warrior: string): Procs {
    let procs: Procs = { Flurry: 0, Enrage: 0 }
    let toArray = this.procStr.split("\n");
    let warriorIndex = toArray.indexOf(warrior);
    console.log(toArray)

    if (warriorIndex != -1) {
      for (let i = warriorIndex; i < toArray.length; i--) {
        if (this.procStr[i] == "Flurry") {
          procs.Flurry = Number(toArray[warriorIndex + 1]);
        }
        if (this.procStr[i] == "Enrage") {
          procs.Enrage = Number(toArray[warriorIndex + 1]);
      }
    }
      for (let i = warriorIndex; i < toArray.length; i++) {
        if (this.procStr[i] == "Flurry") {
          procs.Flurry = Number(toArray[warriorIndex + 1]);
        }
        if (this.procStr[i] == "Enrage") {
          procs.Enrage = Number(toArray[warriorIndex + 1]);
      }
    }
    console.log("got procs" , procs)
      return procs
    } else{
      return { Flurry: 0, Enrage: 0 }

    }
  }
  getDeaths(): void {
    console.log(this.deaths)
  }
  getExtraAttacks(str: string): string {
    console.log(this.extraAttacksStr)

    return str
  }
  public getWarriorNames(str: string): string[] {
    let toArray = str.split("\n");
    let warriorNames: string[] = [];
    for (let i = 0; i < toArray.length; i++) {
      console.log(toArray[i] + ' ' + toArray[i].includes("warrior"));
      if (toArray[i].includes("warrior")) {
        console.log('found warrior');
        toArray[i] = toArray[i].trim();
        let line = toArray[i].split(" ");
        console.log('line: ' + line, line.length);
        if (line.length < 3 && !this.isABoss(line[0])) {
          warriorNames.push(line[0]);
        }
        else{
          console.log('not warrior', [ line ]);
        }
      }
    }
    console.log(warriorNames);
    return warriorNames;
  }
  isABoss(str: string): boolean {
    if (this.bossStrings.includes(str)) {
      // console.log('boss found ' + str);
      return true;
    }
    // console.log('boss not found ' + str);
    return false;
  }
  getExtraAttacksUsage(str: string): string {

    return str;
  }
  public getCooldownsUsage(): CooldownBuilder[] | null {
    console.log(this.warriorCoolDownStr);
    if (this.warriorCoolDownStr) {
      let toArray = this.warriorCoolDownStr.split("\n"); // the elements of toArray are each line of the text file
      let cooldowns: CooldownBuilder[] = [];

      console.log(this.cooldownList)
      for (let i = 0; i < toArray.length; i++) {
        console.log(toArray[i] + ' ')
        // for (let j = 0; j < this.cooldownList.length; j++) {
        //   if (this.cooldownList[j] == toArray[i].trim()) {

        //     console.log("cooldown found in list " + toArray[i]);
        //   }else {
        //     // console.log('--not found\n' + toArray[i].trim() + 'vs list: ' + this.cooldownList[j] + '\nend--')
        //   }
        // }
        let cooldownBuilder: CooldownBuilder = { }
        cooldownBuilder.warriors = new Map<string, number>();
        if (this.cooldownFoundInList(toArray[i])) {
          toArray[i] = toArray[i].trim();
          cooldownBuilder.cooldownName = toArray[i];
          i++
          while (!this.cooldownFoundInList(toArray[i]) && i < toArray.length){
            if (toArray[i] == "" || toArray[i] == " ") {
              i++;
              continue;
            }
            console.log(toArray[i] );
            
            toArray[i] = toArray[i].trim();
            let line = toArray[i].split(" ");
            console.log("line: ", line, line.length)
            let name = line[0];
            let usage = line[1];
            cooldownBuilder.warriors.set(name, Number(usage))
            if (!this.cooldownFoundInList(toArray[i+1]) && i+1 < toArray.length){
                i++
            } else {
              break;
            }

          }
          cooldowns.push(cooldownBuilder);
        }
      }
      console.log('cooldowns ended with \n', cooldowns);
      return cooldowns;
    }
    return null;
  }
  public cooldownFoundInList(str: string): boolean {
    if (str == "" || str == " " || str == undefined) {
      return false;
    }
    for (let i = 0; i < this.cooldownList.length; i++) {
      try {
        str.trim();
        if (this.cooldownList[i] == str.trim()) {
          return true;
        }
      }
      catch(e){
        console.log(e)
      }
    }
    return false;
  }
  public onChange(e: any): void {
    this.inputFile = true;
    const fileList = e.target.files; 
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
    }
    fileReader.readAsText(file);
    this.newInput = true;
    // this.fileContent = fileReader.result;
  }
}
