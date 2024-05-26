export interface Warrior {
    name?: string,
    cooldowns?: Cooldowns,
    procs?: Procs,
}

export class ExtraAttacks {
    "Hand of Justice": number;
    "Sword Specialization": number;
    "Windfury Weapon": number;
    "Windfury Totem": number;

}
export class Procs {
    "Flurry": number;
    "Enrage": number;
}
export class Cooldowns {
    "Death Wish": number;
    "Recklessness": number;
    "Retaliation": number;
    "Shield Wall": number;
    "Last Stand": number;
    "Kiss of the Spider": number;
    "Slayer's Crest": number
    "Badge of the Swarmguard": number;
    "Earthstrike": number;
    "Diamond Flask": number;
    "Berserking": number;
    "Bloodlust (received)": number;
    "Stoneform": number;
    "War Stomp": number;
    "Gri'lek's Charm of Might": number;
    constructor() {
    this["Death Wish"] = 0;
    this["Recklessness"] = 0;
    this["Retaliation"] = 0;
    this["Shield Wall"] = 0;
    this["Last Stand"] = 0;
    this["Kiss of the Spider"] = 0;
    this["Slayer's Crest"] = 0;
    this["Badge of the Swarmguard"] = 0;
    this["Earthstrike"] = 0;
    this["Diamond Flask"] = 0;
    this["Berserking"] = 0;
    this["Bloodlust (received)"] = 0;
    this["Stoneform"] = 0;
    this["War Stomp"] = 0;
    this["Gri'lek's Charm of Might"] = 0;
    }
}
export interface CooldownStrings {
    deathWish: "Death Wish",
    recklessness: "Recklessness",
    retaliation: "Retaliation",
    shieldWall: "Shield Wall",
    lastStand: "Last Stand",
    kissOfTheSpider: "Kiss of the Spider",
    slayersCrest: "SlayersCrest",
    badgeOfTheSwarmguard: "Badge of the Swarmguard",
    earthstrike: "Earthstrike",
    diamondFlask: "Diamond Flask",
    berserking: "Berserking",
    stoneform: "Stoneform",
    warStomp: "War Stomp",
    bloodLust: "Bloodlust (received)",
    grelik: "Gri'lek's Charm of Might"
}
export class CooldownIconPaths {
        "Death Wish": string;
        "Recklessness": string;
        "Retaliation": string;
        "Shield Wall": string;
        "Last Stand": string;
        "Kiss of the Spider": string;
        "Slayer's Crest": string;
        "Badge of the Swarmguard": string;
        "Earthstrike": string;
        "Diamond Flask": string;
        "Berserking": string;
        "Bloodlust (received)": string;
        "Stoneform": string;
        "War Stomp": string;
        "Gri'lek's Charm of Might": string;
        constructor() {
            this["Death Wish"] = "assets/icons/deathwish.png";
            this["Recklessness"] = "assets/icons/recklessness.png";
            this["Retaliation"] = "assets/icons/retaliation.png";
            this["Shield Wall"] = "assets/icons/wall.png";
            this["Last Stand"] = "assets/icons/laststand.png";
            this["Kiss of the Spider"] = "assets/icons/kiss.png";
            this["Slayer's Crest"] = "assets/icons/slayers.png";
            this["Badge of the Swarmguard"] = "assets/icons/badge.png";
            this["Earthstrike"] = "assets/icons/earthstrike.png";
            this["Diamond Flask"] = "assets/icons/flask.png";
            this["Berserking"] = "assets/icons/berserking.png";
            this["Bloodlust (received)"] = "assets/icons/bloodlust.png";
            this["Stoneform"] = "assets/icons/stoneform.png";
            this["War Stomp"] = "assets/icons/warstomp.png";
            this["Gri'lek's Charm of Might"] = "assets/icons/grelik.png";
        }
}
