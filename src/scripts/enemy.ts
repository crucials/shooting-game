import { Entity } from '@/scripts/entity'
import { CollisionError, GameObject, GameObjectOptions } from '@/scripts/game-objects.ts'
import { Player, player } from '@/scripts/player/player'
import { Position, Direction } from '@/scripts/types/position'
import { wait } from '@/scripts/utils/wait'

export class Enemy extends Entity {
    private static readonly MAX_HEALTH_POINTS = 5
    private canDamage = true
    private moving = true

    constructor(position: Position) {
        const objectOptions: GameObjectOptions = {
            collision: {
                doWhenCollidedIntoObject: (targetObject: GameObject) => {
                    if(targetObject instanceof Player && this.canDamage) {
                        try {
                            targetObject.setHealth(targetObject.getHealth() - 1, true)
                            this.canDamage = false
                            window.setTimeout(() => {
                                this.canDamage = true
                            }, 700)
                        }
                        catch(error) {
                            console.log(error)
                        }
                    }
                },
            },
            domElementClasses: ['enemy-container']
        }
        super(position, Enemy.MAX_HEALTH_POINTS, {
            spriteElementClass: 'enemy-sprite',
            noHealthBar: true,
            objectOptions
        })

        this.domElement.setAttribute('walking', '')
    }

    async setPositionWithAnimation(newPosition: Partial<Position>) {
        await wait(0.1)

        try {
            this.moving = false
            this.domElement.classList.add('animated-teleporting')
            this.setPosition(newPosition)

            setTimeout(() => {
                this.domElement.classList.remove('animated-teleporting')
                this.moving = true
            }, 400)
        }
        catch(error) {
            if(error instanceof CollisionError) {
                this.domElement.classList.remove('animated-teleporting')
                this.moving = true
                throw error
            }
        }
    }

    update() {
        const currentPosition = this.getPosition()
        const MOVE_PIXELS_AMOUNT = 2
        
        if(player && this.moving) {
            const playerPosition = player.getPosition()

            const newPosition = { x: currentPosition.x, y: currentPosition.y }
            let newDirection: Direction | undefined = undefined

            if(currentPosition.y < playerPosition.y) {
                newDirection = 'bottom'
                newPosition.y = newPosition.y + MOVE_PIXELS_AMOUNT
            }
            else if(currentPosition.y > playerPosition.y) {
                newDirection = 'top'
                newPosition.y = newPosition.y - MOVE_PIXELS_AMOUNT
            }

            if(currentPosition.x <= playerPosition.x || currentPosition.x >= playerPosition.x + player.width) {
                if(currentPosition.x < playerPosition.x) {
                    newDirection = 'right'
                    newPosition.x = newPosition.x + MOVE_PIXELS_AMOUNT
                }
                else if(currentPosition.x > playerPosition.x) {
                    newDirection = 'left'
                    newPosition.x = newPosition.x - MOVE_PIXELS_AMOUNT
                }
            }

            if(!newDirection) {
                return
            }

            this.domElement.setAttribute('direction', newDirection)

            try {
                this.setPosition(newPosition)
            }
            catch(error) {
                if(error instanceof CollisionError) {
                    this.escapeCollision(error, newDirection)
                }
            }
        }

        super.update()
    }

    async escapeCollision(collisionError: CollisionError, direction: Direction) {
        const currentPosition = this.getPosition()
        const collisionObject = collisionError.object

        if(!collisionObject || collisionObject instanceof Player) {
            return
        }

        const collisionObjectPosition = collisionError.object.getPosition()

        try {
            const newPosition = { ...currentPosition }
            if(direction === 'top') {
                newPosition.y = collisionObjectPosition.y - collisionObject.height
            }
            else if(direction === 'bottom') {
                newPosition.y = collisionObjectPosition.y + collisionObject.height
                    + this.height
            }
            else if(direction === 'left') {
                newPosition.x = collisionObjectPosition.x - collisionObject.width
            }
            else if(direction === 'right') {
                newPosition.x = collisionObjectPosition.x + collisionObject.width
                    + this.width
            }

            await this.setPositionWithAnimation(newPosition)
        }
        catch(error) {
            /*
                if collided into another object, the function calls itself
                if collided into screen bounds enemy moves to the corners of the screen
            */
            if(error instanceof CollisionError && error.object) {
                this.escapeCollision(error, direction)
            }
            else {
                const resetPosition = { x: 0, y: 0 }
                if(direction === 'top') {
                    resetPosition.y = 0
                }
                else if(direction === 'bottom') {
                    resetPosition.y = this.stage.clientHeight - this.height
                }
                else if(direction === 'left') {
                    resetPosition.x = 0
                }
                else if(direction === 'right') {
                    resetPosition.x = this.stage.clientWidth - this.width
                }

                try {
                    await this.setPositionWithAnimation(resetPosition)
                }
                catch(error) {}
            }
        }
    }
}
