class Events {
  constructor() {
    var btnDay = document.getElementById("btnDay");
    this.output_part_one = document.getElementById("output_part_one");
    this.output_part_two = document.getElementById("output_part_two");

    btnDay.addEventListener("click", this.handleBtnDay.bind(this));
  }

  handleBtnDay() {
    var outputs = DayFour.execute();
    this.output_part_one.value = outputs.part_one;
    this.output_part_two.value = outputs.part_two;
  }
}
