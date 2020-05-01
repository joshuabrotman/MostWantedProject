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
    return mainMenu(person, people);
    break;
    case "family":
    displayFamily(person, people); 
    return mainMenu(person, people);   
    break;
    case "descendants":
    displayPeople(searchForDescendants(person, people));
    return mainMenu(person, people);
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



function searchByTraits(people){
  let displayOption = prompt("Do you want to search by gender, birthday, height, weight, eyecolor, or occupation? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "gender":
    searchByGender(people);
    break;
    case "birthday":
    searchByBirthday(people);    
    break;
    case "height":
    searchByHeight(people);    
    break;
    case "weight":
    searchByWeight(people);    
    break;
    case "eyecolor":
    searchByEyecolor(people);    
    break;
    case "occupation":
    searchByOccupation(people);    
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again)
  
	}
}

function searchByGender(people){
    let gender = promptFor("What is the person's gender?", chars);

    let foundPerson = people.filter(function(person){
	if(person.gender === gender){

	  return true;
	}
	else{
	  return false;
	}
})
  var names = "";
  for (var i = 0; i <= foundPerson.length -1; i++) {
    names += foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n";
  }
  alert(names);
  //return foundPerson;
  app(people); //reset
}


function searchByBirthday(people){
    let dob = promptFor("What is the person's birthday? (enter as N/NN/NN)", chars);

    let foundPerson = people.filter(function(person){
  if(person.dob === dob){

    return true;
  }
  else{
    return false;
  }
})
  var names = "";
  for (var i = 0; i <= foundPerson.length -1; i++) {
    names += foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n";
  }
  alert(names);
  //return foundPerson;
  app(people); //reset
}

function searchByHeight(people){
    let height = promptFor("What is the person's height in inches?", chars);

    let foundPerson = people.filter(function(person){
  if(person.height == height){

    return true;
  }
  else{
    return false;
  }
})
  var names = "";
  for (var i = 0; i <= foundPerson.length -1; i++) {
    names += foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n";
  }
  alert(names);
  //return foundPerson;
  app(people); //reset
}

function searchByWeight(people){
    let weight = promptFor("What is the person's weight in pounds?", chars);

    let foundPerson = people.filter(function(person){
  if(person.weight == weight){

    return true;
  }
  else{
    return false;
  }
})
  var names = "";
  for (var i = 0; i <= foundPerson.length -1; i++) {
    names += foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n";
  }
  alert(names);
  //return foundPerson;
  app(people); //reset
}

function searchByEyecolor(people){
    let eyeColor = promptFor("What is the person's eye color? (brown, black, hazel, blue, or green)", chars);

    let foundPerson = people.filter(function(person){
  if(person.eyeColor === eyeColor){

    return true;
  }
  else{
    return false;
  }
})
  var names = "";
  for (var i = 0; i <= foundPerson.length -1; i++) {
    names += foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n";
  }
  alert(names);
  //return foundPerson;
  app(people); //reset
}

function searchByOccupation(people){
    let occupation = promptFor("What is the person's occupation? (programmer, doctor, politician, nurse, assistant, landscaper, architect, or student?)", chars);

    let foundPerson = people.filter(function(person){
  if(person.occupation === occupation){

    return true;
  }
  else{
    return false;
  }
})
  var names = "";
  for (var i = 0; i <= foundPerson.length -1; i++) {
    names += foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n";
  }
  alert(names);
  //return foundPerson;
  app(people); //reset
}

function displayPeople(people, relationship){
  if(relationship != null){
    alert(people.map(function(person){
    return relationship + ": " + person.firstName + " " + person.lastName;
  }).join("\n"));
  }
  else{
    alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  }
  
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gener: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob +"\n";
  personInfo += "Height: " + person.height +"\n";
  personInfo += "Weight: " + person.weight +"\n";
  personInfo += "Eye Color: " + person.eyeColor +"\n";
  personInfo += "Occupation: " + person.occupation +"\n";    
  alert(personInfo);
  
}

function searchForDescendants(person, people){
  let foundDescendants = new Array;
  for(let i = 0; i < people.length; i++){
    if(people[i].parents.includes(person.id)){
      foundDescendants.push(people[i]);
    }
  }
  for(let i = 0; i < foundDescendants.length; i++){
    let nextGen = searchForDescendants(foundDescendants[i], people);
    nextGen.forEach(function(el){
      foundDescendants.push(el);
    });    
  }
  return foundDescendants;
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
