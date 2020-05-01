"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
        searchResults = searchByName(people);
      //searchResults = searchByName(people);
      // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
      mainMenu(searchResults, people);
      break;
    case 'no':
          searchResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;


  }
   displayPeople(searchResults);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    displayFamily(person, people);    
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchMultipleTraits(people, numberOfTraits){
alert("hi!"+numberOfTraits);
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){

      return true;
    }
    else{
      return false;
    }
  })
  
  foundPerson = foundPerson[0];
  return foundPerson;
}



function searchByTraits(peopleList){
  
    let genderCriteria = promptFor("What is their gender? Type 'male', 'female', or none if you don't know.",gender);
    let birthdayCriteria = promptFor("What is their birthday? (N/NN/NNNN), or none if you don't know.", birthday);
    let heightCriteria = promptFor("What is their height in inches? or none if you don't know.", height);
    let weightCriteria = promptFor("What is their weight in pounds? or none if you don't know.", weight);
    let eyecolorCriteria = promptFor("What is their eye color? (brown, black, hazel, blue, or green), or none if you don't know.", eyeColor);
    let occupationCriteria = promptFor("What is their occupation? (programmer, doctor, politician, nurse, assistant, landscaper, architect, or student?), or none if you don't know.", occupation);
    
    if(genderCriteria != "none"){
      peopleList = searchByGender(peopleList, genderCriteria);
    }

    if(birthdayCriteria != "none"){
      peopleList = searchByBirthday(peopleList, birthdayCriteria);
    }

    if(heightCriteria != "none"){
      peopleList = searchByHeight(peopleList, heightCriteria);
    }

    if(weightCriteria != "none"){
      peopleList = searchByWeight(peopleList, weightCriteria);
    }

    if(eyecolorCriteria != "none"){
      peopleList = searchByEyecolor(peopleList, eyecolorCriteria);
    }

    if(occupationCriteria != "none"){
      peopleList = searchByOccupation(peopleList, occupationCriteria);
    }

    return peopleList;
  
	
}

function searchByGender(people, gender){

    let foundPerson = people.filter(function(person){
	if(person.gender === gender){

	  return true;
	}
	else{
	  return false;
	}
})
  
  return foundPerson;
  

}


function searchByBirthday(people, dob){
    let foundPerson = people.filter(function(person){
  if(person.dob === dob){

    return true;
  }
  else{
    return false;
  }
})
  
  return foundPerson;
  
}

function searchByHeight(people, height){
   let foundPerson = people.filter(function(person){
  if(person.height == height){

    return true;
  }
  else{
    return false;
  }
})
  return foundPerson;
  
}

function searchByWeight(people,weight){
    let foundPerson = people.filter(function(person){
  if(person.weight == weight){

    return true;
  }
  else{
    return false;
  }
})
 
  return foundPerson;
  
}

function searchByEyecolor(people, eyeColor){
   let foundPerson = people.filter(function(person){
  if(person.eyeColor === eyeColor){

    return true;
  }
  else{
    return false;
  }
})
  return foundPerson;
  
}

function searchByOccupation(people, occupation){
    let foundPerson = people.filter(function(person){
  if(person.occupation === occupation){

    return true;
  }
  else{
    return false;
  }
})
  return foundPerson;
  
}


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function displayPeople(people, relationship){
  alert(people.map(function(person){
    return relationship + ": " + person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob +"\n";
  personInfo += "Height: " + person.height +"\n";
  personInfo += "Weight: " + person.weight +"\n";
  personInfo += "Eye Color: " + person.eyeColor +"\n";
  personInfo += "Occupation: " + person.occupation +"\n";    
  alert(personInfo);
}


function displayFamily(person, people){
  displayPeople(searchForParents(person, people), "Parent");
  displayPeople(searchForSiblings(person, people), "Sibling");
  displayPeople(searchForSpouse(person, people), "Spouse");

}

function searchForParents(person, people){
  let foundParents = people.filter(function(people){    
    if(person.parents.includes(people.id)){
      return true;
    }
    else{
      return false;
    }    
  })
  return foundParents;
}

function searchForSiblings(person, people){
  let foundSiblings = people.filter(function(people){
    for(let i = 0; i < people.parents.length; i++){
        if(person.parents.includes(people.parents[i]) && person.id !== people.id){
          return true;
        }             
      }
    return false;           
  })
  return foundSiblings;
}

function searchForSpouse(person, people){
  let foundSpouse = people.filter(function(people){
    if(people.currentSpouse == person.id){
      return true;
    }
    else{
      return false;
    }
  })
  return foundSpouse;
}



// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function gender(input){
  if(input.toLowerCase() === "male" || input.toLowerCase() === "female" || input.toLowerCase() === "none"){
  return true;
  }
}

function birthday(input){
  let pattern = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  //alert(reducedInput);
  if( pattern.test(input) || input.toLowerCase() === "none"){
  return true;
  }
}

function height(input){
  if(Number.isInteger(input) || input.toLowerCase() === "none"){
  return true;
  }
}
function weight(input){
  if(Number.isInteger(input) || input.toLowerCase() === "none"){
  return true;
  }
}
function eyeColor(input){
  if(input.toLowerCase() === "blue" || input.toLowerCase() === "brown" || input.toLowerCase() === "hazel" || input.toLowerCase() === "green" || input.toLowerCase() === "black" || input.toLowerCase() === "none"){
  return true;
  }
}

//programmer, doctor, politician, nurse, assistant, landscaper, architect, or student
function occupation(input){
  if(input.toLowerCase() === "doctor" || input.toLowerCase() === "politician" || input.toLowerCase() === "programmer" || input.toLowerCase() === "nurse" || input.toLowerCase() === "assistant" || input.toLowerCase() === "landscaper" || input.toLowerCase() === "architect" || input.toLowerCase() === "student" || input.toLowerCase() === "none"){
  return true;
  }
}