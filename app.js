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
      break;
    case 'no':
      searchResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
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
    displayInfo(person);
    break;
    case "family":
    searchForFamily(person, people);    
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

function displayInfo(person){
	alert("First Name: " + person.firstName +"\n" +
		  "Last Name: " + person.lastName +"\n" +
	      "Gender: " + person.gender +"\n" +
		  "DOB: " + person.dob +"\n"+
		  "Height: " + person.height +"\n" +
		  "Weight: " + person.weight +"\n" +
		  "Eye Color: " + person.eyeColor +"\n" +
		  "Occupation: " + person.occupation +"\n");

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
  
  return foundPerson;
}

function searchByBirthDay(people){
    let birthDay = promptFor("What is the person's birth day?", chars);

    let foundPerson = people.filter(function(person){
	if(person.gender === gender){

	  return true;
	}
	else{
	  return false;
	}
	})
  
  foundPerson = foundPerson[0];
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
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
