import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App">
      <Es6Features />
      {/* {<Advice />} */}
    </div>
  );
}

function Advice() {
  let [advicemsg, setAdvicemsg] = useState("");
  let [count, setCount] = useState(0);
  async function getadvice() {
    console.log("inside getadvice() method");
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvicemsg(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(() => {
    console.log("inside useEffect() method");
    getadvice();
  }, []);

  return (
    <div>
      <h1>ADVICE DISPLAYER</h1>
      <button onClick={getadvice}>Get Advice</button>
      <h3>{advicemsg}</h3>
      <Dispalaymessage count={count} />
    </div>
  );
}

function Dispalaymessage(props) {
  return (
    <div>
      <p>This is your {props.count} Advice</p>
    </div>
  );
}

function Es6Features() {
  let persondetails = {
    id: 101,
    name: "shiva",
    address: "begumpet",
    age: 25,
    hobbies: [
      "playing cricket",
      "hangout with friends",
      "codding",
      "sleeping",
      "eating",
    ],
  };

  console.log(persondetails.name, persondetails.age);

  // destructuring
  let { hobbies } = persondetails;
  // console.log(age, name, hobbies);
  let [mostfavoritehobbie, , , lessfavoritehobbie] = hobbies;
  console.log(mostfavoritehobbie, lessfavoritehobbie);

  //rest operator
  let [primaryhobbie, secondaryhobbie, ...otherhobbies] = hobbies;
  console.log(primaryhobbie, secondaryhobbie, otherhobbies);

  let { id, name, ...otherdetails } = persondetails;
  console.log(id, name, otherdetails);

  //spread operator
  let allhobbies = ["listening to songs", "talking to others", ...hobbies];
  console.log(allhobbies);

  let additionalpersondetails = {
    doeswalk: true,
    height: 6,
    weight: 90,
    dob: "20-03-1998",
  };

  let alldetailsofperson = {
    ...persondetails,
    ...additionalpersondetails,
    age: 26,
  };
  console.log(alldetailsofperson);

  let { doeswalk, age, height, weight, ...othermajordetails } =
    alldetailsofperson;
  // string literal, ternary operator
  console.log(
    `The weight of the person is ${weight} so ${
      weight >= 100 ? "" : "dosen't"
    } needs to walk and hobbies are::${othermajordetails["hobbies"]}`
  );

  // arrow function
  // function birthYear(age) {
  //   return age.split("-")[2];
  // }

  let birthYear = (str) => str.split("-")[2];

  console.log(birthYear(alldetailsofperson["dob"]));

  // short circuit

  let shouldwalk = true && "walking is needed";
  console.log(shouldwalk);

  let running = false || "running";
  console.log(running);
  console.log(
    `The weight of the person is ${weight} so ${
      weight <= 100 && "dosen't"
    } need to walk`
  );

  doeswalk = false;

  let res = doeswalk || "every person need to walk as it keeps u healthy";
  console.log(res);

  persondetails.name = null;
  let nameres = persondetails.name || "Name is mandatroy for a person";
  console.log(nameres);

  // ?? - nullish collision operator in javascript
  let personcount = null;
  let personcount2 = 0;
  let respercnt = personcount ?? "No data available";
  let respercnt2 = personcount2 ?? "No data available";
  console.log(respercnt);
  console.log(respercnt2);

  //optional chaining- if any value is null, then null.val results in error, so we can use optionalchaining(?) to avoid error

  persondetails = null;
  let re = persondetails?.hobbies;
  console.log(re);

  //map -- map method is used to iterate through all the elements of
  // an array and return a new array. It contains a call back function
  // which has the logic that to be applied on the array elements and thus returning new array.

  let numbers = [1, 2, 3, 4, 5];
  let muloffive = numbers.map((el) => el * 5);
  console.log(muloffive);

  let per1 = {
    id: 101,
    name: "shiva",
    area: "begumpet",
    occupation: "software engineer",
    dob: "20-03-1998",
    age: 25,
  };
  let per2 = {
    id: 102,
    name: "ram",
    area: "ameerpet",
    occupation: "sales",
    dob: "25-08-1997",
    age: 26,
  };
  let per3 = {
    id: 103,
    name: "krishna",
    area: "panjagutta",
    occupation: "doctor",
    dob: "25-10-1995",
    age: 29,
  };

  let per4 = {
    id: 104,
    name: "raju",
    area: "khairthabad",
    occupation: "travelagent",
    dob: "25-10-2001",
    age: 23,
  };
  let colonypersons = [per1, per2, per3, per4];

  let colonypersonnames = colonypersons.map((person) => person.name);
  console.log(colonypersonnames);

  let colonypersonnameaddressoccupation = colonypersons.map((per) => {
    return {
      name: per.name + " durgi",
      area: per.area,
      occupation: per.occupation,
      yearofbirth: birthYear(per.dob),
    };
  });
  console.log(colonypersonnameaddressoccupation);

  // filter - a filter method is applied on the array so that only if the call back function returns a true value then that element is added in the new array.

  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let multiplesoftwogreaterthan5 = nums
    .filter((num) => num % 2 == 0)
    .filter((num) => num > 5);
  console.log(multiplesoftwogreaterthan5);

  let colonypersonsnameswithdobafter1997 = colonypersons
    .filter((person) => birthYear(person.dob) >= 1997)
    .map((per) => {
      return { name: per.name, dob: per.dob };
    });
  console.log(colonypersonsnameswithdobafter1997);

  //reduce- reduce method is used to reduce or boildown the result of the array.
  //accumlator is used to store the sum result
  //currentvalue points to the current element

  let numrs = [1, 2, 3, 4, 5];
  let resofsum = numrs.reduce(
    (accumlator, currentvalue) => accumlator + currentvalue
  );
  console.log(resofsum);

  //sort - sort method is used to sort the array in accending or descending order. a-b accending, b-a descending

  let randomnums = [3, 9, 1, 2, 5, 6, 8, 4, 7];
  randomnums.sort((a, b) => b - a);
  console.log(randomnums);

  //here sort method is making the orginal array mutable(changeable), if we don't want the orginal array to change, then we use slice()

  let randomnum = [3, 9, 1, 2, 5, 6, 8, 4, 7];
  let accresrand = randomnum.slice().sort((a, b) => a - b);
  let descrand = randomnum.slice().sort((a, b) => b - a);
  console.log(randomnum);
  console.log(accresrand);
  console.log(descrand);

  let colnypersonssortedbyage = colonypersons
    .slice()
    .sort((a, b) => a.age - b.age);
  console.log(colnypersonssortedbyage);

  // in react all the elements are maintained as immutable ones

  // So, below are the steps to add, delete or update the elements of an array such that it is immutable.

  // to add

  let newperson = {
    id: 105,
    name: "yash",
    area: "banjarahills",
    occupation: "actor",
    dob: "30-5-1990",
    age: 32,
  };

  let allcolonypersons = [...colonypersons, newperson];
  console.log(allcolonypersons);

  // to delete a person, we need to use the filter method.

  let nonactoroccupation = allcolonypersons.filter(
    (person) => person.occupation !== "actor"
  );
  console.log(nonactoroccupation);

  // inorder to update the elements we need to use map, as map returns the same size as the previous with just updated elements

  let stateaddedtoallcolonypersons = allcolonypersons.map((person) => {
    return { ...person, state: "Telangana" };
  });
  console.log(stateaddedtoallcolonypersons);

  // fetch is used to make the api calls in javascript, it is asynchronous in nature which means that until it gets the response back from api it can execute remaining lines of javascript. this is called as promise, when a promise is fulfilled(i.e when you get response from api) then() method gets executed.

  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((res) => console.log(res));

  console.log("shiva");
  console.log("ram");

  // async - it is used to make the execution of the code in a synchronous way i.e line by line.

  async function gettodos() {
    const todos = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    console.log("hello");
    const result = await todos.json();
    console.log(result);
    console.log("bye");
    return result;
  }

  const persndet = {
    nae: "shiva",
    ag: 25,
    address: "hyderabad",
    profession: "software engineer",
  };

  const { nae, address, ...remperdet } = persndet;
  const { profession, ag } = remperdet;
  console.log(nae, address, remperdet, profession, ag);

  let ar1 = [9, 2, 3];
  let ar2 = [4, 5, 6];
  let ar3 = [...ar1, ar2];
  console.log(ar3);

  const fullperdet = {
    fname: "narsingrao",
    height: 5.1,
    ...persndet,
    arrall: [ar1, ar2],
  };

  console.log(fullperdet);

  console.log("line1");
  console.log(gettodos());
  console.log("line2");

  const array9 = [10, 20, 30, 40, 50, 60];
  const [xe, ...ze] = array9;
  // const [...c] = array1;
  console.log(xe);
  //console.log(ye);
  console.log(ze);

  const person = {
    nme: "Sid",
    age: 30,
    salary: 1000,
  };

  const { nme, ...person1 } = person;
  console.log(nme);
  console.log(person1);

  const ob1 = { as: 1, ed: 2 };
  const ob2 = { ef: 100 };
  const ob3 = { ...ob1, ...ob2 };
  console.log(ob3);

  const array1 = [3, 5, 9];
  const array2 = [70, 80, 90, 100];
  // const array3 = [...array1, ...array2];
  const array3 = [1000, ...array1, 2000, ...array2, 3000];
  console.log(array3);

  const person2 = {
    worksfor: "Accenture",
    place: "Bengaluru",
    salary: 2000,
  };

  const ar = [1, 2, 3, 4, 5];
  const arr = [6, 7, 8];
  //const person3 = { ...person, ...person2 };
  const person3 = {
    ...person,
    ...person2,
    project: "LKM",
    persondetails: [...ar, ...arr],
  };
  console.log(person3);
}
export default App;
