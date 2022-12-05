class DayTwo {

  static execute() {
    var games = day_two_data.split('\n');
    var total_score = 0;

    total_score += games.map(this.getSelectionScore).reduce((a, b) => a + b, 0);
    total_score += games.map(this.getResultScore).reduce((a, b) => a + b, 0);

    return { part_one: total_score, part_two: 0 };
  }

  // TODO: refactor these

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
    switch(game[0]) {
      case "A":
        switch(game[2]) {
          case "X":
            return 3;
          case "Y":
            return 6;
          case "Z":
            return 0;
        }

        break;
      case "B":
        switch(game[2]) {
          case "X":
            return 0;
          case "Y":
            return 3;
          case "Z":
            return 6;
        }

        break;
      case "C":
        switch(game[2]) {
          case "X":
            return 6;
          case "Y":
            return 0;
          case "Z":
            return 3;
        }

        break;
    }
  }
}
