class Events {
  constructor() {
    var btnDayOne = document.getElementById("btnDayOne");
    this.output_part_one = document.getElementById("output_part_one");
    this.output_part_two = document.getElementById("output_part_two");

    btnDayOne.addEventListener("click", this.handleBtnDayOne.bind(this));
  }

  handleBtnDayOne() {
    var outputs = DayOne.execute();
    this.output_part_one.value = outputs.part_one;
    this.output_part_two.value = outputs.part_two;
  }
}
