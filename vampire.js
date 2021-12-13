class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }


  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

    // Returns the number of vampires away from the original vampire this vampire is
    get numberOfVampiresFromOriginal() {
      let numberOfVampire = 0;
      let currentVampire = this;
  
      // climb "up" the tree (using iteration), counting nodes, until vampire is found, returning the number of vampires away from the original
  
      while (currentVampire.creator) {
        currentVampire = currentVampire.creator;
        numberOfVampire++;
      }
      return numberOfVampire;
      
    }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    } else {
      return false;
    }
      
  }


  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    console.log(this.name)
    if (this.name === name) {
      return this;
    } 
    for (let vampire of this.offspring) {
      let vampireHunt = vampire.vampireWithName(name);
      if (vampireHunt) {
        return vampireHunt
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let numberOfVampire = 0;
    numberOfVampire+= this.offspring.length;

    for (let descendant of this.offspring) {
      let lengthOfDescendents = descendant.totalDescendents;
      numberOfVampire += lengthOfDescendents;
    }
    return numberOfVampire;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennialVampire = [];
    if (this.yearConverted > 1980) {
      millennialVampire.push(this);
    }

    for (let vampire of this.offspring) {
      let millennialVampire = vampire.allMillennialVampires;
      millennialVampire = millennialVampire.concat(currentVampire);
    }
    return millennialVampire;
  }
}

module.exports = Vampire;

