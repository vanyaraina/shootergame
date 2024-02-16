AFRAME.registerComponent("bullets",{
    init:function(){
        this.shootBullet()
    },
    shootBullet:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key=="z"){
                var bullet = document.createElement("a-entity")
                bullet.setAttribute("geometry",{
                    primitive:"sphere",
                    radius: 0.1
                })

                bullet.setAttribute("material",{
                    color:"black"
                })

                var camera= document.querySelector("#camera")
                var pos = camera.getAttribute("position")

                bullet.setAttribute("dynamic-body",{
                    mass: 0,
                    shape:"sphere"
                })

                bullet.setAttribute("position",{
                    x: pos.x,
                    y: pos.y,
                    z: pos.z
                })

                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3()

                console.log("Dir: ", direction)
                camera.getWorldDirection(direction)
                bullet.setAttribute("velocity",direction.multiplyScalar(-10))

                
                var scene= document.getElementById("scene")
                bullet.addEventListener("collide",this.removeBullets)
                scene.appendChild(bullet)
            }
        })
    },

    removeBullets:function(e){
            var elementHit = e.detail.target.el
            var elementCollided = e.detail.body.el

            console.log("hit: ", elementHit)
            console.log("collided: ", elementCollided)

            console.log(elementCollided.id.includes("b"))



            if(elementCollided.id.includes("b")){

                elementCollided.setAttribute("material",{
                    opacity:1,
                    transparent:true
                })
                var impulse = new CANNON.Vec3(2,2,1)
                var worldPoint = new CANNON.Vec3().copy(
                elementCollided.getAttribute("position")
                )
                elementCollided.body.applyImpulse(impulse,worldPoint)
                

            }

            if(elementCollided.id.includes("w")){
                elementCollided.setAttribute("material",{
                    color:"black"
                })
            }
            
    }

})