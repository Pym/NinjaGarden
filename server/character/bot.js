Bot = function(character) {
	this.type = 'bot';
	this.character = character;
	this.init();
}

Bot.prototype = {
	init: function() {
		// nothing yet
	},
	getNextDecision: function() {
		var timedDecision;

		// fill stack if needed
		if(this.character.decisionStack.length == 0) {
			this.generateNewDecision();
		}

		var timedDecision = this.character.decisionStack[0];
		timedDecision.duration--;


		// remove finished decision from the stack
		if(timedDecision.duration <= 0) {
			this.character.decisionStack.shift();
		}

		return timedDecision.decision;
	},
	generateNewDecision: function() {
		// faint stunned state
		if(Utils.rand(500) == 1) {
			this.character.isStunned();
			return;
		}

		var newDir   = this.character.getRandDir();
		var newState = this.character.getRandState();
		this.character.decisionStack.push({
			'decision' : new Decision(newState, newDir, null),
			'duration' : Utils.rand(9 * Config.Times.NB_FRAME_SEC) + 30
		});
	}
}

exports.Bot = Bot;