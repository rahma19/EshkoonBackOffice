import { Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ctrlShiftKey(e, keyCode) {
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  }

  ngOnInit(): void {
   // Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    e!.keyCode === 123 ||
    this.ctrlShiftKey(e, 'I') ||
    this.ctrlShiftKey(e, 'J') ||
    this.ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
  return
};
  }
}
