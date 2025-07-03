import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import fs from 'fs'
import path from 'path'

// Create a scene
const scene = new THREE.Scene()

// Create bench model (blue box)
const benchGeometry = new THREE.BoxGeometry(2, 1, 1)
const benchMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x0066FF,
    metalness: 0.5,
    roughness: 0.5
})
const benchMesh = new THREE.Mesh(benchGeometry, benchMaterial)
scene.add(benchMesh)

// Export bench
const exporter = new GLTFExporter()
exporter.parse(
    benchMesh,
    function (gltf) {
        const output = JSON.stringify(gltf)
        fs.writeFileSync(path.join('public', 'models', 'bench.gltf'), output)
    },
    { binary: false }
)

// Clear scene
scene.remove(benchMesh)

// Create rocks model (orange sphere)
const rocksGeometry = new THREE.SphereGeometry(1, 32, 32)
const rocksMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xFF6600,
    metalness: 0.3,
    roughness: 0.7
})
const rocksMesh = new THREE.Mesh(rocksGeometry, rocksMaterial)
scene.add(rocksMesh)

// Export rocks
exporter.parse(
    rocksMesh,
    function (gltf) {
        const output = JSON.stringify(gltf)
        fs.writeFileSync(path.join('public', 'models', 'rocks.gltf'), output)
    },
    { binary: false }
) 