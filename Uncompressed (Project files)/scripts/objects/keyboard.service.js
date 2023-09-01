(function () {
  'use strict'

  angular.module('app.objects').factory('keyboardService', keyboardService)

  keyboardService.$inject = ['drawService']

  function keyboardService (drawService) {
    const service = {
      drawObject
    }

    return service

    function drawObject (x, y, z, objRotation) {
      const keyboardShape = new THREE.Shape()

      keyboardShape.moveTo(-5.75, -0.545)
      keyboardShape.lineTo(-5.75, 0.545)
      keyboardShape.lineTo(5.75, -0.14)
      keyboardShape.lineTo(5.75, -0.545)
      keyboardShape.lineTo(-5.75, -0.545)

      const keyboardExtrudeSettings = {
        steps: 1,
        amount: 27.9,
        bevelEnabled: false,
        bevelThickness: 0,
        bevelSize: 0,
        bevelSegments: 0
      }

      const keyboardGeometry = new THREE.ExtrudeGeometry(keyboardShape, keyboardExtrudeSettings)

      const keyboardTexture = new THREE.TextureLoader().load('images/keyboard.jpg')

      keyboardTexture.magFilter = THREE.NearestFilter
      keyboardTexture.minFilter = THREE.LinearMipMapLinearFilter
      keyboardTexture.wrapS = THREE.RepeatWrapping
      keyboardTexture.wrapT = THREE.RepeatWrapping
      keyboardTexture.repeat.set(1, 0.796875)
      keyboardTexture.offset.y = (1 - 0.796875) / 2

      const keyboardMaterial = new THREE.MeshPhongMaterial({
        color: 0xcbced5
      })

      const keyboardMesh = new THREE.Mesh(keyboardGeometry, keyboardMaterial)

      keyboardMesh.position.y = 0.545
      keyboardMesh.position.z = -27.9 / 2

      const geometry = new THREE.PlaneBufferGeometry(27.09, 10.83)
      const material = new THREE.MeshPhongMaterial({
        map: keyboardTexture,
        side: THREE.DoubleSide
      })
      const plane = new THREE.Mesh(geometry, material)

      plane.rotation.x = -Math.PI / 2
      plane.rotation.z = Math.PI / 2
      plane.rotation.y = Math.PI / 180 * 3.387
      plane.position.y = 0.76

      const keyboard = new THREE.Object3D()
      keyboard.add(keyboardMesh)
      keyboard.add(plane)

      keyboard.children.forEach(function (element) {
        element.castShadow = true
        element.receiveShadow = true
        element.ancestor = keyboard
      })

      keyboard.position.set(x, y, z)

      keyboard.rotation.set(0, -Math.PI / 2 + objRotation * Math.PI / 180, 0)

      keyboard.name = 'keyboard'

      return keyboard
    }
  }
})()
