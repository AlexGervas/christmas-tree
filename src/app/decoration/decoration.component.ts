import { Component, Input, OnInit, Output } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-decoration',
  standalone: true,
  imports: [],
  templateUrl: './decoration.component.html',
  styleUrl: './decoration.component.css'
})
export class DecorationComponent implements OnInit {
  @Input() scene!: THREE.Scene;
  @Input() camera!: THREE.Camera;
  @Input() renderer!: THREE.WebGLRenderer;
  @Input() levels: number = 0;

  decorations: THREE.Mesh[] = [];
  lastColorChangeTime: number = 0;
  colorChangeInterval: number = 500;

  ngOnInit() {
    this.addDecorations();
    this.animate();
  }

  private addDecorations(): void {
    const decorationColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
    const decorationCount = 30;
    const decorationsPerLevel = Math.floor(decorationCount / this.levels);

    for (let level = 0; level < this.levels; level++) {
      const height = (level + 1) * 0.7;
      const radius = 1 - (level * 0.25);

      for (let i = 0; i < decorationsPerLevel; i++) {
        const geometry = new THREE.SphereGeometry(0.1, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: decorationColors[Math.floor(Math.random() * decorationColors.length)] });
        const decoration = new THREE.Mesh(geometry, material);
        this.decorations.push(decoration);

        const angle = (i / decorationsPerLevel) * Math.PI * 2; // Угол для равномерного распределения
        decoration.position.x = radius * Math.cos(angle);
        decoration.position.y = height - 2;
        decoration.position.z = radius * Math.sin(angle);

        this.scene.add(decoration);
      }
    }
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    const currentTime = performance.now();

    if (currentTime - this.lastColorChangeTime > this.colorChangeInterval) {
      this.changeDecorationColors();
      this.changeDecorationColors();
      this.lastColorChangeTime = currentTime;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private changeDecorationColors(): void {
    const decorationColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
    this.decorations.forEach(decoration => {
      const randomColor = decorationColors[Math.floor(Math.random() * decorationColors.length)];
      (decoration.material as THREE.MeshBasicMaterial).color.set(randomColor);
    });
  }

}
