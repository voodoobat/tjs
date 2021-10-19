import { Camera, Intersection, Object3D, Raycaster, Scene, Vector2, Vector3 } from 'three'

export const mouseEvent2Vect = (ev: MouseEvent): Vector2 => {
  const { clientX, clientY } = ev
  const { innerWidth, innerHeight } = window
  return new Vector2(
    (clientX / innerWidth) * 2 - 1,
    -(clientY / innerHeight) * 2 + 1
  )
}

export const vect2ScenePos = (vect: Vector2, camera: Camera): Vector3 => {
  const v = (new Vector3(vect.x, vect.y, camera.position.z)).unproject(camera).sub(camera.position).normalize()
  const distance = -camera.position.z / v.z
  return new Vector3().copy(camera.position).add(v.multiplyScalar(distance))
}

export const getOjectsItersectVect = (vect: Vector2, scene: Scene, camera: Camera): Intersection[] => {
  const raycaster = new Raycaster()
  raycaster.setFromCamera(vect, camera)
  return raycaster.intersectObjects(scene.children)
}
