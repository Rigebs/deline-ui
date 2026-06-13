import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-docs-layout',
  imports: [RouterOutlet, Navbar, Sidebar],
  templateUrl: './docs-layout.html',
})
export class DocsLayout {}
