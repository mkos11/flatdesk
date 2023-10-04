(function () {
  'use strict'

  angular.module('app.objects').factory('tabletService', tabletService)

  tabletService.$inject = ['drawService', '$q']

  function tabletService (drawService, $q) {
    const service = {
      drawObject
    }

    return service

    function drawObject (scene, camera, x, y, z, objRotation, color) {
      const tablet = new THREE.Object3D()
      tablet.objectHeight = 17.6
      tablet.objectThickness = 0.6
      tablet.objectWidth = 24.6

      tablet.screen = new Object()
      tablet.screen.distance = 0.31
      tablet.screen.height = 15
      tablet.screen.width = 19.9

      const tabletShape = new THREE.Shape()
      drawService.createRoundedRectangle(tabletShape, 24, 17, 0.8)
      const tabletExtrudeSettings = {
        steps: 2,
        amount: 0,
        bevelEnabled: true,
        bevelThickness: 0.3,
        bevelSize: 0.3,
        bevelSegments: 10
      }
      const tabletGeometry = new THREE.ExtrudeGeometry(tabletShape, tabletExtrudeSettings)
      const tabletMaterial = new THREE.MeshPhongMaterial({
        color
      })
      const tabletMesh = new THREE.Mesh(tabletGeometry, tabletMaterial)
      const tabletScreen = new THREE.Mesh(new THREE.PlaneBufferGeometry(19.9, 15), new THREE.MeshPhongMaterial({
        color: 0x151515,
        side: THREE.FrontSide,
        shininess: 30
      }))
      const tabletButton = new THREE.Mesh(new THREE.CircleGeometry(0.55, 32), new THREE.MeshPhongMaterial({
        side: THREE.FrontSide,
        color: 0x1d1d1d,
        opacity: 0.35,
        transparent: true
      }))
      const tabletButton2 = new THREE.Mesh(new THREE.CircleGeometry(0.48, 32), new THREE.MeshPhongMaterial({
        color,
        side: THREE.FrontSide
      }))
      const tabletCamera = new THREE.Mesh(new THREE.CircleGeometry(0.15, 32), new THREE.MeshPhongMaterial({
        color: 0x373a3c,
        side: THREE.FrontSide
      }))

      tabletScreen.position.z = 0.31
      tabletButton.position.z = 0.31
      tabletButton.position.x = 10.875
      tabletButton2.position.z = 0.32
      tabletButton2.position.x = 10.875
      tabletCamera.position.z = 0.31
      tabletCamera.position.x = -10.875

      const hoverBox = new THREE.Mesh(new THREE.BoxBufferGeometry(24.6, 17.6, 5),
        new THREE.MeshBasicMaterial({
          color: 0x248f24,
          alphaTest: 0,
          visible: false
        }))
      hoverBox.position.z = -2.1

      tablet.add(hoverBox)

      tablet.rayReceiver = hoverBox

      tablet.add(tabletMesh)
      tablet.add(tabletScreen)
      tablet.add(tabletButton)
      tablet.add(tabletButton2)
      tablet.add(tabletCamera)

      tablet.children.forEach(function (element) {
        element.receiveShadow = false
        element.castShadow = true
        element.ancestor = tablet
      })

      hoverBox.receiveShadow = false
      hoverBox.castShadow = false

      tablet.defaultPosition = new THREE.Vector3(x, y + 0.3, z)
      tablet.defaultRotation = new THREE.Euler(-Math.PI / 2, 0, objRotation * Math.PI / 180, 'XYZ')
      tablet.hoverDestinationPosition = new THREE.Vector3(x, y + 5.3, z)
      tablet.hoverDestinationRotation = new THREE.Euler(-Math.PI / 2.2, 0, objRotation * Math.PI / 180, 'XYZ')
      tablet.position.set(x, y + 0.3, z)
      tablet.rotation.set(-Math.PI / 2, 0, objRotation * Math.PI / 180, 'XYZ')

      tablet.bringToFront = function () {
        const defer = $q.defer()
        drawService.defaultBringToFront(tablet, scene, camera, 1).then(function (res) {
          defer.resolve({
            width: res.width,
            height: res.height,
            calculatedScale: res.calculatedScale / 576
          })
        })
        return defer.promise
      }

      tablet.bringBack = function () {
        const defer = $q.defer()
        drawService.defaultBringBack(tablet, scene, camera, 1).then(function () {
          defer.resolve()
        })
        return defer.promise
      }

      tablet.handleObjectHover = function () {
        drawService.defaultHoverTween(tablet, scene, camera, 1)
      }

      tablet.class = 'dynamic'
      tablet.name = 'tablet'

      return tablet
    }
  }
})()
