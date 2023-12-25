import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { C1_URL } from "../../lib/constants";

@Component({
  selector: "app-nav",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, NgOptimizedImage],
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.scss",
})
export class NavComponent {
  protected readonly C1_URL = C1_URL;
}
