import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  darkMode = new BehaviorSubject(false); // Estado para el modo oscuro
  color: string;
  backButton: string;
  isModal: boolean;
  title: string;
  centerTitle: boolean;

  constructor() {}

  ngOnInit() {
    // Al inicializar, verificamos si hay un tema guardado en localStorage
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode.next(prefersDark.matches);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.darkMode.next(savedTheme === 'dark');
      this.applyTheme(this.darkMode.value);
    }

    prefersDark.addListener((e) => {
      this.darkMode.next(e.matches);
      this.applyTheme(this.darkMode.value);
    });
  }

  setTheme(isDark: boolean) {
    this.darkMode.next(isDark);
    this.applyTheme(isDark);

    // Guardamos el tema seleccionado en localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  applyTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
  }
}

