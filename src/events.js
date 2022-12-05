class Events {
  constructor() {
    var btnDayOne = document.getElementById("btnDayOne");
    this.output = document.getElementById("output");

    btnDayOne.addEventListener("click", this.handleBtnDayOne.bind(this));
  }

  handleBtnDayOne() {
    this.output.value = DayOne.execute();
  }
}
