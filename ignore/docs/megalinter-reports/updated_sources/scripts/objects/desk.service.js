(function () {
  'use strict'

  angular.module('app.objects').factory('deskService', deskService)

  deskService.$inject = ['drawService']

  function deskService (drawService) {
    const service = {
      drawObject
    }

    return service

    function drawObject (deskWidth, deskHeight, deskLength, deskThickness, color) {
      const deskGeometry = new THREE.CubeGeometry(deskLength, deskThickness, deskWidth)
      const deskMaterial = new THREE.MeshPhongMaterial({
        color,
        shininess: 0
      })
      const deskMesh = new THREE.Mesh(deskGeometry, deskMaterial)
      const legGeometry = new THREE.CubeGeometry(deskThickness, deskHeight, deskThickness)
      const legMesh1 = new THREE.Mesh(legGeometry, deskMaterial)
      const legMesh2 = new THREE.Mesh(legGeometry, deskMaterial)
      const legMesh3 = new THREE.Mesh(legGeometry, deskMaterial)
      const legMesh4 = new THREE.Mesh(legGeometry, deskMaterial)
      deskMesh.position.y = -deskThickness / 2
      legMesh1.position.y = -deskHeight / 2
      legMesh2.position.y = -deskHeight / 2
      legMesh3.position.y = -deskHeight / 2
      legMesh4.position.y = -deskHeight / 2
      legMesh1.position.x = ((deskLength / 2) - (deskThickness / 2))
      legMesh2.position.x = ((deskLength / 2) - (deskThickness / 2))
      legMesh3.position.x = -((deskLength / 2) - (deskThickness / 2))
      legMesh4.position.x = -((deskLength / 2) - (deskThickness / 2))
      legMesh1.position.z = -((deskWidth / 2) - (deskThickness / 2))
      legMesh2.position.z = ((deskWidth / 2) - (deskThickness / 2))
      legMesh3.position.z = -((deskWidth / 2) - (deskThickness / 2))
      legMesh4.position.z = ((deskWidth / 2) - (deskThickness / 2))

      const desk = new THREE.Object3D()
      desk.add(deskMesh)
      desk.add(legMesh1)
      desk.add(legMesh2)
      desk.add(legMesh3)
      desk.add(legMesh4)

      desk.children.forEach(function (element) {
        element.castShadow = true
        element.receiveShadow = true
        element.ancestor = desk
      })

      desk.position.set(0, 0, 0)
      desk.name = 'desk'

      return desk
    }
  }
})()
