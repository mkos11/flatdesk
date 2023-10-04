(function () {
  'use strict'

  angular.module('app.objects').factory('phoneService', phoneService)

  phoneService.$inject = ['drawService', '$q']

  function phoneService (drawService, $q) {
    const service = {
      drawObject
    }

    return service

    function drawObject (scene, camera, x, y, z, objRotation, color) {
      const phone = new THREE.Object3D()
      phone.objectWidth = 7.7
      phone.objectHeight = 15.7
      phone.objectThickness = 0.7

      phone.screen = new Object()
      phone.screen.distance = 0.36
      phone.screen.height = 12
      phone.screen.width = 6.75

      const phoneShape = new THREE.Shape()
      drawService.createRoundedRectangle(phoneShape, phone.objectWidth - phone.objectThickness, phone.objectHeight - phone.objectThickness, 0.8)
      const phoneExtrudeSettings = {
        steps: 2,
        amount: 0,
        bevelEnabled: true,
        bevelThickness: 0.35,
        bevelSize: 0.35,
        bevelSegments: 30
      }
      const phoneGeometry = new THREE.ExtrudeGeometry(phoneShape, phoneExtrudeSettings)
      const phoneMaterial = new THREE.MeshPhongMaterial({
        color
      })
      const phoneMesh = new THREE.Mesh(phoneGeometry, phoneMaterial)

      const phoneScreen = new THREE.Mesh(new THREE.PlaneBufferGeometry(6.75, 12.00), new THREE.MeshPhongMaterial({
        color: 0x151515,
        side: THREE.DoubleSide,
        shininess: 30
      }))
      const phoneButton = new THREE.Mesh(new THREE.CircleGeometry(0.55, 32), new THREE.MeshPhongMaterial({
        side: THREE.FrontSide,
        color: 0x1d1d1d,
        opacity: 0.35,
        transparent: true
      }))
      const phoneButton2 = new THREE.Mesh(new THREE.CircleGeometry(0.48, 32), new THREE.MeshPhongMaterial({
        color,
        side: THREE.FrontSide
      }))
      const phoneSpeaker = new THREE.Mesh(new THREE.CircleGeometry(0.1, 32), new THREE.MeshPhongMaterial({
        color: 0x373a3c,
        side: THREE.FrontSide
      }))
      const phoneCamera = new THREE.Mesh(new THREE.CircleGeometry(0.15, 32), new THREE.MeshPhongMaterial({
        color: 0x373a3c,
        side: THREE.FrontSide
      }))
      const phoneSpeakerShape = new THREE.Shape()
      drawService.createRoundedRectangle(phoneSpeakerShape, 1.2, 0.14, 0.07)
      const phoneSpeakerGeometry = new THREE.ShapeGeometry(phoneSpeakerShape)
      const phoneSpeakerMaterial = new THREE.MeshPhongMaterial({
        color: 0x1d1d1d,
        opacity: 0.7,
        transparent: true
      })
      const phoneSpeakerMesh = new THREE.Mesh(phoneSpeakerGeometry, phoneSpeakerMaterial)

      phoneScreen.position.z = 0.36
      phoneButton.position.z = 0.36
      phoneSpeaker.position.z = 0.36
      phoneSpeakerMesh.position.z = 0.36
      phoneCamera.position.z = 0.36
      phoneButton2.position.z = 0.37
      phoneButton.position.y = -6.75
      phoneButton2.position.y = -6.75
      phoneCamera.position.x = -1
      phoneCamera.position.y = 6.75
      phoneSpeaker.position.y = 7.15
      phoneSpeakerMesh.position.y = 6.75

      const hoverBox = new THREE.Mesh(new THREE.BoxBufferGeometry(7.7, 15.7, 5),
        new THREE.MeshBasicMaterial({
          color: 0x248f24,
          alphaTest: 0,
          visible: false
        }))
      hoverBox.position.z = -2.1

      phone.rayReceiver = hoverBox

      phone.add(hoverBox)
      phone.add(phoneMesh)
      phone.add(phoneScreen)
      phone.add(phoneButton)
      phone.add(phoneButton2)
      phone.add(phoneCamera)
      phone.add(phoneSpeaker)
      phone.add(phoneSpeakerMesh)

      phone.children.forEach(function (element) {
        element.receiveShadow = false
        element.castShadow = true
        element.ancestor = phone
      })

      hoverBox.receiveShadow = false
      hoverBox.castShadow = false

      phone.defaultPosition = new THREE.Vector3(x, y + 0.35, z)
      phone.defaultRotation = new THREE.Euler(-Math.PI / 2, 0, objRotation * Math.PI / 180, 'XYZ')
      phone.hoverDestinationPosition = new THREE.Vector3(x, y + 5.35, z)
      phone.hoverDestinationRotation = new THREE.Euler(-Math.PI / 2.2, 0, objRotation * Math.PI / 180, 'XYZ')
      phone.position.set(x, y + 0.35, z)
      phone.rotation.set(-Math.PI / 2, 0, objRotation * Math.PI / 180, 'XYZ')

      phone.bringToFront = function () {
        const defer = $q.defer()

        drawService.defaultBringToFront(phone, scene, camera, 1).then(function (res) {
          defer.resolve({
            width: res.width,
            height: res.height,
            calculatedScale: res.calculatedScale / 667
          })
        })
        return defer.promise
      }

      phone.bringBack = function () {
        const defer = $q.defer()
        drawService.defaultBringBack(phone, scene, camera, 1).then(function () {
          defer.resolve()
        })
        return defer.promise
      }

      phone.handleObjectHover = function () {
        drawService.defaultHoverTween(phone, scene, camera, 1)
      }

      phone.class = 'dynamic'
      phone.name = 'phone'

      return phone
    }
  }
})()
