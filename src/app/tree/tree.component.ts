import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three'
import { DecorationComponent } from "../decoration/decoration.component";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [DecorationComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css'
})
export class TreeComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  levels = 5;

  ngOnInit(): void {
    this.initThree();
    window.addEventListener('resize', this.onWindowResize.bind(this));
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
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.createTree();
    this.createTrunk();

    this.animatedOrbitControls();
  }

  private createTree(): void {
    const geometry = new THREE.ConeGeometry(1, 3, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const tree = new THREE.Mesh(geometry, material);
    this.scene.add(tree);
  }

  // Создание ствола
  private createTrunk(): void {
    const trunkHeight = 1.0;
    const trunkGeometry = new THREE.BoxGeometry(0.2, trunkHeight, 0.2);
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = -2 + trunkHeight / 2;
    this.scene.add(trunk);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animatedOrbitControls(): void {
    requestAnimationFrame(() => this.animatedOrbitControls());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

}
