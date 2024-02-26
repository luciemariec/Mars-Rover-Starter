const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');


describe("Rover class", function() {
//Test 7
it("constructor sets position and default values for mode and generatorWatts", function() {
  let roverTest = new Rover (87382098);
  expect(roverTest.position).toEqual(87382098);
  expect(roverTest.mode).toEqual('NORMAL');
  expect(roverTest.generatorWatts).toEqual(110);
});
//Test 8
it("response returned by receiveMessage contains the name of the message", function() {
  let roverTest = new Rover(87382098); 
  let response = new Message('testing', 'dogs');
  let newTest = roverTest.receiveMessage(response);
  expect(newTest.message).toEqual('testing');
});
//Test 9
it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  let roverTest = new Rover(87382098); 
  let commands = [new Command('STATUS_CHECK'), new Command('MOVE')];
  let message = new Message('testing', commands);
  let newTest = roverTest.receiveMessage(message);
  expect(newTest.results.length).toEqual(2);
});
//Test 10
it("responds correctly to the status check command", function() {
  let roverTest = new Rover(87382098);
  let commands = [new Command('STATUS_CHECK')];
  let message = new Message('testing', commands);
  let newTest = roverTest.receiveMessage(message);
  expect(newTest.results[0].roverStatus.mode).toEqual(roverTest.mode);
});
//Test 11
it("responds correctly to the mode change command", function() {
  let roverTest = new Rover(87382098);
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('testing', commands);
  let newTest = roverTest.receiveMessage(message);
  expect(newTest.results[0].completed).toEqual(true);
});
//Test 12
it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
  let roverTest = new Rover(87382098);
  roverTest.mode = 'LOW_POWER'; 
  let commands = [new Command('MOVE', 123)];
  let message = new Message('testing', commands);
  let newTest = roverTest.receiveMessage(message);
  expect(newTest.results[0].completed).toEqual(false);
});
//Test 13
it("responds with the position for the move command", function() {
  let roverTest = new Rover(87382098);
  let newPosition = 500;
  let commands = [new Command('MOVE', newPosition)];
  let message = new Message('testing', commands);
  let response = roverTest.receiveMessage(message);
  expect(roverTest.position).toEqual(newPosition);
});
});

