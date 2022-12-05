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

  static convertOutcomeToSelection(game) {
    var cpu = {A: 2, B: 0, C: 1};
    var player = {X: 0, Y: 1, Z: 2};
    var selections = ["X", "Y", "Z"];

    return game[0] + " " + selections[(cpu[game[0]] + player[game[2]]) % 3];
  }

  static getSelectionScore(game) {
    var scores = {X: 1, Y: 2, Z: 3};

    return scores[game[2]];
  }

  static getResultScore(game) {
    var cpu = {A: 1, B: 0, C: 2};
    var player = {X: 0, Y: 1, Z: 2};
    var scores = [0, 3, 6];

    return scores[(cpu[game[0]] + player[game[2]]) % 3];
  }
}
