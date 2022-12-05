class DayTwo {

  static execute() {
    var games = day_two_data.split('\n');
    var total_score = 0;

    total_score += games.map(this.getSelectionScore).reduce((a, b) => a + b, 0);
    total_score += games.map(this.getResultScore).reduce((a, b) => a + b, 0);

    var converted_games = games.map(this.convertOutcomeToSelection);
    var converted_total_score = 0;

    converted_total_score += converted_games.map(this.getSelectionScore).reduce((a, b) => a + b, 0);
    converted_total_score += converted_games.map(this.getResultScore).reduce((a, b) => a + b, 0);

    return { part_one: total_score, part_two: converted_total_score };
  }

  // TODO: refactor this
  static convertOutcomeToSelection(game) {
    switch(game[0]) {
      case "A":
        switch(game[2]) {
          case "X":
            return "A Z";
          case "Y":
            return "A X";
          case "Z":
            return "A Y";
        }

        break;
      case "B":
        switch(game[2]) {
          case "X":
            return "B X";
          case "Y":
            return "B Y";
          case "Z":
            return "B Z";
        }

        break;
      case "C":
        switch(game[2]) {
          case "X":
            return "C Y";
          case "Y":
            return "C Z";
          case "Z":
            return "C X";
        }

        break;
    }
  }

  // TODO: refactor this
  static getSelectionScore(game) {
    switch(game[2]) {
      case "X":
        return 1;
      case "Y":
        return 2;
      case "Z":
        return 3;
    }
  }

  static getResultScore(game) {
    var cpu = {A: 1, B: 0, C: 2};
    var player = {X: 0, Y: 1, Z: 2};
    var scores = [0, 3, 6];

    return scores[(cpu[game[0]] + player[game[2]]) % 3];
  }
}
