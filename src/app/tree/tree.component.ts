import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three'

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css'
})
export class TreeComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private decorations: THREE.Mesh[] = [];
  private lastColorChangeTime: number = 0;
  private colorChangeInterval: number = 500;
  public levels = 5;

  ngOnInit(): void {
    this.initThree();
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.animate();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }

  private initThree(): void {
    this.scene = new THREE.Scene();
    this.scene.background = null;

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    this.createTree();
    this.createTrunk();
    this.addDecorations();
  }

  private createTree(): void {
    const geometry = new THREE.ConeGeometry(1, 3, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const tree = new THREE.Mesh(geometry, material);
    this.scene.add(tree);
  }

  // Создание ствола
  private createTrunk(): void {
    const trunkGeometry = new THREE.BoxGeometry(0.2, 0.5, 0.2);
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = -2;
    this.scene.add(trunk);
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

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}
