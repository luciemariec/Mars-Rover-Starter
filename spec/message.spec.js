const Message = require('../message.js');
const Command = require('../command.js');


describe("Message class", function() {
//Test 4
    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name required.'));
      });
//Test 5
      it("constructor sets name", function() {
        let name = new Message('someName');
        expect(name.name).toBe('someName');
      });
//Test 6
      it("contains a commands array passed into the constructor as the 2nd argument", function() {
        let commands = [new Command('command1'), new Command('command2')];
        let message = new Message('someName', commands);
        expect(message.commands).toEqual(commands);
    });
});
