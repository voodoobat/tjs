import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  BoxGeometry,
  DirectionalLight,
  MeshPhongMaterial,
  Object3D,
} from 'three'

import {
  genRanHex,
  getOjectsItersectVect,
  mouseEvent2Vect,
  vect2ScenePos,
} from '@/assets/util'

const { innerWidth, innerHeight } = window

const renderer = new WebGLRenderer()
const scene = new Scene()
const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)

const cube = (color = 0x000, x = 0, y = 0, z = 0, name?: string) => {
  const obj = new Mesh(new BoxGeometry(), new MeshPhongMaterial({ color }))
  obj.position.set(x, y, z)
  if (name) {
    obj.name = name
  }
  return obj
}

const light = new DirectionalLight(0xffffff, 1)
light.position.set(-3, -3, 40)

scene.add(cube(genRanHex(), -2, 1))
scene.add(cube(genRanHex(), 0, 0, 0, 'cube'))
scene.add(cube(genRanHex(), 2, -1))
scene.add(light)
camera.position.z = 5

type MoveEvent = {
  object: Object3D | null
}

const moveEvent: MoveEvent = {
  object: null,
}

let isDoubleClick = false
window.addEventListener('click', (ev) => {
  if (!isDoubleClick) {
    isDoubleClick = true
    setTimeout(() => {
      isDoubleClick = false
    }, 300)
  } else {
    const objects = getOjectsItersectVect(mouseEvent2Vect(ev), scene, camera)
    if (!objects.length) {
      const obj = scene.getObjectByName('cube')
      const { x, y } = vect2ScenePos(mouseEvent2Vect(ev), camera)
      const object = cube(genRanHex(), x, y)
      if (obj?.rotation) {
        const { x, y, z } = obj.rotation
        object.rotation.set(x, y, z)
      }
      scene.add(object)
      isDoubleClick = false
    }
  }
})

window.addEventListener('mousedown', (ev) => {
  const objects = getOjectsItersectVect(mouseEvent2Vect(ev), scene, camera)
  if (objects.length && objects[0]?.object.isObject3D) {
    moveEvent.object = objects[0].object
  }
})

window.addEventListener('mousemove', (ev) => {
  const { object } = moveEvent
  if (object) {
    const { x, y } = vect2ScenePos(mouseEvent2Vect(ev), camera)
    object.position.x = x
    object.position.y = y
  }
})

window.addEventListener('mouseup', () => {
  moveEvent.object = null
})

export const animate = (): void => {
  scene.children.forEach((obj) => {
    if (obj instanceof Mesh) {
      obj.rotation.x += 0.007
      obj.rotation.y += 0.007
    }
  })

  const { clientWidth, clientHeight } = renderer.domElement
  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

export const setSceneSize = () => {
  const { innerWidth, innerHeight } = window
  renderer.setSize(innerWidth, innerHeight)
}

export const renderScene = (el: HTMLElement | null): void => {
  setSceneSize()
  el?.appendChild(renderer.domElement)
}
